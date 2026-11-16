import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { X, ExternalLink, Download } from 'lucide-react';
import { sections, phoneCallerName, phoneNumberText } from './content.js';
import { OBJECTS, SCENE, SCREEN_QUAD, SCREEN_SIZE, PHONE_NUMBER_QUAD, PHONE_NUMBER_SIZE } from './sceneData.js';
import { quadToMatrix3d } from './geometry.js';

function SectionContent({ section }) {
  if (section.entries) return <div className="entry-list">{section.entries.map(entry => <article className="entry" key={entry.place}><div className="entry-top"><div><h3>{entry.place}</h3><p className="entry-location">{entry.location}</p></div><span className="entry-date">{entry.date}</span></div><p className="entry-role">{entry.role}</p>{entry.detail && <p className="entry-detail">{entry.detail}</p>}{entry.points && <ul>{entry.points.map(point => <li key={point}>{point}</li>)}</ul>}{entry.images && <div className="shots">{entry.images.map(img => <a key={img.src} href={img.src} target="_blank" rel="noreferrer"><img src={img.src} alt={img.alt} loading="lazy" onError={e => { e.currentTarget.parentElement.hidden = true; }} /></a>)}</div>}{entry.video && <div className="project-video"><video controls preload="metadata" playsInline><source src={entry.video} type="video/mp4" />Your browser does not support the video element.</video>{entry.videoNote && <p className="video-note">{entry.videoNote}</p>}</div>}{entry.links && <div className="contact-links">{entry.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={15}/></a>)}</div>}</article>)}</div>;
  if (section.groups) return <div className="skill-list">{section.groups.map(group => <article className="skill-group" key={group.label}><h3>{group.label}</h3><p>{group.values}</p></article>)}</div>;
  return (
  <>
    <p className="modal-body" style={{ whiteSpace: 'pre-line' }}>
      {section.body}
    </p>

    {section.bullets && (
      <ul className="about-points">
        {section.bullets.map(point => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    )}

    {section.links && (
  <div className="contact-links">
    {section.links.map(link => (
      <a
        key={link.label}
        href={link.href}
        download={link.download || undefined}
        target={link.download ? undefined : '_blank'}
        rel="noreferrer"
      >
        {link.label}
        {link.download ? <Download size={15} /> : <ExternalLink size={15} />}
      </a>
    ))}
  </div>
)}
  </>
);
}

// The whole desk is one fixed-size scene (the photo's native pixels) that is scaled to
// cover the viewport. Photo, laptop wallpaper, hover effects and click targets all live
// inside it, so they scale together and can never drift apart. The offset is rounded to
// whole pixels so the photograph is never resampled at a half-pixel position.
function useSceneTransform() {
  const compute = () => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const scale = Math.max(vw / SCENE.width, vh / SCENE.height);
    const x = Math.round((vw - SCENE.width * scale) / 2);
    const y = Math.round((vh - SCENE.height * scale) / 2);
    return `translate(${x}px, ${y}px) scale(${scale})`;
  };
  const [transform, setTransform] = useState(compute);
  useLayoutEffect(() => {
    const update = () => setTransform(compute());
    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);
  return transform;
}

export default function App() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const sceneTransform = useSceneTransform();
  const section = active ? sections[active] : null;
  const screenTransform = useMemo(() => quadToMatrix3d(SCREEN_SIZE.width, SCREEN_SIZE.height, SCREEN_QUAD), []);
  const phoneTransform = useMemo(() => quadToMatrix3d(PHONE_NUMBER_SIZE.width, PHONE_NUMBER_SIZE.height, PHONE_NUMBER_QUAD), []);
  // Shrink long names so they never grow wider than the number beneath them.
  const nameSize = Math.min(54, Math.floor(400 / (Math.max(phoneCallerName.length, 1) * 0.56)));

  const open = id => { setHovered(null); setActive(id); };
  // Touch taps fire synthetic hover events that would leave an effect stuck on; ignore them.
  const hoverOn = id => e => { if (e.pointerType !== 'touch') setHovered(id); };
  const hoverOff = id => () => setHovered(h => (h === id ? null : h));

  useEffect(() => {
    if (!active) document.activeElement?.blur?.();
  }, [active]);
  useEffect(() => {
    if (!active) return;
    const onKeyDown = e => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  const viewBox = `0 0 ${SCENE.width} ${SCENE.height}`;

  return <main className="full-screen-workspace" aria-label="Interactive portfolio workspace">
    <div className="photo-stage">
      <div className="scene" style={{ width: SCENE.width, height: SCENE.height, transform: sceneTransform }}>
        <img className="workspace-photo" src="/media/workspace-photo.png" width={SCENE.width} height={SCENE.height} draggable="false" alt="A sunlit wooden desk with a laptop, soccer ball, coffee mug, book, pen holder, bicycle and phone." />

        <div className={`laptop-screen${hovered === 'about' ? ' is-awake' : ''}`} style={{ width: SCREEN_SIZE.width, height: SCREEN_SIZE.height, transform: screenTransform }} aria-hidden="true">
          <img src="/media/display_pic.jpg" alt="" draggable="false" />
        </div>

        <div className="phone-caller" style={{ width: PHONE_NUMBER_SIZE.width, height: PHONE_NUMBER_SIZE.height, transform: phoneTransform }} aria-hidden="true">
          <span className="phone-name" style={{ fontSize: nameSize }}>{phoneCallerName}</span>
          <span className="phone-number">{phoneNumberText}</span>
        </div>

        {/* Hover effects (purely visual). Three stacked layers: a faint dimming of everything
            else, a soft light bloom on the object, and a warm halo around it. */}
        <svg className={`fx fx-dim${hovered ? ' on' : ''}`} viewBox={viewBox} aria-hidden="true">
          <defs>
            <filter id="fx-feather-wide" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14" /></filter>
            <mask id="fx-spotlight" maskUnits="userSpaceOnUse" x="0" y="0" width={SCENE.width} height={SCENE.height}>
              <rect width={SCENE.width} height={SCENE.height} fill="#fff" />
              {OBJECTS.map(({ id, path }) => <path key={id} d={path} fill="#000" filter="url(#fx-feather-wide)" className={`fx-shape${hovered === id ? ' on' : ''}`} />)}
            </mask>
          </defs>
          <rect width={SCENE.width} height={SCENE.height} mask="url(#fx-spotlight)" />
        </svg>
        <svg className="fx fx-bloom" viewBox={viewBox} aria-hidden="true">
          <defs><filter id="fx-feather" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="9" /></filter></defs>
          {OBJECTS.map(({ id, path }) => <path key={id} d={path} fill="#fff3d9" filter="url(#fx-feather)" className={`fx-shape${hovered === id ? ' on' : ''}`} />)}
        </svg>
        <svg className="fx fx-halo" viewBox={viewBox} aria-hidden="true">
          <defs><filter id="fx-halo-blur" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="11" /></filter></defs>
          {OBJECTS.map(({ id, path }) => <path key={id} d={path} fill="none" stroke="#ffe3ae" strokeWidth="14" strokeLinejoin="round" filter="url(#fx-halo-blur)" className={`fx-shape${hovered === id ? ' on' : ''}`} />)}
        </svg>

        <svg className="object-interactions" viewBox={viewBox} role="group" aria-label="Portfolio sections">
          {OBJECTS.map(({ id, label, path }) => <path className="object-hit-area" key={id} d={path} role="button" tabIndex="0" aria-label={`Open ${label}`}
            onClick={() => open(id)}
            onPointerEnter={hoverOn(id)} onPointerLeave={hoverOff(id)}
            onFocus={e => { if (e.target.matches(':focus-visible')) setHovered(id); }} onBlur={hoverOff(id)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(id); } }} />)}
        </svg>
      </div>
    </div>
    {section && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setActive(null); }}>
      <section className="section-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="close-button" onClick={() => setActive(null)} aria-label="Close section"><X size={21}/></button>
        <p className="kicker">{section.eyebrow}</p><h2 id="modal-title">{section.title}</h2>
        <SectionContent section={section}/>
        {section.phonePlaceholder && <div className="phone-placeholder"><span>PHONE</span><strong>{section.phonePlaceholder}</strong></div>}
        {section.note && <p className="entry-detail">{section.note}</p>}
        <div className="modal-bottom"><span>MY PORTFOLIO</span><button onClick={() => setActive(null)}>Back to workspace</button></div>
      </section>
    </div>}
  </main>;
}

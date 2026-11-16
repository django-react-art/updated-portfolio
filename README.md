# Interactive Portfolio Workspace

A full-screen React/Vite portfolio homepage built around a photographic desk scene. The desk photograph is the full-bleed background; the printed objects are interactive navigation targets.

## Run locally

```bash
npm install
npm run dev
```

## Customize

- Replace `public/media/laptop-wallpaper.svg` with your own wallpaper (keep the filename or update the path in `src/App.jsx`). It is fitted to the screen with `object-fit: cover`, so any landscape image fills the display completely.
- If you ever swap `workspace-photo.png`, re-measure the four display corners in `SCREEN_QUAD` and the silhouettes in `OBJECTS` (both in `src/sceneData.js`).
- Set the name shown on the phone screen by editing `phoneCallerName` at the top of `src/content.js`. It is drawn above the number, in the same perspective as the printed number.
- The number under it is also live text now: edit `phoneNumberText` in `src/content.js`. Its size is `.phone-number` and the name's size is the `54` cap in `src/App.jsx` (see `nameSize`).
- Update section copy and contact links in `src/content.js`.

## How it is built

- `src/sceneData.js` holds the geometry: the scene size (the photo's native 1672 x 941), the four corners of the laptop display, and a traced silhouette for every object.
- `src/geometry.js` turns those corners into a CSS `matrix3d()` so the wallpaper is warped onto the display's perspective instead of sitting on it as a flat rectangle.
- The photo, wallpaper, hover effects and click targets all live in one fixed-size scene that is scaled together to cover the viewport, so the wallpaper stays locked to the laptop at every screen size.
- Each object's click target is its own traced silhouette (the laptop's covers the whole laptop). Shapes no longer overlap, so clicking anywhere on the mug, including its base, opens Experience.

## Interaction details

Hovering (or keyboard-focusing) an object lights it softly: a gentle bloom on the object, a faint warm halo, and a very light dimming of everything else. The laptop screen also brightens slightly, as if waking. Nothing moves or scales, so neighbouring objects are never disturbed, and all of it is opacity-driven and disabled under `prefers-reduced-motion`. Touch taps open sections directly without leaving a stuck hover state.

## Personal media to add

- Replace `public/media/laptop-wallpaper.svg` with your own landscape photo when ready (keep the same filename or update the reference in `src/App.jsx`).
- Add your Inventory Management System demo as `public/media/inventory-management-demo.mp4`. The Projects section is already wired to this path.
- Replace the temporary phone number placeholder in `src/content.js` with your preferred number before publishing.

The original Inventory Management System video was not present among the files accessible in this editing session, so the project includes the video player path and a clear note until you copy the original MP4 into `public/media/`.

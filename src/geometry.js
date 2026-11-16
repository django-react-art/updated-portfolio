// Projective mapping of a flat w x h rectangle onto an arbitrary quadrilateral,
// returned as a CSS matrix3d() string (transform-origin must be 0 0).
// quad = [topLeft, topRight, bottomRight, bottomLeft] in the parent's pixel space.
export function quadToMatrix3d(w, h, quad) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = quad;
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;

  let g = 0;
  let hh = 0;
  if (sx !== 0 || sy !== 0) {
    const dx1 = x1 - x2, dx2 = x3 - x2;
    const dy1 = y1 - y2, dy2 = y3 - y2;
    const den = dx1 * dy2 - dx2 * dy1;
    g = (sx * dy2 - dx2 * sy) / den;
    hh = (dx1 * sy - sx * dy1) / den;
  }
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + hh * x3;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + hh * y3;

  // Unit square -> quad, rescaled so the source is w x h pixels. Column-major order.
  const m = [
    a / w, d / w, 0, g / w,
    b / h, e / h, 0, hh / h,
    0, 0, 1, 0,
    x0, y0, 0, 1,
  ];
  return `matrix3d(${m.map(n => +n.toFixed(8)).join(',')})`;
}

import { useEffect, useRef } from "react";

// Hand-drawn 192×108 pixel scene: office, desk, monitor typing code, robot, hovering drone.
const W = 192, H = 108;
const CODE = [[4, 14], [6, 10], [6, 18], [8, 8], [4, 12], [6, 16], [8, 6], [4, 9]];

function draw(ctx, f, reduce) {
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  // ceiling + lights
  R(0, 0, W, 22, "#A08562");
  for (let x = 0; x < W; x += 16) R(x, 0, 1, 22, "#8E7455");
  R(0, 10, W, 1, "#8E7455");
  [[8, 3], [56, 3], [104, 3], [152, 3], [30, 13], [78, 13], [126, 13], [174, 13]].forEach(([x, y]) => R(x, y, 22, 4, "#F1E2BC"));
  // back wall + windows
  R(0, 22, W, 42, "#B89B74");
  for (let x = 6; x < W; x += 30) { R(x, 26, 24, 22, "#E3D3AE"); R(x + 11, 26, 2, 22, "#A68B66"); R(x, 36, 24, 2, "#A68B66"); }
  // distant desks
  R(0, 52, W, 12, "#937A5A");
  for (let x = 2; x < W; x += 22) { R(x, 46, 10, 7, "#6E5A44"); R(x + 1, 47, 8, 5, "#88A7A8"); }
  // floor
  R(0, 64, W, 44, "#8C6F4F");
  for (let y = 68; y < H; y += 8) R(0, y, W, 1, "#7F6447");
  // desk
  R(52, 78, 96, 5, "#6B4A2E"); R(52, 78, 96, 1, "#8A6240"); R(56, 83, 4, 25, "#4F3621"); R(140, 83, 4, 25, "#4F3621");
  // monitor with typing code
  R(74, 40, 52, 36, "#262626"); R(77, 43, 46, 29, "#0E2618");
  const typed = reduce ? 99 : Math.floor(f / 2) % 60;
  let n = 0;
  CODE.forEach(([ind, len], i) => {
    const show = Math.max(0, Math.min(len, typed - n)); n += len;
    R(79 + ind, 45 + i * 3, show, 1, i % 3 === 1 ? "#F0C000" : "#7FD46B");
  });
  if (!reduce && (f >> 2) % 2) R(79, 69, 2, 2, "#7FD46B");
  R(97, 76, 6, 3, "#262626"); R(91, 78, 18, 1, "#1A1A1A");
  // keyboard, mug, plant
  R(84, 76, 30, 2, "#3A3A3A"); R(130, 72, 6, 6, "#E8E4D2"); R(136, 73, 2, 3, "#E8E4D2"); R(131, 73, 4, 1, "#5A3A22");
  R(141, 70, 6, 8, "#A0522D"); R(140, 64, 2, 6, "#2E7D32"); R(143, 61, 2, 9, "#388E3C"); R(146, 63, 2, 7, "#2E7D32");
  // robot
  const bob = reduce ? 0 : (f >> 3) % 2;
  R(30, 58 + bob, 1, 4, "#2B1D12"); R(29, 56 + bob, 3, 2, "#C9640F");
  R(22, 62 + bob, 18, 14, "#E4A63A"); R(22, 62 + bob, 18, 1, "#F6C866");
  const blink = !reduce && f % 40 < 3;
  R(26, 67 + bob, 3, blink ? 1 : 3, "#2B1D12"); R(33, 67 + bob, 3, blink ? 1 : 3, "#2B1D12"); R(28, 72 + bob, 6, 1, "#2B1D12");
  R(24, 77, 14, 16, "#5E6B6B"); R(26, 80, 10, 6, "#88A7A8"); R(29, 82, 4, 2, "#F0C000");
  R(18, 79, 6, 3, "#5E6B6B"); R(38, 79, 6, 3, "#5E6B6B"); R(25, 93, 4, 8, "#3E4848"); R(33, 93, 4, 8, "#3E4848");
  R(23, 101, 7, 2, "#2B1D12"); R(32, 101, 7, 2, "#2B1D12");
  // drone
  const dy = reduce ? 0 : Math.round(Math.sin(f / 6) * 2), dx = 158, spin = reduce ? 0 : f % 2;
  R(dx, 34 + dy, 22, 4, "#3A3F44"); R(dx + 8, 38 + dy, 6, 3, "#262A2E"); R(dx + 10, 39 + dy, 2, 1, "#E04A2A");
  R(dx - 2, 32 + dy, 2, 3, "#262A2E"); R(dx + 22, 32 + dy, 2, 3, "#262A2E");
  R(dx - 6 + spin * 2, 31 + dy, 10 - spin * 4, 1, "#1A1A1A"); R(dx + 18 + spin * 2, 31 + dy, 10 - spin * 4, 1, "#1A1A1A");
  R(dx + 4, 41 + dy, 1, 3, "#262A2E"); R(dx + 17, 41 + dy, 1, 3, "#262A2E");
}

export default function PixelScene({ label }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let f = 0, timer;
    const tick = () => {
      draw(ctx, f++, reduce);
      if (!reduce) timer = setTimeout(() => requestAnimationFrame(tick), 110);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return <canvas ref={ref} width={W} height={H} className="px block h-full w-full" role="img" aria-label={label} />;
}

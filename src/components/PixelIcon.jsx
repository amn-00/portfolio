import { useEffect, useRef } from "react";

const PAL = { g: "#004D98", y: "#EDBB00", o: "#A50044", k: "#1B1A2E", c: "#ECE7DA", b: "#5B8DB8", w: "#FFF8E6" };

// Each icon is a grid of characters; each character maps to a color ("." = transparent).
export const ICONS = {
  logo: ["..gggggg..", ".gyyyyyyg.", "gyykyykyyg", "gyykyykyyg", "gyyyyyyyyg", "gyoyyyyoyg", "gyyooooyyg", ".gyyyyyyg.", "..gggggg..", ".........."],
  ball: ["...kkkkkk...", "..kwwkkwwk..", ".kwwwkkwwwk.", "kwwwwwwwwwwk", "kkwwwwwwwwkk", "kkkwwkkwwkkk", "kkkwwkkwwkkk", "kkwwwwwwwwkk", "kwwwwwwwwwwk", ".kwwwkkwwwk.", "..kwwkkwwk..", "...kkkkkk..."],
  star: ["....k......", "....ky.....", "...kyyk....", "kkkkyyykkkk", ".kyyyyyyyk.", "..kyyyyyk..", "..kyyyyyk..", ".kyykkkyyk.", ".kyk...kyk.", "kkk.....kkk", "..........."],
  scroll: [".kkkkkkkkk.", "kcccccccckk", "kckkkkkkcck", "kcccccccck.", "kckkkkkcck.", "kcccccccck.", "kckkkkkkcck", "kcccccccckk", ".kkkkkkkkk.", "...........", "..........."],
  lens: ["..kkkkk....", ".kcbbbck...", "kcbbbbbck..", "kbbbbbbbk..", "kbbbbbbbk..", "kcbbbbbck..", ".kcbbbckk..", "..kkkkkkok.", ".......kook", "........kok", ".........k."],
  badge: ["...kkkkk...", "..kyyyyyk..", ".kyyoooyyk.", ".kyoyyyoyk.", ".kyoyyyoyk.", ".kyyoooyyk.", "..kyyyyyk..", "...kgkgk...", "..kgk.kgk..", ".kgk...kgk.", ".kk.....kk."],
};

// Pass `name` for a built-in icon, or `grid` + `palette` for a custom one.
export default function PixelIcon({ name, grid, palette = PAL, size = 44, height, className = "" }) {
  const ref = useRef(null);
  const rows = grid ?? ICONS[name] ?? ICONS.star;
  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    ctx.clearRect(0, 0, rows[0].length, rows.length);
    rows.forEach((r, j) =>
      [...r].forEach((ch, i) => {
        if (palette[ch]) {
          ctx.fillStyle = palette[ch];
          ctx.fillRect(i, j, 1, 1);
        }
      })
    );
  }, [rows, palette]);
  return (
    <canvas
      ref={ref}
      width={rows[0].length}
      height={rows.length}
      className={`px block ${className}`}
      style={{ width: size, height: height ?? size }}
      aria-hidden="true"
    />
  );
}

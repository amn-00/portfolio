// Small pixel glyphs drawn as SVG squares in the current text colour ("#" = filled).
const GLYPHS = {
  github: [".#.....#.", ".##...##.", ".#######.", "#########", "##.###.##", "#########", ".#######.", "..#...#..", "..#...#.."],
  linkedin: ["#########", "#.#######", "#########", "#.#...###", "#.#.#.###", "#.#.#.###", "#.#.#.###", "#########"],
  leetcode: [".....#...", ".#...#.#.", "#...#...#", ".#..#..#.", "...#.....", ],
  mail: ["#########", "##.....##", "#.#...#.#", "#..#.#..#", "#...#...#", "#.......#", "#########"],
};

export default function PixelGlyph({ name, size = 18, className = "" }) {
  const rows = GLYPHS[name];
  const w = rows[0].length, h = rows.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={size} height={(size * h) / w} shapeRendering="crispEdges" fill="currentColor" className={className} aria-hidden="true">
      {rows.flatMap((r, y) => [...r].map((c, x) => (c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null)))}
    </svg>
  );
}

import { useRef } from "react";
import { profile } from "../data/portfolio";
import PixelIcon from "./PixelIcon";

// Pixel avatar (16×20). Edit the grid to change hair, skin or jersey.
const AVATAR = [
  "....hhhhhhhh....",
  "..hhhhhhhhhhhh..",
  ".hhhhhhhhhhhhhh.",
  ".hhhhsshhhhhhhh.",
  ".hhsssssssssshh.",
  ".hssssssssssssh.",
  ".ssshhsssshhsss.",
  ".sssewssssewsss.",
  ".sssssssdssssss.",
  ".ssssssddssssss.",
  ".dssmssssssmssd.",
  "..dssmmmmmmssd..",
  "...ddssssssdd...",
  ".....dssssd.....",
  "..rrggryygrrgg..",
  ".grrggrrggrrggr.",
  "ggrrggrrggrrggrr",
  "ggrrggryygrrggrr",
  "ggrrggrrggrrggrr",
  "ggrrggrrggrrggrr",
];
const AVATAR_PAL = { h: "#1E1410", s: "#B97A4F", d: "#95603C", e: "#1E1410", w: "#FFF8E6", m: "#6B3A26", g: "#004D98", r: "#A50044", y: "#EDBB00" };

const FLAG = [
  "ooooooooo",
  "ooooooooo",
  "wwwwbwwww",
  "wwwbbbwww",
  "ggggggggg",
  "ggggggggg",
];
const FLAG_PAL = { o: "#E8862A", w: "#FFF8E6", b: "#1F3C88", g: "#1E7B30" };

// Stepped (pixel) corners for the card silhouette
const CLIP =
  "polygon(12% 0, 88% 0, 88% 3%, 94% 3%, 94% 6%, 100% 6%, 100% 86%, 96% 86%, 96% 90%, 88% 90%, 88% 94%, 74% 94%, 74% 97%, 60% 97%, 60% 100%, 40% 100%, 40% 97%, 26% 97%, 26% 94%, 12% 94%, 12% 90%, 4% 90%, 4% 86%, 0 86%, 0 6%, 6% 6%, 6% 3%, 12% 3%)";

export default function PlayerCard() {
  const c = profile.card;
  const ref = useRef(null);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    ref.current.style.setProperty("--shine", `${(x + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const left = c.stats.slice(0, 3);
  const right = c.stats.slice(3);
  const Stat = ({ s }) => (
    <li className="flex items-baseline gap-2" title={`${s.full}: ${s.value}`}>
      <span className="w-[2.2ch] font-display text-[30px] leading-none tabular-nums">{s.value}</span>
      <span className="text-[13px] font-bold tracking-[.1em]">{s.label}</span>
    </li>
  );

  return (
    <div className="flex justify-center" onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* drop-shadow survives the clip-path, so the card keeps the site's hard offset shadow */}
      <div ref={ref} className="w-full max-w-[330px] transition-transform duration-150 ease-out [filter:drop-shadow(7px_7px_0_var(--color-ink))]" style={{ "--shine": "50%" }}>
        <div
          className="relative aspect-[5/7] w-full overflow-hidden text-[#3B2A08]"
          style={{
            clipPath: CLIP,
            background:
              "linear-gradient(160deg,#FFE58A 0 18%,#F7CF4A 18% 46%,#E9B52B 46% 72%,#D99E1E 72% 100%)",
          }}
          role="img"
          aria-label={`Player card: ${c.name}, overall ${c.rating}, ${c.position}. ${c.stats.map((s) => `${s.full} ${s.value}`).join(", ")}.`}
        >
          {/* inner frame + shine */}
          <div className="pointer-events-none absolute inset-[4.5%] border-2 border-[#8A6510]/50" style={{ clipPath: CLIP }} />
          <div
            className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
            style={{ background: "linear-gradient(105deg, transparent calc(var(--shine) - 18%), #FFFFFF calc(var(--shine)), transparent calc(var(--shine) + 18%))" }}
          />

          {/* top: rating column + avatar */}
          <div className="absolute left-[10%] top-[11%] flex w-[26%] flex-col items-center gap-1.5">
            <span className="font-display text-[66px] leading-[.8]">{c.rating}</span>
            <span className="relative z-10 flex flex-col items-center text-center font-bold leading-[1.15] tracking-[.06em] text-[13px]">
              {/* Each word on its own line so long positions (e.g. "AI ENGINEER") never run under the avatar */}
              {c.position.split(" ").map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
            <span className="my-1 h-[2px] w-9 bg-[#8A6510]/60" />
            <PixelIcon grid={FLAG} palette={FLAG_PAL} size={34} height={23} />
            <span className="my-1 h-[2px] w-9 bg-[#8A6510]/60" />
            <PixelIcon name="logo" size={30} />
          </div>
          <div className="absolute right-[10%] top-[9%] w-[52%]">
            <PixelIcon grid={AVATAR} palette={AVATAR_PAL} size="100%" height="auto" className="aspect-[4/5]" />
          </div>

          {/* name */}
          <div className="absolute inset-x-[10%] top-[53%] border-y-2 border-[#8A6510]/50 py-1.5 text-center font-display text-[40px] leading-none tracking-[.14em]">
            {c.name}
          </div>

          {/* stats */}
          <div className="absolute inset-x-[14%] top-[67%] grid grid-cols-[1fr_auto_1fr] gap-3">
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">{left.map((s) => <Stat key={s.label} s={s} />)}</ul>
            <span className="w-[2px] bg-[#8A6510]/50" />
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">{right.map((s) => <Stat key={s.label} s={s} />)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

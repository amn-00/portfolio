import { useEffect, useRef } from "react";
import { gamePlan } from "../data/portfolio";

// Tactics board: a pixel-styled pitch where three "players" (Build → Measure → Ship)
// pass the ball to each other and into the goal. Cards underneath explain each move.

// Player spots on the 1200×400 pitch, and the passing route between them.
const SPOTS = [
  { x: 230, y: 200 },
  { x: 600, y: 200 },
  { x: 970, y: 200 },
];
const PASS_1 = "M 270 188 Q 415 105 560 188";
const PASS_2 = "M 640 212 Q 785 295 930 212";
const SHOT = "M 1010 200 L 1158 200";
const BALL_ROUTE = "M 230 200 Q 415 105 600 200 Q 785 295 970 200 L 1170 200";

const LINE = "rgba(255,255,255,.85)";

export default function GamePlan() {
  const sectionRef = useRef(null);
  const ballAnim = useRef(null);

  // Play the move once the board scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce) return; // static board: arrows and resting ball stay visible
    if (!("IntersectionObserver" in window)) {
      el.classList.add("played");
      ballAnim.current?.beginElement?.();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("played");
          ballAnim.current?.beginElement?.();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="bring"
      ref={sectionRef}
      className="tactics mt-12 border-y-[6px] border-gold pt-16 pb-16"
      style={{ background: "repeating-linear-gradient(90deg, #2f7a3a 0 80px, #2a6e34 80px 160px)" }}
    >
      <div className="mx-auto max-w-[1180px] px-5">
        <h2 className="section-title !mb-8 !text-gold [text-shadow:4px_4px_0_var(--color-ink)]">What I bring</h2>

        {/* The pitch */}
        <div className="mx-auto max-w-[1120px] border-[3px] border-ink shadow-px" style={{ background: "repeating-linear-gradient(90deg, #348a41 0 8.33%, #2e7d3a 8.33% 16.66%)" }}>
          <svg viewBox="0 0 1200 400" className="block h-auto w-full" role="img"
            aria-label="Tactics board: player 1 Build passes to player 2 Measure, who passes to player 3 Ship, who scores.">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#fff" />
              </marker>
            </defs>

            {/* pitch markings */}
            <g fill="none" stroke={LINE} strokeWidth="4">
              <rect x="20" y="20" width="1160" height="360" />
              <line x1="600" y1="20" x2="600" y2="380" />
              <circle cx="600" cy="200" r="62" />
              <rect x="20" y="105" width="130" height="190" />
              <rect x="20" y="155" width="45" height="90" />
              <rect x="1050" y="105" width="130" height="190" />
              <rect x="1135" y="155" width="45" height="90" />
              <rect x="1180" y="170" width="14" height="60" strokeWidth="5" />
            </g>
            <circle cx="600" cy="200" r="5" fill={LINE} />

            {/* passing arrows (drawn in when the board comes into view) */}
            <g fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="14 10" markerEnd="url(#arrow)">
              <path className="pass pass-1" d={PASS_1} />
              <path className="pass pass-2" d={PASS_2} />
              <path className="pass pass-3" d={SHOT} />
            </g>

            {/* players */}
            {gamePlan.map((p, i) => {
              const s = SPOTS[i];
              return (
                <g key={p.no} transform={`translate(${s.x} ${s.y})`}>
                  {/* Barça-striped shirt token */}
                  <circle r="38" fill="#1b1a2e" />
                  <clipPath id={`shirt-${i}`}><circle r="34" /></clipPath>
                  <g clipPath={`url(#shirt-${i})`}>
                    {[-34, -17, 0, 17].map((x, k) => (
                      <rect key={x} x={x} y="-34" width="17" height="68" fill={k % 2 ? "#a50044" : "#004d98"} />
                    ))}
                  </g>
                  <text y="13" textAnchor="middle" fontFamily="'Jersey 15', sans-serif" fontSize="40" fill="#edbb00" stroke="#1b1a2e" strokeWidth="1.5">{p.no}</text>
                  <text className="move-label" y="-80" textAnchor="middle" fontFamily="'Jersey 15', sans-serif" fontSize="34" fill="#fff" letterSpacing="2">
                    {p.move.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* ball: waits at player 1, then a moving copy runs the passing route */}
            <g className="ball-rest" transform="translate(230 200)">
              <circle cx="0" cy="44" r="11" fill="#fff" stroke="#1b1a2e" strokeWidth="3" />
              <rect x="-4" y="40" width="8" height="8" fill="#1b1a2e" />
            </g>
            <g className="ball-move">
              <circle r="11" fill="#fff" stroke="#1b1a2e" strokeWidth="3" />
              <rect x="-4" y="-4" width="8" height="8" fill="#1b1a2e" />
              <animateMotion ref={ballAnim} dur="2.6s" begin="indefinite" fill="freeze" path={BALL_ROUTE} />
            </g>
          </svg>
        </div>

        {/* What each move means */}
        <ol className="mx-auto mt-10 grid max-w-[1120px] list-none grid-cols-1 gap-7 p-0 md:grid-cols-3">
          {gamePlan.map((p) => (
            <li key={p.no} className="flex min-w-0 flex-col gap-3 border-[3px] border-ink bg-gold px-6 pt-6 pb-5 shadow-px">
              <div className="flex items-center gap-3">
                <span className="grid size-10 flex-none place-items-center border-[3px] border-ink bg-blue font-display text-[26px] leading-none text-gold">{p.no}</span>
                <span className="font-display text-[30px] leading-none tracking-[.04em] text-blue">{p.move}</span>
              </div>
              <b className="text-[15px] text-ink">{p.title}</b>
              <p className="m-0 text-[14px] text-blue-deep">{p.text}</p>
              <div className="mt-auto border-t-2 border-dashed border-ink/40 pt-3 font-display text-[22px] leading-tight text-garnet">{p.proof}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

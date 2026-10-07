import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data/portfolio";

// Retro terminal that types out each command, then prints its output.
// All lines are rendered from the start (hidden until reached) so the box never changes height.
export default function Terminal({ wide = false }) {
  const steps = profile.terminal;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Total "ticks": one per command character, plus a pause after each command.
  const plan = useMemo(() => {
    let t = 0;
    return steps.map((s) => {
      const start = t;
      t += s.cmd.length + 6; // 6-tick pause before output appears
      return { start, outAt: start + s.cmd.length + 3 };
    });
  }, [steps]);
  const total = plan.length ? plan[plan.length - 1].outAt + 1 : 0;

  const [tick, setTick] = useState(reduce ? total : 0);
  const [started, setStarted] = useState(false);
  const boxRef = useRef(null);

  // Start typing only once the terminal scrolls into view
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !("IntersectionObserver" in window)) return setStarted(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setStarted(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !started || tick >= total) return;
    const id = setTimeout(() => setTick((t) => t + 1), 55);
    return () => clearTimeout(id);
  }, [tick, total, reduce, started]);

  const done = tick >= total;

  return (
    <div ref={boxRef} className={`mx-auto w-full min-w-0 ${wide ? "" : "max-w-[580px]"} border-[3px] border-blue bg-panel shadow-px`}>
      {/* title bar */}
      <div className="flex items-center gap-2 border-b-[3px] border-blue bg-blue px-3 py-2">
        <span className="size-3 border-2 border-ink bg-garnet" />
        <span className="size-3 border-2 border-ink bg-gold" />
        <span className="size-3 border-2 border-ink bg-ok" />
        <span className="ml-2 font-display text-[19px] leading-none tracking-[.08em] text-ground">aman@dev: ~</span>
      </div>

      {/* screen */}
      <div
        className="min-h-[260px] overflow-x-auto bg-[#0B1730] px-4 py-4 font-mono text-[clamp(12px,1.25vw,14.5px)] leading-[1.75] text-[#E8E4D2] sm:px-5"
        aria-label="Terminal summary of Aman's profile and projects"
        role="img"
      >
        {steps.map((s, i) => {
          const { start, outAt } = plan[i];
          const typed = Math.max(0, Math.min(s.cmd.length, tick - start));
          const reached = tick >= start;
          const typing = reached && tick < outAt;
          const showOut = tick >= outAt;
          return (
            <div key={i} className={reached ? "" : "invisible"}>
              <div className="whitespace-nowrap">
                <span className="text-gold">$</span>{" "}
                <span className="text-[#8EC5FF]">{s.cmd.slice(0, typed)}</span>
                {typing && <span className="ml-px inline-block h-[1em] w-[.55em] translate-y-[2px] bg-[#8EC5FF]" />}
              </div>
              {s.out.map((line, j) => (
                <div key={j} className={`whitespace-pre-wrap pl-4 ${showOut ? "" : "invisible"} ${line.startsWith("✓") ? "text-ok" : ""}`}>
                  {line}
                </div>
              ))}
            </div>
          );
        })}
        <div className={done ? "" : "invisible"}>
          <span className="text-gold">$</span>{" "}
          <span className="inline-block h-[1em] w-[.55em] translate-y-[2px] animate-blink bg-[#8EC5FF]" />
        </div>
      </div>
    </div>
  );
}

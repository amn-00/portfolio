import { useState } from "react";
import PlayerCard from "./PlayerCard";
import PixelGlyph from "./PixelGlyph";
import { profile } from "../data/portfolio";

const linkCls =
  "inline-flex cursor-pointer items-center gap-2 border-0 border-b-[3px] border-transparent bg-transparent p-0 pb-0.5 font-mono text-[13px] font-bold uppercase tracking-[.1em] text-blue no-underline hover:border-gold";

export default function Hero() {
  const [toast, setToast] = useState("");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast("Email copied");
    } catch {
      setToast(profile.email);
    }
    setTimeout(() => setToast(""), 2200);
  };
  const socials = [
    ["github", "GitHub", profile.links.github],
    ["linkedin", "LinkedIn", profile.links.linkedin],
    ["leetcode", "LeetCode", profile.links.leetcode],
  ];

  return (
    <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 pt-12 pb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 lg:pt-16">
      {/* Left: name + intro */}
      <div className="min-w-0 text-center lg:text-left">
        <h1 className="mb-5 font-display font-bold leading-[.95] tracking-[.03em] text-garnet text-balance text-[clamp(48px,7.4vw,100px)] [text-shadow:4px_4px_0_var(--color-ink)]">
          {profile.name}
        </h1>
        <p className="mx-auto max-w-[56ch] tracking-[.03em] text-[clamp(15px,1.4vw,18px)] lg:mx-0">{profile.lede}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
          {profile.pills.map((p) => {
            const cls = "border-2 border-blue bg-panel px-3 py-1 text-[12.5px] font-bold uppercase tracking-[.08em] text-blue no-underline shadow-px-sm";
            const inner = (
              <>
                {p.blink && <span className="mr-2 inline-block size-[9px] animate-blink bg-blue" />}
                {p.text}
                {p.href && <span aria-hidden="true"> ↓</span>}
              </>
            );
            return p.href ? (
              <a key={p.text} href={p.href} className={`${cls} transition-transform duration-75 hover:-translate-x-px hover:-translate-y-px hover:bg-gold`}>{inner}</a>
            ) : (
              <span key={p.text} className={cls}>{inner}</span>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-[18px] lg:justify-start">
          <a className="btn" href="#work">View projects</a>
          {profile.resume ? (
            <a className="btn !bg-blue !text-ground" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume ↓</a>
          ) : (
            <a className="btn !bg-blue !text-ground" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
          {socials.map(([icon, label, href]) => (
            <a key={label} className={linkCls} href={href} target="_blank" rel="noopener noreferrer">
              <PixelGlyph name={icon} />
              {label}
            </a>
          ))}
          <button type="button" className={linkCls} onClick={copyEmail}>
            <PixelGlyph name="mail" />
            Copy email
          </button>
        </div>
      </div>

      {/* Right: player card */}
      <PlayerCard />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
        {toast && (
          <span className="border-[3px] border-ink bg-gold px-4 py-2 font-mono text-sm font-bold text-ink" style={{ boxShadow: "4px 4px 0 var(--color-ink)" }}>
            {toast}
          </span>
        )}
      </div>
    </div>
  );
}

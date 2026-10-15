import LineIcon from "./LineIcon";
import { perks } from "../data/portfolio";

export default function Perks() {
  return (
    <section id="bring" className="mt-12 border-y-[6px] border-gold pt-[70px] pb-20"
      style={{ background: "repeating-linear-gradient(90deg, var(--color-blue) 0 72px, var(--color-garnet) 72px 144px)" }}>
      <div className="mx-auto max-w-[1180px] px-5">
        <h2 className="section-title !text-gold [text-shadow:4px_4px_0_var(--color-ink)]">What I bring</h2>
        <div className="mx-auto grid max-w-[520px] grid-cols-1 gap-9 md:max-w-[1120px] md:grid-cols-3">
          {perks.map((p) => (
            <div key={p.title} className="flex flex-col items-center gap-3.5 border-[3px] border-ink bg-gold px-6 pt-8 pb-7 text-center shadow-px">
              <LineIcon name={p.icon} className="size-[54px] text-ink" />
              <h3 className="m-0 font-display font-bold leading-tight text-blue text-balance text-[clamp(28px,2.8vw,36px)]">{p.title}</h3>
              <p className="m-0 text-[14.5px] text-blue-deep">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

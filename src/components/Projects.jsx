import { useMemo, useState } from "react";
import { categories, projects } from "../data/portfolio";

function ProjectCard({ p }) {
  return (
    <article className="px-card flex min-w-0 flex-col gap-3.5 px-7 pt-7 pb-6 transition-[transform,box-shadow] duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-px-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 font-display font-bold leading-[1.15] text-blue text-balance text-[clamp(30px,2.9vw,36px)]">{p.title}</h3>
        {p.badge && (
          <span className="whitespace-nowrap border-2 border-ink bg-garnet px-2 py-0.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#FFF6E0]">{p.badge}</span>
        )}
      </div>
      <p className="m-0 text-sm">{p.desc}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="border-2 border-blue bg-ground px-2 text-[11.5px] tracking-[.06em] text-blue">{t}</span>
        ))}
      </div>
      <div className="mt-auto border-t-2 border-dashed border-blue pt-3 font-display text-[22px] leading-tight tracking-[.04em] text-garnet">{p.stat}</div>
      <div className="flex flex-wrap gap-3.5">
        {p.links.map((l) => (
          <a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="border-b-[3px] border-gold text-[13px] font-bold uppercase tracking-[.1em] text-ink no-underline hover:bg-gold">
            {l.label} →
          </a>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  const [cat, setCat] = useState("all");

  const list = useMemo(() => projects.filter((p) => cat === "all" || p.cat === cat), [cat]);

  return (
    <section id="work" className="mx-auto max-w-[1180px] px-5 pt-20 pb-10">
      <h2 className="section-title">First team</h2>

      <div role="group" aria-label="Filter by area" className="mx-auto flex max-w-[1120px] flex-wrap justify-center gap-3.5">
        {categories.map((c) => {
          const on = c.key === cat;
          return (
            <button key={c.key} type="button" aria-pressed={on} onClick={() => setCat(c.key)}
              className={`cursor-pointer border-[3px] border-blue px-5 py-2 font-mono text-[15px] tracking-[.04em] shadow-px-sm transition-transform duration-75 hover:-translate-x-px hover:-translate-y-px ${on ? "bg-blue font-bold text-ground" : "bg-panel text-blue"}`}>
              {c.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-center text-[13px] uppercase tracking-[.12em] text-muted">
        {list.length} {list.length === 1 ? "project" : "projects"} found
      </p>

      {list.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      ) : (
        <div className="mt-10 border-[3px] border-dashed border-blue px-5 py-10 text-center text-blue">
          <b className="mb-1.5 block font-display text-[30px]">No match</b>
          Pick “All work” to see everything.
        </div>
      )}
    </section>
  );
}

import PixelIcon from "./PixelIcon";
import Terminal from "./Terminal";
import { background, skills } from "../data/portfolio";

const box = "px-card min-w-0 px-[clamp(18px,3vw,34px)] py-8";
const boxTitle = "mb-6 font-display font-bold leading-[1.05] tracking-[.03em] text-blue text-[clamp(32px,4.4vw,48px)]";

export default function Stats() {
  return (
    <section id="stats" className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 pt-[70px] pb-10 lg:grid-cols-2">
      <div className={box}>
        <h2 className={boxTitle}>Background</h2>
        <div className="flex flex-col gap-[22px]">
          {background.map((g) => (
            <div key={g.group} id={g.id} className="scroll-mt-28">
              <h3 className="mb-3 text-xs uppercase tracking-[.16em] text-muted">{g.group}</h3>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {g.items.map((a) => (
                  <li key={a.title} className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4">
                    <PixelIcon name={a.icon} />
                    <div>
                      <b className="block text-[15px] text-ink">{a.title}</b>
                      <span className="text-[13.5px] text-muted">{a.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={box}>
        <h2 className={boxTitle}>Inventory</h2>
        <div className="flex flex-col gap-[22px]">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="mb-2.5 text-xs uppercase tracking-[.16em] text-muted">{g.group}</h3>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((s) => (
                  <span key={s} className="border-2 border-blue bg-ground px-3 py-1.5 text-[13.5px] font-bold tracking-[.03em] text-blue-deep shadow-px-sm">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <Terminal wide />
      </div>
    </section>
  );
}

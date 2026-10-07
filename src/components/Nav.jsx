import PixelIcon from "./PixelIcon";
import { navLinks, profile } from "../data/portfolio";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b-[3px] border-blue bg-ground">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-5 px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[28px] leading-none text-blue no-underline" aria-label={`${profile.name}, home`}>
          <PixelIcon name="logo" size={30} />
          <span>{profile.handle}<b className="text-garnet">.</b>dev</span>
        </a>
        <ul className="hidden list-none gap-[clamp(14px,2.6vw,38px)] p-0 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-bold uppercase tracking-[.08em] text-ink no-underline hover:text-blue">{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn" href="#contact">Hire me</a>
      </div>
    </header>
  );
}

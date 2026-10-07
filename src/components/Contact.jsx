import { useRef, useState } from "react";
import { profile } from "../data/portfolio";

export default function Contact() {
  const [label, setLabel] = useState("Copy");
  const emailRef = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setLabel("Copied");
    } catch {
      const r = document.createRange();
      r.selectNodeContents(emailRef.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      setLabel("Selected");
    }
    setTimeout(() => setLabel("Copy"), 1800);
  };

  const socials = [
    ["GitHub", profile.links.github],
    ["LinkedIn", profile.links.linkedin],
    ["LeetCode", profile.links.leetcode],
  ];

  return (
    <section id="contact" className="mt-16 border-t-[6px] border-gold bg-blue py-20 text-ground">
      <div className="mx-auto max-w-[1180px] px-5">
        <h2 className="section-title !text-gold [text-shadow:4px_4px_0_var(--color-ink)]">Ready to sign</h2>
        <p className="mx-auto max-w-[64ch] text-center text-balance tracking-[.04em] text-[#DCE6F2] text-[clamp(15px,1.6vw,19px)]">
          Hiring for AI/ML, GenAI or SDE roles? I can start right away. Email is the fastest way to reach me.
        </p>
        <div className="mx-auto mt-9 flex max-w-[640px] flex-wrap items-center justify-center gap-3.5">
          <a ref={emailRef} href={`mailto:${profile.email}`}
            className="break-all border-[3px] border-ink bg-ground px-[18px] py-2.5 font-mono text-ink no-underline text-[clamp(14px,2vw,19px)]"
            style={{ boxShadow: "5px 5px 0 var(--color-ink)" }}>
            {profile.email}
          </a>
          <button type="button" className="btn" onClick={copy}>{label}</button>
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-[18px]">
          {socials.map(([name, href]) => (
            <a key={name} className="btn !bg-ground !text-blue" href={href} target="_blank" rel="noopener noreferrer">{name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

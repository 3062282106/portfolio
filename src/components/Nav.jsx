import { useEffect, useState } from "react";
import { NAV, RESUME_URL } from "../content.js";

/**
 * 顶部导航 — 滚动后加深背景
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#top"><i /> 张喆涵作品集</a>
      <div className="nav-links">
        {NAV.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </div>
      <a className="nav-contact" href={RESUME_URL} download>下载简历</a>
    </nav>
  );
}

import HeroCanvas from "../components/HeroCanvas.jsx";

/**
 * 首屏与项目背景
 */
export default function HeroSection() {
  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <HeroCanvas />
        <div className="hero-planet" />

        <span className="hero-spark plus" style={{ left: "12%", top: "13%", animationDelay: "0s" }}>+</span>
        <span className="hero-spark plus" style={{ left: "12.5%", top: "54%", animationDelay: "1.4s" }}>+</span>
        <span className="hero-spark plus" style={{ right: "13%", top: "56%", animationDelay: "2.1s" }}>+</span>
        <span className="hero-spark star" style={{ right: "31%", top: "26%", animationDelay: ".7s" }}>✦</span>
        <span className="hero-spark star" style={{ left: "31%", top: "34%", animationDelay: "1.9s" }}>✦</span>

        <div className="hero-inner">
          <h1 className="hero-title">
            <span className="line serif-italic scribble">
              打通 AI 到
              <svg className="ellipse" viewBox="0 0 320 130" aria-hidden="true" preserveAspectRatio="none">
                <ellipse cx="160" cy="65" rx="150" ry="47" />
              </svg>
              <span className="scribble-sparks">✦<span className="s2">✦</span></span>
            </span>
            <span className="line bold">业务的最后一公里</span>
          </h1>
          <a className="hero-cta" href="#main-case">查看案例</a>
        </div>
      </section>

      <section className="bg-sec" id="background">
        <div className="container bg-grid">
          <div className="bg-copy reveal">
            <h2 className="bg-title">从定制走向规模化供给</h2>
            <div className="bg-body">
              <p>参与网易游戏 AI 应用平台建设，负责游戏营销素材自动化</p>
            </div>
            <div className="platform-metrics">
              <div><strong>30,000+</strong><span>平台累计 AI 调用</span></div>
              <div><strong>80,000+</strong><span>平台累计素材产出</span></div>
            </div>
          </div>
          <div className="bg-shot reveal">
            <figure className="shot3d">
              <div className="shot3d-glow" />
              <div className="shot3d-frame"><img src="/platform-home.png" alt="FlowX 内容制作中心首页" /></div>
              <div className="shot3d-shadow" />
              <figcaption>内容制作中心 · AI 应用平台 <span>V1.5.0</span></figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}

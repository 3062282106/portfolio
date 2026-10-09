import HeroCanvas from "../components/HeroCanvas.jsx";
import { PLATFORM_METRICS, PLATFORM_VALUE } from "../content.js";

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
              面向业务交付
              <svg className="ellipse" viewBox="0 0 320 130" aria-hidden="true" preserveAspectRatio="none">
                <ellipse cx="160" cy="65" rx="150" ry="47" />
              </svg>
              <span className="scribble-sparks">✦<span className="s2">✦</span></span>
            </span>
            <span className="line bold">设计 AI 产品</span>
          </h1>
          <div className="hero-actions">
            <a className="hero-cta" href="#main-case">查看产品案例</a>
          </div>
          <a className="hero-scroll" href="#background">SCROLL TO EXPLORE</a>
        </div>
      </section>

      <section className="bg-sec" id="background">
        <div className="container bg-grid">
          <div className="bg-copy reveal">
            <span className="eyebrow">PROJECT BACKGROUND</span>
            <h2 className="bg-title">FlowX<br /><span>面向业务的 AI 应用平台</span></h2>
            <div className="bg-body">
              <p>为运营、设计与赛事，提供可直接调用的生产管线。</p>
            </div>
          </div>
          <div className="bg-shot reveal">
            <figure className="shot3d">
              <div className="shot3d-frame"><img src="/projects/flowx/platform-home-v17.png" alt="FlowX 内容制作中心 V1.7.0 首页与应用运行数据" width="2048" height="1152" /></div>
            </figure>
          </div>
        </div>
        <div className="container platform-overview reveal">
          <div className="platform-value-heading"><span className="eyebrow">PLATFORM IMPACT / 平台价值</span><small>截至 2026.09</small></div>
          <div className="platform-metrics">
            {PLATFORM_METRICS.map((metric) => <div key={metric.label}><strong>{metric.value}{metric.unit && <small>{metric.unit}</small>}</strong><span>{metric.label}</span></div>)}
          </div>
          <div className="platform-value-grid">
            {PLATFORM_VALUE.map((item, index) => <article key={item.title}><span className="value-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.label}</p><div className="value-result"><strong>{item.value}</strong><span>{item.unit}</span></div></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

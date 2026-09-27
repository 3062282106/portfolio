import SimplifyProd from "./dynamic/SimplifyProd.jsx";
import Placeholder from "../components/Placeholder.jsx";
import { DYNAMIC_GIF_COLS, PROJECTS, RESUME_URL, STRENGTHS } from "../content.js";
import SceneFuture from "./SceneFuture.jsx";

/**
 * 副案例、项目集、关于我与页脚
 */
export default function MoreWork() {
  return (
    <>
      <section className="sub-cases section-pad" id="sub-cases">
        <div className="container">
          <div className="section-kicker sub-kicker reveal"><span>SUB CASES · 02–04</span><b>效率能力与资产底座</b></div>

          <article className="split-case reveal">
            <div className="split-copy">
              <span className="eyebrow">SUB CASE 02 · 动态生成</span>
              <h2>动态素材<br /><span>分钟级批量输出</span></h2>
              <p>AE 逐张套版十几分钟；模板参数化后，分钟级批量导出多规格 GIF。</p>
              <div className="mini-compare">
                <div className="old"><span>过去</span><b>10+ 分钟 / 张</b><small>手动改模板、逐个导出</small></div>
                <div className="new"><span>现在</span><b>分钟级 / 批量</b><small>多规格 GIF 一键导出</small></div>
              </div>
              <div className="case-tags"><span>模板参数化</span><span>批量任务</span><span>多规格导出</span></div>
            </div>
            <Placeholder title="动态生成图片集合包" ratio="tall" src="/projects/图片集合包.png" />
          </article>

          <SimplifyProd />

          <div className="gif-showcase reveal">
            <div className="gif-row main">
              {DYNAMIC_GIF_COLS.map((col, colIndex) => (
                <div className={col.length > 1 ? "gif-stack" : undefined} key={colIndex}>
                  {col.map((src, index) => (
                    <img key={src} src={src} alt={`动态生成案例 ${colIndex + 1}-${index + 1}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <article className="split-case reverse reveal">
            <Placeholder title="素材管理界面" note="建议替换：角色、渠道骨架、字效资产库" ratio="tall" src="/projects/资产库.png" />
            <div className="split-copy">
              <span className="eyebrow">SUB CASE 03 · 素材管理</span>
              <h2>把素材变成<br /><span>可复用资产</span></h2>
              <p>角色、骨架、字效与品牌资产，一次沉淀，跨模块复用。</p>
              <div className="reuse-stat"><strong>70%+</strong><span>核心资产复用率</span></div>
              <div className="asset-route"><span>一次沉淀</span><i>→</i><span>跨模块调用</span><i>→</i><span>持续复用</span></div>
              <div className="case-tags"><span>统一资产库</span><span>跨模块调用</span><span>权限与版本</span></div>
            </div>
          </article>

          <article className="template-case">
            <div className="template-case-head reveal">
              <div>
                <span className="eyebrow">SUB CASE 04 · 模板替换</span>
                <h2>解析 PSD 图层<br /><span>前端还原，批量替换</span></h2>
              </div>
              <div className="template-case-summary">
                <p>在前端还原可编辑版式；导入 Excel 文案和图片后，批量替换、预览、导出。</p>
                <div className="case-tags"><span>PSD 解析</span><span>前端还原</span><span>批量替换</span></div>
              </div>
            </div>
            <div className="template-case-shots">
              <figure className="template-case-shot reveal">
                <a href="/projects/模板替换-批量结果.webp" target="_blank" rel="noopener noreferrer" aria-label="查看模板替换批量结果大图">
                  <img src="/projects/模板替换-批量结果.webp" alt="模板替换界面，批量生成 20 套素材并预览不同成品" loading="lazy" decoding="async" />
                </a>
                <figcaption><span>01</span> 批量结果与成品预览 <small>查看大图 ↗</small></figcaption>
              </figure>
              <figure className="template-case-shot reveal">
                <a href="/projects/模板替换-配置流程.webp" target="_blank" rel="noopener noreferrer" aria-label="查看模板替换配置流程大图">
                  <img src="/projects/模板替换-配置流程.webp" alt="模板替换界面，配置 Excel 文案、字体与替换位" loading="lazy" decoding="async" />
                </a>
                <figcaption><span>02</span> 文案、字体与替换位配置 <small>查看大图 ↗</small></figcaption>
              </figure>
              <figure className="template-case-shot reveal">
                <a href="/projects/模板替换-成品展示.webp" target="_blank" rel="noopener noreferrer" aria-label="查看模板替换成品展示大图">
                  <img src="/projects/模板替换-成品展示.webp" alt="同一模板批量替换生成的四张不同人物与文案的卡片成品" loading="lazy" decoding="async" />
                </a>
                <figcaption><span>03</span> 同一模板的批量成品 <small>查看大图 ↗</small></figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>

      <section className="projects section-pad" id="projects">
        <div className="container">
          <div className="section-kicker project-kicker reveal"><span>SELECTED PROJECTS</span><b>项目集简介</b></div>
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article className="project-card reveal" key={project.no}>
                <Placeholder title={project.title} note="项目截图占位" src={project.image} />
                <div className="project-body">
                  <span className="project-no">PROJECT / {project.no}</span>
                  <h3>{project.title}</h3><p>{project.desc}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="strengths section-pad" id="about">
        <div className="container">
          <div className="section-kicker about-kicker reveal"><span>VALUE</span><b>我能为团队带来的价值</b></div>
          <div className="strength-grid">
            {STRENGTHS.map(([no, title, desc]) => (
              <div className="strength-card reveal" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <SceneFuture />

      <footer className="footer section-pad">
        <div className="footer-glow" />
        <div className="container footer-inner reveal">
          <h2>让 AI 效率<br /><em>融入生产系统</em></h2>
          <a href={RESUME_URL} download>下载简历 ↗</a>
          <div className="footer-bottom"><span>张喆涵项目作品集</span><span>FLOWX / 2026</span></div>
        </div>
      </footer>
    </>
  );
}

import Placeholder from "../components/Placeholder.jsx";
import { PROJECTS, RESUME_URL, STRENGTHS } from "../content.js";
import SceneFuture from "./SceneFuture.jsx";
import MarketEvidence from "./MarketEvidence.jsx";

const CAPABILITY_IMAGE = "/projects/flowx/platform-capability-overview.png";
const CAPABILITY_GROUPS = [
  { label: "素材批处理 · AI 管线", crop: [0, 0, 430, 416], alt: "人像切图与 Logo 延展" },
  { label: "动态营销素材 · AI 管线", crop: [466, 0, 427, 416], alt: "动图制作与 GIF 生成" },
  { label: "H5 长图类 · AI 管线", crop: [929, 0, 427, 416], alt: "H5 长图与蛋仔自动赛" },
  { label: "渠道平台素材 · AI 管线", crop: [1392, 0, 428, 416], alt: "游戏图标生成与渠道商店图" },
  { label: "通用能力 · AI 管线", crop: [0, 452, 1820, 389], alt: "图像处理、Logo 创作、三视图、视频、字体与 3D 工具", wide: true },
];

export default function MoreWork() {
  return (
    <>
      <section className="sub-cases section-pad" id="sub-cases">
        <div className="container">
          <div className="section-kicker sub-kicker reveal"><span>BUSINESS CASES</span><b>相同的产品思路，落到不同生产场景</b></div>

          <article className="split-case reveal">
            <div className="split-copy">
              <span className="eyebrow">03 / 动态内容供给平台化</span>
              <h2>把专业动效制作<br /><span>封装为自助生产能力</span></h2>
              <p>上传 KV，批量生成动效并按渠道规格导出。</p>
              <div className="mini-compare">
                <div className="old"><span>人工制作</span><b>约 15 分钟 / 条</b><small>专业人员调整与导出</small></div>
                <div className="new"><span>平台化供给</span><b>约 1 分钟 / 条</b><small>模板复用与规格封装</small></div>
              </div>
            </div>
            <div className="dynamic-proof">
              <Placeholder title="动态素材批量任务与图片集合包界面" src="/projects/图片集合包.png" />
              <div className="dynamic-examples"><img src="/projects/gif1.gif" alt="平台生成的动态营销素材示例一" loading="lazy" /><img src="/projects/gif2.gif" alt="平台生成的动态营销素材示例二" loading="lazy" /></div>
            </div>
          </article>

          <article className="split-case reverse reveal">
            <Placeholder title="角色、版式、字效与品牌素材的统一资产库" src="/projects/资产库.png" />
            <div className="split-copy">
              <span className="eyebrow">04 / 素材资产化与复用</span>
              <h2>沉淀一次素材<br /><span>服务多条生产管线</span></h2>
              <p>角色、版式与字效结构化入库，跨模块复用。</p>
              <div className="reuse-stat"><strong>70%+</strong><span>核心资产复用率</span></div>
              <div className="asset-route"><span>结构化沉淀</span><span>跨模块引用</span><span>持续复用</span></div>
            </div>
          </article>

          <article className="template-case">
            <div className="template-case-head reveal">
              <div><span className="eyebrow">05 / 表格驱动的模板批量替换</span><h2>模板驱动生产<br /><span>规模化内容交付</span></h2></div>
            </div>
            <div className="template-proof-grid reveal">
              <figure><img src="/projects/模板替换-配置流程.webp" alt="模板批量替换的 Excel 数据、字体与图层配置界面" loading="lazy" decoding="async" /></figure>
              <figure><img src="/projects/模板替换-成品展示.webp" alt="同一模板生成的不同人物与文案卡片成品" loading="lazy" decoding="async" /></figure>
            </div>
          </article>
        </div>
      </section>

      <MarketEvidence />

      <section className="projects section-pad" id="projects">
        <div className="container">
          <div className="section-kicker project-kicker reveal"><span>PRODUCT MODULES</span><b>项目集 · 平台产品模块</b></div>
        </div>
        <figure className="capability-overview reveal">
          <div className="capability-groups">
            {CAPABILITY_GROUPS.map(({ label, crop: [x, y, width, height], alt, wide }) => (
              <div className={`capability-group${wide ? " capability-group-wide" : ""}`} key={label}>
                <h3 className="capability-label">{label}</h3>
                <div className="capability-crop" style={{ aspectRatio: `${width} / ${height}` }}>
                  <img src={CAPABILITY_IMAGE} alt={alt} width="1820" height="841" loading="lazy" decoding="async" style={{ width: `${1820 / width * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </figure>
        <div className="container">
          <div className="project-grid">
            {PROJECTS.map((project) => <article className="project-card reveal" key={project.no}><Placeholder title={project.title} src={project.image} /><div className="project-body"><span className="project-no">MODULE / {project.no}</span><h3>{project.title}</h3><p>{project.desc}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}
          </div>
        </div>
      </section>

      <section className="strengths section-pad" id="about">
        <div className="container">
          <div className="section-kicker about-kicker reveal"><span>ABOUT ME</span></div>
          <div className="strength-grid">
            {STRENGTHS.map(([no, title, desc]) => <div className="strength-card reveal" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></div>)}
          </div>
          <p className="about-tools reveal"><span>工具与技能</span>Figma / 产品原型与 Spec / Python / Web 前端 / 异步任务与前后端协作</p>
          <SceneFuture embedded />
        </div>
      </section>

      <footer className="footer section-pad" id="contact">
        <div className="footer-glow" />
        <div className="container footer-inner reveal">
          <p className="eyebrow">LET’S CONNECT</p>
          <h2>让 AI 效率<br /><em>融入生产系统</em></h2>
          <a href={RESUME_URL} download>下载完整简历</a>
        </div>
      </footer>
    </>
  );
}

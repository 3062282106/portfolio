import { useEffect, useRef, useState } from "react";
import Placeholder from "../components/Placeholder.jsx";
import { CANVAS_DEMOS, PROJECTS, RESUME_URL, STRENGTHS, WORKFLOW_DEMOS } from "../content.js";
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

const TEAM_POSTERS = [
  { file: "act", name: "ACT" },
  { file: "arneb", name: "Arneb with WoG" },
  { file: "ft", name: "FT" },
  { file: "rival", name: "Rival Esports" },
].map(({ file, name }) => ({ src: `/projects/flowx/template-team-${file}.png`, alt: `${name} 战队模板替换海报成品` }));

function TeamPosters() {
  const dialogRef = useRef(null);
  const [poster, setPoster] = useState(null);

  function openPoster(image) {
    setPoster(image);
    dialogRef.current.showModal();
  }

  return (
    <>
      <div className="template-team-grid">
        {TEAM_POSTERS.map((image) => (
          <figure key={image.src}>
            <button className="team-poster-trigger" type="button" aria-label={`放大查看 ${image.alt}`} onClick={() => openPoster(image)}>
              <img src={image.src} alt={image.alt} width="1920" height="1080" loading="lazy" decoding="async" />
            </button>
          </figure>
        ))}
      </div>
      <dialog className="team-poster-preview" ref={dialogRef} aria-label={poster?.alt} onClose={() => setPoster(null)} onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <button type="button" aria-label="关闭海报预览" onClick={() => dialogRef.current.close()}>×</button>
        {poster && <img src={poster.src} alt={poster.alt} width="1920" height="1080" />}
      </dialog>
    </>
  );
}

function DemoVideo({ title, video, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const element = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.play().catch(() => {});
      } else {
        element.pause();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={videoRef} className="platform-demo-video" aria-label={`${title}演示`} controls muted loop playsInline preload="none" poster={poster}>
      <source src={video} type="video/mp4" />
      <a href={video}>查看{title}演示视频</a>
    </video>
  );
}

function DemoGrid({ id, demos, className = "" }) {
  return (
    <div className={`project-grid canvas-demos ${className}`} id={id}>
      {demos.map((demo) => (
        <article className="reveal" key={demo.title}>
          <div className="project-body"><h3>{demo.title}</h3>{demo.desc && <p>{demo.desc}</p>}</div>
          <DemoVideo {...demo} />
        </article>
      ))}
    </div>
  );
}

export default function MoreWork() {
  return (
    <>
      <section className="sub-cases section-pad" id="sub-cases">
        <div className="container">
          <div className="section-kicker sub-kicker reveal"><span>BUSINESS CASES</span><b>相同的产品思路，落到不同生产场景</b></div>

          <article className="split-case dynamic-case reveal" id="dynamic-case">
            <div className="dynamic-case-intro">
              <div className="split-copy">
                <span className="eyebrow">03 / 动态内容供给平台化</span>
                <h2>把专业动效制作<br /><span>封装为自助生产能力</span></h2>
                <p>上传 KV，批量生成动效并按渠道规格导出。</p>
                <div className="mini-compare">
                  <div className="old"><span>人工制作</span><b>约 15 分钟 / 条</b><small>专业人员调整与导出</small></div>
                  <div className="new"><span>平台化供给</span><b>约 1 分钟 / 条</b><small>模板复用与规格封装</small></div>
                </div>
              </div>
              <figure className="dynamic-demo">
                <img src="/projects/flowx/gif-generation-demo.gif" alt="GIF 自助生产演示：上传图片、配置动效并生成动态素材" width="1600" height="900" loading="lazy" decoding="async" />
              </figure>
            </div>
            <div className="dynamic-proof">
              <Placeholder title="动态素材批量任务与图片集合包界面" src="/projects/图片集合包.png" />
              <div className="dynamic-examples"><img src="/projects/gif1.gif" alt="平台生成的动态营销素材示例一" loading="lazy" /><img src="/projects/gif2.gif" alt="平台生成的动态营销素材示例二" loading="lazy" /></div>
            </div>
          </article>

          <article className="template-case" id="template-case">
            <div className="template-case-head reveal">
              <div><span className="eyebrow">04 / 表格驱动的模板批量替换</span><h2>模板驱动生产<br /><span>规模化内容交付</span></h2></div>
            </div>
            <div className="template-proof-grid reveal">
              <figure>
                <DemoVideo title="模板替换" video="/projects/flowx/template-swap-demo.mp4" poster="/projects/flowx/template-swap-demo-poster.webp" />
              </figure>
              <figure><img src="/projects/模板替换-配置流程.webp" alt="模板批量替换的 Excel 数据、字体与图层配置界面" loading="lazy" decoding="async" /></figure>
              <TeamPosters />
            </div>
          </article>
          <section className="canvas-demo-section" aria-labelledby="canvas-demo-heading">
            <h2 className="reveal" id="canvas-demo-heading">画布与素材制作</h2>
            <DemoGrid id="canvas-demos" demos={CANVAS_DEMOS} />
            <DemoGrid id="workflow-demos" demos={WORKFLOW_DEMOS} className="workflow-demos" />
          </section>
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
            {PROJECTS.map((project) => (
              <article className="project-card reveal" key={project.no}>
                <Placeholder title={project.title} src={project.image} />
                <div className="project-body"><span className="project-no">MODULE / {project.no}</span><h3>{project.title}</h3><p>{project.desc}</p></div>
              </article>
            ))}
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

import { useEffect, useRef, useState } from "react";
import HeroCanvas from "./components/HeroCanvas.jsx";

const NAV = [
  { href: "#background", label: "项目背景" },
  { href: "#main-case", label: "旗舰项目" },
  { href: "#agent", label: "Agent" },
  { href: "#sub-cases", label: "副案例" },
  { href: "#projects", label: "项目集" },
  { href: "#about", label: "关于我" },
];

const CASE_RESULT = [
  { value: "40,000+", unit: "资源", label: "回流模块累计产出" },
  { value: "约50", unit: "倍", label: "产出效率提升" },
  { value: "70%", unit: "", label: "素材成本降低" },
  { value: "90%", unit: "", label: "业务验收一次通过率" },
];

const PAINS = [
  {
    no: "01",
    title: "单张数小时",
    text: "质量与产量无法兼得。",
    tag: "产能",
  },
  {
    no: "02",
    title: "切图慢、质量低",
    text: "渠道越多，多样性越差。",
    tag: "质量",
  },
  {
    no: "03",
    title: "跨部门反复对齐",
    text: "运营提要求，设计师逐张执行。",
    tag: "协作",
  },
];

const OLD_FLOW = ["运营提需求", "设计转译", "逐渠道制作", "反复返工"];
const NEW_FLOW = ["规则配置", "批量生成", "资产合成", "成品交付"];

const HUMAN_COMPARE = [
  ["协作", "运营 ↔ 设计反复对齐", "运营配置，系统执行"],
  ["生产", "逐张制作", "分钟级批量交付"],
  ["扩产", "加人、加班", "复制规则"],
];

const AI_COMPARE = [
  ["输入", "提示词", "企业资产 + 渠道 + 业务规则"],
  ["输出", "质量波动的半成品", "可投放成品"],
  ["复用", "每次重来", "跨公司 / 行业配置复用"],
];

const MAIN_RESULTS = [
  { value: "40,000+", unit: "资源", label: "回流模块累计素材产出" },
  { value: "约50", unit: "倍", label: "产出效率提升" },
  { value: "70%", unit: "", label: "素材生成成本降低" },
  { value: "90%", unit: "", label: "业务验收一次通过率" },
  { value: "94%+", unit: "", label: "生成良品率" },
  { value: "20+", unit: "项", label: "已落地项目" },
];

const PROJECTS = [
  { no: "01", title: "AI 分镜助手", desc: "把脚本拆成可编辑、可执行的视频任务。", tags: ["AI 分镜", "视频生成", "异步任务"] },
  { no: "02", title: "H5 组件生成", desc: "用原型骨架约束布局，稳定迁移 KV 风格。", tags: ["原型约束", "布局匹配", "风格跟随"] },
  { no: "03", title: "可视化节点画布", desc: "让复杂生成流程可观察、可保存、可复用。", tags: ["节点编排", "状态持久化", "工作流"] },
  { no: "04", title: "智能扩图与局部重绘", desc: "把局部修正变成可控、可恢复的任务。", tags: ["Inpaint", "Mask", "任务恢复"] },
  { no: "05", title: "角色三视图生成", desc: "锁定角色比例，支持批量生成与失败重试。", tags: ["一致性", "批量生成", "失败兜底"] },
  { no: "06", title: "Logo 创作模块", desc: "透明底、多尺寸、多模型，一次完成品牌延展。", tags: ["透明底", "多尺寸", "多模型"] },
];

const STRENGTHS = [
  ["01", "业务问题抽象", "把隐性经验，转成可配置规则。"],
  ["02", "AI 机制设计", "为模型设计路由、验收、兜底与恢复。"],
  ["03", "复杂流程产品化", "把多角色、多工具收敛成一条任务路径。"],
  ["04", "跨团队落地", "拉通运营、美术与研发，持续交付。"],
];

function useReveal() {
  const root = useRef(null);
  useEffect(() => {
    const nodes = root.current?.querySelectorAll(".reveal") ?? [];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return root;
}

function Placeholder({ title, note = "待替换真实产品截图", ratio = "wide" }) {
  return (
    <div className={`placeholder ${ratio}`} role="img" aria-label={`${title}占位图`}>
      <div className="ph-grid" />
      <span className="ph-index">IMAGE PLACEHOLDER</span>
      <div className="ph-center">
        <span className="ph-icon">＋</span>
        <strong>{title}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#top"><i /> ZZH · AI PRODUCT</a>
      <div className="nav-links">
        {NAV.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </div>
      <a className="nav-contact" href="mailto:3062282106@qq.com">联系我 ↗</a>
    </nav>
  );
}

function ChapterHead({ eyebrow, title, highlight, desc }) {
  return (
    <header className="chapter-head reveal">
      <div className="chapter-label"><span className="eyebrow">{eyebrow}</span></div>
      <div>
        <h3>{title} {highlight && <em>{highlight}</em>}</h3>
        {desc && <p>{desc}</p>}
      </div>
    </header>
  );
}

function FlowLane({ title, tone, items }) {
  return (
    <div className={`flow-lane ${tone}`}>
      <div className="lane-label">{title}</div>
      <div className="lane-steps">
        {items.map((item, index) => (
          <div className="lane-step" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item}</b>
            {index < items.length - 1 && <i>→</i>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareMatrix({ title, left, right, tone, rows, conclusion }) {
  return (
    <section className={`compare-matrix ${tone} reveal`}>
      <header>
        <h4>{title}</h4>
      </header>
      <div className="matrix-head">
        <span />
        <b>{left}</b>
        <b>{right}</b>
      </div>
      {rows.map(([label, before, after]) => (
        <div className="matrix-row" key={label}>
          <span>{label}</span>
          <p>{before}</p>
          <p>{after}</p>
        </div>
      ))}
      <footer>{conclusion}</footer>
    </section>
  );
}

export default function App() {
  const root = useReveal();
  return (
    <div ref={root} id="top">
      <Nav />

      <main>
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
            <a className="hero-cta" href="#main-case">查看旗舰项目</a>
          </div>
        </section>

        <section className="bg-sec" id="background">
          <div className="container bg-grid">
            <div className="bg-copy reveal">
              <h2 className="bg-title">从定制走向规模化供给</h2>
              <div className="bg-body">
                <p>参与网易游戏 AI 应用平台建设，负责游戏营销素材自动化。</p>
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

        <section className="main-case section-pad" id="main-case">
          <div className="container">
            <div className="case-cover reveal">
              <span className="case-eyebrow">旗舰项目｜游戏回流营销素材生产</span>
              <h2 className="case-title">分钟级产出效率，<em>生成即投放</em></h2>
              <div className="case-result">
                {CASE_RESULT.map((item) => (
                  <div className="case-res" key={item.label}>
                    <strong>{item.value}<small>{item.unit}</small></strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <article className="chapter">
              <ChapterHead eyebrow="业务痛点" title="增长，受制于" highlight="人力产能" />
              <div className="pain-grid reveal">
                {PAINS.map((pain) => (
                  <div className="pain-card" key={pain.no}>
                    <div className="pain-top"><span>{pain.no}</span><b>{pain.tag}</b></div>
                    <h4>{pain.title}</h4><p>{pain.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="chapter">
              <ChapterHead eyebrow="流程重构" title="从逐张制作，" highlight="到规则驱动" />
              <div className="flow-stack reveal">
                <FlowLane title="过去 · 依赖人" tone="old" items={OLD_FLOW} />
                <FlowLane title="现在 · 系统承接" tone="new" items={NEW_FLOW} />
              </div>
            </article>

            <article className="chapter">
              <ChapterHead eyebrow="价值对比" title="同样是 AI，" highlight="差在交付" />

              <div className="compare-stack">
                <CompareMatrix title="解决人工瓶颈" left="人工流程" right="FlowX" tone="human" rows={HUMAN_COMPARE} conclusion="人力扩产 → 系统扩产" />
                <CompareMatrix title="跨过通用 AI 的最后一公里" left="通用 AI" right="FlowX" tone="ai" rows={AI_COMPARE} conclusion="生成图片 → 交付成品" />
              </div>
            </article>

            <article className="chapter">
              <ChapterHead eyebrow="系统蓝图" title="企业规则，" highlight="就是产品壁垒" />
              <div className="system-map reveal">
                <div className="system-inputs">
                  <span>业务规则</span><span>内容策略</span><span>渠道规格</span><span>品牌资产</span>
                </div>
                <div className="system-engine">
                  <div className="engine-title"><b>FLOWX 生产引擎</b><span>把模型能力封装为稳定交付</span></div>
                  <div className="engine-layers">
                    <div><span>策略</span><b>307 条场景策略</b><small>规则化选题与提示词</small></div>
                    <div><span>生成</span><b>模型路由</b><small>质量匹配与版本生成</small></div>
                    <div><span>合成</span><b>固定资产分层</b><small>Logo / 字体 / 奖励不重绘</small></div>
                    <div><span>任务</span><b>状态与恢复</b><small>失败兜底、续跑、交付</small></div>
                  </div>
                </div>
                <div className="system-outputs"><span>可投放成品</span><span>64 种渠道规格</span><span>A/B 版本</span><span>可追踪任务</span></div>
              </div>
              <div className="value-strip reveal">
                <span>差异化价值</span>
                <p>可按企业资产、渠道与业务规则配置，复用到不同公司 / 行业。</p>
              </div>
            </article>

            <article className="chapter result-chapter">
              <ChapterHead eyebrow="结果" title="从一次生成，" highlight="到规模化生产" />
              <div className="result-grid reveal">
                {MAIN_RESULTS.map((result) => (
                  <div className="result-card" key={result.label}>
                    <strong>{result.value}<small>{result.unit}</small></strong><span>{result.label}</span>
                  </div>
                ))}
              </div>
              <Placeholder title="旗舰项目结果拼图" note="建议替换：多游戏、多渠道结果与 A/B 对比" />
            </article>
          </div>
        </section>

        <section className="agent section-pad" id="agent">
          <div className="container">
            <article className="agent-page reveal">
              <div className="agent-copy">
                <span className="eyebrow">Agent 价值</span>
                <h2>将跨工具操作<br /><span>压缩为单次输入</span></h2>
                <p>自动选工具、串流程、盯状态，把多步操作收敛成一次交付。</p>
              </div>
              <div className="agent-compare">
                <div className="agent-route old">
                  <header><span>过去</span><b>用户编排工具</b></header>
                  {['找到正确模块','理解并填写参数','上传与引用素材','等待并检查状态','手动进入下一步'].map((x, i) => <div key={x}><i>{i + 1}</i>{x}</div>)}
                  <footer>高学习成本 · 多步骤 · 易中断</footer>
                </div>
                <div className="route-vs">VS</div>
                <div className="agent-route new">
                  <header><span>现在</span><b>Agent 编排任务</b></header>
                  {['描述批量目标','自动拆解步骤','批量调用工具','跟踪与失败恢复','交付完整结果'].map((x, i) => <div key={x}><i>{i + 1}</i>{x}</div>)}
                  <footer>跨步骤自动化 · 批量产出</footer>
                </div>
              </div>
            </article>

            <article className="agent-page architecture reveal">
              <div className="agent-copy">
                <span className="eyebrow">产品目标</span>
                <h2>支持 AI 统一编排<br /><span>平台能力</span></h2>
                <p>用户只说目标，系统完成规划、执行、跟踪与恢复。</p>
              </div>
              <div className="agent-map">
                <div className="agent-entry"><b>用户入口</b><span>小奈 / 沙包</span><small>自然语言需求与过程反馈</small></div>
                <div className="brain">
                  <header><b>AGENT MAIN BRAIN</b><span>理解 → 规划 → 执行 → 观察 → 恢复</span></header>
                  <div className="brain-grid"><span>意图路由</span><span>视觉理解</span><span>状态机</span><span>任务恢复</span></div>
                </div>
                <div className="tool-grid"><span>图片生成</span><span>素材管理</span><span>动态生成</span><span>任务中心</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="sub-cases section-pad" id="sub-cases">
          <div className="container">
            <div className="section-kicker reveal"><span>SUB CASES · 02–03</span><b>效率能力与资产底座</b></div>

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
              <Placeholder title="动态生成工作台" note="建议替换：参数面板 + 多规格结果" ratio="tall" />
            </article>

            <article className="split-case reverse reveal">
              <Placeholder title="素材管理界面" note="建议替换：角色、渠道骨架、字效资产库" ratio="tall" />
              <div className="split-copy">
                <span className="eyebrow">SUB CASE 03 · 素材管理</span>
                <h2>把素材变成<br /><span>可复用资产</span></h2>
                <p>角色、骨架、字效与品牌资产，一次沉淀，跨模块复用。</p>
                <div className="reuse-stat"><strong>70%+</strong><span>核心资产复用率</span></div>
                <div className="asset-route"><span>一次沉淀</span><i>→</i><span>跨模块调用</span><i>→</i><span>持续复用</span></div>
                <div className="case-tags"><span>统一资产库</span><span>跨模块调用</span><span>权限与版本</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="container">
            <div className="section-kicker reveal"><span>SELECTED PROJECTS</span><b>其余能力，以轻量卡片继续展开</b></div>
            <div className="project-grid">
              {PROJECTS.map((project) => (
                <article className="project-card reveal" key={project.no}>
                  <Placeholder title={project.title} note="项目截图占位" />
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
            <div className="section-kicker reveal"><span>AI PM VALUE</span><b>我能为团队带来的价值</b></div>
            <div className="strength-grid">
              {STRENGTHS.map(([no, title, desc]) => (
                <div className="strength-card reveal" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></div>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer section-pad">
          <div className="footer-glow" />
          <div className="container footer-inner reveal">
            <span className="eyebrow">LET'S BUILD SOMETHING USEFUL</span>
            <h2>让 AI<br /><em>稳定工作</em></h2>
            <a href="mailto:3062282106@qq.com">3062282106@qq.com ↗</a>
            <div className="footer-bottom"><span>张喆涵 · AI 产品经理作品集</span><span>FLOWX / 2026</span></div>
          </div>
        </footer>
      </main>
    </div>
  );
}

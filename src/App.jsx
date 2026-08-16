import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#main-case", label: "主案例" },
  { href: "#agent", label: "Agent" },
  { href: "#sub-cases", label: "副案例" },
  { href: "#projects", label: "项目集" },
  { href: "#about", label: "关于我" },
];

const HERO_METRICS = [
  { value: "20+", label: "已落地项目" },
  { value: "90%", label: "业务验收一次通过率" },
  { value: "70%", label: "素材生成成本降低" },
  { value: "70%+", label: "核心资产复用率" },
];

const PAINS = [
  {
    no: "01",
    title: "高质量很慢",
    text: "人工或半 AI 制作一张素材至少 20 分钟；批量投放时，2–3 人往往要投入大半天。",
    tag: "产能瓶颈",
  },
  {
    no: "02",
    title: "多样性不足",
    text: "同一套视觉跨渠道反复切图，难以形成足够的 A/B 方案，投放策略受制作能力限制。",
    tag: "策略瓶颈",
  },
  {
    no: "03",
    title: "人工合成易错",
    text: "字体、奖励、Logo、安全区和渠道规格都要逐项核对，重复劳动多，返工风险高。",
    tag: "质量瓶颈",
  },
];

const OLD_FLOW = ["理解需求", "生成底图", "手动挑图", "合成字体/奖励", "逐渠道切图", "逐张检查交付"];
const NEW_FLOW = ["选择游戏与场景", "匹配渠道策略", "批量生成 A/B 版本", "固定资产分层合成", "自动规格适配", "校验、恢复与下载"];

const COMPARE = [
  {
    tone: "old",
    eyebrow: "PAST / 旧流程",
    title: "依赖人工经验",
    lead: "能够做出高质量，但无法稳定规模化。",
    bullets: ["一张 ≥20 分钟", "字体、奖励、Logo 人工合成", "跨渠道主要依赖切图", "过程不可恢复，返工成本高"],
    footer: "结果：质量与产能二选一",
  },
  {
    tone: "generic",
    eyebrow: "GENERIC AI / 通用 AI",
    title: "能生成，不能交付",
    lead: "模型解决了“出图”，没有解决真实生产约束。",
    bullets: ["不知道 64 个渠道规格", "难以锁定品牌资产与安全区", "单张试错，缺少批量任务状态", "失败后没有业务级兜底"],
    footer: "结果：得到半成品，仍需二次加工",
  },
  {
    tone: "system",
    eyebrow: "FLOWX / 自研系统",
    title: "把经验变成生产线",
    lead: "把渠道、场景、资产、质量与恢复机制产品化。",
    bullets: ["64 渠道规格与 307 条场景提示词", "A/B 双版本，单批最高 128 张", "品牌资产固定分层合成", "任务可见、可恢复、可单渠道重生"],
    footer: "结果：15–20 分钟完成一批交付",
  },
];

const MAIN_RESULTS = [
  { value: "10", unit: "款", label: "游戏落地" },
  { value: "64", unit: "个", label: "渠道规格适配" },
  { value: "128", unit: "张", label: "单批最高产能" },
  { value: "15–20", unit: "min", label: "含奖励合成的批次交付" },
  { value: "94%+", unit: "", label: "生成良品率" },
  { value: "70%", unit: "", label: "素材生成成本降低" },
];

const PROJECTS = [
  { no: "01", title: "AI 分镜助手", desc: "从脚本到镜头结构、参考素材与视频生成任务，形成可编辑的异步生产链路。", tags: ["AI 分镜", "视频生成", "异步任务"] },
  { no: "02", title: "H5 组件生成", desc: "用原型骨架约束比例和布局，把 KV 风格迁移到可直接使用的活动长图。", tags: ["原型约束", "布局匹配", "风格跟随"] },
  { no: "03", title: "可视化节点画布", desc: "支持图像、视频节点编排与项目持久化，让复杂生成过程可观察、可复用。", tags: ["节点编排", "状态持久化", "工作流"] },
  { no: "04", title: "智能扩图与局部重绘", desc: "通过 Mask 编辑和并发限流，将局部修正沉淀为可控、可恢复的生成任务。", tags: ["Inpaint", "Mask", "任务恢复"] },
  { no: "05", title: "角色三视图生成", desc: "兼顾单角色与批量模式，锁定身体比例并为失败任务保留可重试槽位。", tags: ["一致性", "批量生成", "失败兜底"] },
  { no: "06", title: "Logo 创作模块", desc: "支持透明底、多尺寸延展和多模型选型，适配跨项目的品牌创作需求。", tags: ["透明底", "多尺寸", "多模型"] },
];

const STRENGTHS = [
  ["01", "业务问题抽象", "从真实生产瓶颈出发，把隐性的人工经验转化为可配置规则、默认路径与产品边界。"],
  ["02", "AI 机制设计", "围绕模型能力边界设计路由、兜底、恢复与质量验收，而不是只包装一次模型调用。"],
  ["03", "复杂流程产品化", "把多工具、多角色、多状态的协作过程，收敛为用户能够理解和稳定使用的工作流。"],
  ["04", "跨团队落地", "协同运营、美术和研发推进需求评审、原型、交付验收与数据反馈，持续迭代。"],
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

function ChapterHead({ index, eyebrow, title, highlight, desc }) {
  return (
    <header className="chapter-head reveal">
      <div className="chapter-index">{index}</div>
      <div>
        <span className="eyebrow">{eyebrow}</span>
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

export default function App() {
  const root = useReveal();
  return (
    <div ref={root} id="top">
      <Nav />

      <main>
        <section className="hero section-pad">
          <div className="hero-glow" />
          <div className="container hero-layout">
            <div className="hero-copy reveal">
              <span className="eyebrow">AI PRODUCT MANAGER · PORTFOLIO 2026</span>
              <h1>把一次生成，<br />设计成一套<br /><em>可运行的系统。</em></h1>
              <p>我关注的不只是模型能不能生成，而是团队能否在真实业务约束下，稳定、规模化地完成交付。</p>
              <div className="hero-actions">
                <a className="button primary" href="#main-case">查看主案例 ↓</a>
                <a className="button ghost" href="#projects">浏览项目集</a>
              </div>
            </div>
            <div className="hero-side reveal">
              <div className="hero-note"><span>当前方向</span><b>AI 产品经理</b></div>
              <Placeholder title="作品集封面 / 产品全景" note="建议替换：FlowX 工作台或多模块拼图" ratio="portrait" />
            </div>
          </div>
          <div className="container hero-metrics reveal">
            {HERO_METRICS.map((metric) => (
              <div className="hero-metric" key={metric.label}>
                <strong>{metric.value}</strong><span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="context section-pad" id="about">
          <div className="container context-grid">
            <div className="section-label reveal">PROFILE / 角色定位</div>
            <div className="context-copy reveal">
              <h2>不是给 AI 套一层界面，<br />而是让它进入<span>真实生产流程。</span></h2>
              <p>参与网易游戏 AI 应用平台 FlowX 建设，负责游戏营销素材自动化、动态素材、资产管理与 Agent 方向的产品方案。工作覆盖需求洞察、流程梳理、产品设计、项目推进、验收与迭代。</p>
              <div className="context-tags">
                <span>业务流程产品化</span><span>AI 能力边界</span><span>质量与兜底机制</span><span>Agent 工作流</span>
              </div>
            </div>
          </div>
        </section>

        <section className="main-case section-pad" id="main-case">
          <div className="container">
            <div className="case-cover reveal">
              <div className="cover-meta">
                <span>MAIN CASE · 01</span><span>游戏回流营销素材生产</span>
              </div>
              <div className="cover-grid">
                <div>
                  <h2>高质量不是问题。<br /><em>高质量却无法规模化，</em><br />才是问题。</h2>
                  <p>将人工经验、通用 AI 与自研产品放进同一条证据轨道，回答“为什么做、为什么是这套方案、为什么它不可替代”。</p>
                </div>
                <Placeholder title="主案例产品界面" note="建议替换：渠道批量生成工作台" />
              </div>
              <div className="case-scope">
                <span><i>角色</i>产品方案 / 流程设计 / 验收迭代</span>
                <span><i>对象</i>游戏运营与美术团队</span>
                <span><i>周期</i>从单点能力到批量生产系统</span>
              </div>
            </div>

            <article className="chapter">
              <ChapterHead index="01" eyebrow="BUSINESS PAIN / 业务痛点" title="问题不在生成速度，" highlight="而在交付规模。" desc="投放需要的不是一张好看的图，而是数十渠道、多版本、合规格、可验收的一批成品。" />
              <div className="pain-grid reveal">
                {PAINS.map((pain) => (
                  <div className="pain-card" key={pain.no}>
                    <div className="pain-top"><span>{pain.no}</span><b>{pain.tag}</b></div>
                    <h4>{pain.title}</h4><p>{pain.text}</p>
                  </div>
                ))}
              </div>
              <div className="problem-loop reveal">
                <div className="loop-core">投放规模扩大</div><i>→</i>
                <div>渠道与版本增加</div><i>→</i>
                <div>人工制作拥堵</div><i>→</i>
                <div>压缩测试空间</div><i>↺</i>
              </div>
            </article>

            <article className="chapter">
              <ChapterHead index="02" eyebrow="PAST WORKFLOW / 旧流程" title="质量来自人，" highlight="规模也被人锁住。" desc="过去的流程可以控制质量，却把每一次渠道适配都变成重复劳动。" />
              <div className="flow-stack reveal">
                <FlowLane title="旧流程 · 人工串行" tone="old" items={OLD_FLOW} />
                <FlowLane title="新流程 · 系统并行" tone="new" items={NEW_FLOW} />
              </div>
              <div className="time-contrast reveal">
                <div className="time-before"><span>过去</span><strong>≥20min</strong><p>单张半 AI 制作<br />批量任务需 2–3 人大半天</p></div>
                <div className="time-arrow">生产方式改变 →</div>
                <div className="time-after"><span>现在</span><strong>15–20min</strong><p>完成一批素材<br />包含奖励合成与渠道适配</p></div>
              </div>
            </article>

            <article className="chapter">
              <ChapterHead index="03" eyebrow="WHY NOT GENERIC AI / 为什么通用 AI 不够" title="三种方案放在一起，" highlight="价值才看得见。" desc="颜色对应三种生产方式：暖橙代表人工负担，冷蓝代表模型能力，绿色代表可交付系统。" />
              <div className="compare-stage reveal">
                {COMPARE.map((item) => (
                  <div className={`compare-card ${item.tone}`} key={item.tone}>
                    <div className="compare-band">{item.eyebrow}</div>
                    <div className="compare-body">
                      <h4>{item.title}</h4><p>{item.lead}</p>
                      <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                    </div>
                    <div className="compare-footer">{item.footer}</div>
                  </div>
                ))}
              </div>
              <div className="compare-conclusion reveal"><span>产品判断</span><p>真正的壁垒不是接入一个模型，而是把<strong>业务规则、品牌资产、任务状态与失败兜底</strong>一起设计进系统。</p></div>
            </article>

            <article className="chapter">
              <ChapterHead index="04" eyebrow="SYSTEM BLUEPRINT / 自研系统" title="把经验沉淀为" highlight="一条可运行的生产线。" desc="产品价值来自系统层：让不同模型、规则与固定资产在同一套生产协议下协作。" />
              <div className="system-map reveal">
                <div className="system-inputs">
                  <span>游戏信息</span><span>投放场景</span><span>渠道规格</span><span>品牌资产</span>
                </div>
                <div className="system-arrow">↓ 结构化输入</div>
                <div className="system-engine">
                  <div className="engine-title"><b>FLOWX 批量生产引擎</b><span>把不稳定生成封装为稳定任务</span></div>
                  <div className="engine-layers">
                    <div><span>策略层</span><b>307 条渠道化场景提示词</b><small>玩法 / 颜值 / 福利 / 情怀 / 紧迫感 / 社交</small></div>
                    <div><span>生成层</span><b>模型路由 + A/B 双版本</b><small>按质量要求选型，支持单渠道重生</small></div>
                    <div><span>资产层</span><b>字体 / 奖励 / Logo 分层合成</b><small>固定资产不参与重绘，保证品牌与信息准确</small></div>
                    <div><span>任务层</span><b>状态可见 + 异常恢复</b><small>失败自矫正、任务续跑、结果打包下载</small></div>
                  </div>
                </div>
                <div className="system-arrow">↓ 可验收输出</div>
                <div className="system-outputs"><span>64 渠道成品</span><span>A/B 版本</span><span>可恢复任务</span><span>ZIP 批量交付</span></div>
              </div>
              <div className="value-strip reveal">
                <span>不可替代的价值</span>
                <p>不是替用户多生成几张图，而是让原本依赖个人经验的工作，变成团队可以反复运行、持续优化的生产系统。</p>
              </div>
            </article>

            <article className="chapter result-chapter">
              <ChapterHead index="05" eyebrow="RESULT / 结果证据" title="结果不是 Demo，" highlight="而是稳定交付。" desc="数据同时证明产品的业务覆盖、生产效率、质量与成本价值。" />
              <div className="result-grid reveal">
                {MAIN_RESULTS.map((result) => (
                  <div className="result-card" key={result.label}>
                    <strong>{result.value}<small>{result.unit}</small></strong><span>{result.label}</span>
                  </div>
                ))}
              </div>
              <Placeholder title="主案例结果拼图" note="建议替换：多游戏、多渠道结果与 A/B 对比" />
            </article>
          </div>
        </section>

        <section className="agent section-pad" id="agent">
          <div className="container">
            <div className="section-kicker reveal"><span>SUB CASE · 01 / 2 PAGES</span><b>Agent 工作流</b></div>

            <article className="agent-page reveal">
              <div className="agent-copy">
                <span className="eyebrow">PAGE 01 · INTERACTION SHIFT</span>
                <h2>从“学会填参数”，<br />到<span>只需说清目标。</span></h2>
                <p>即使已有 FlowX 网站，用户过去仍要理解多个模块、填写参数并手动衔接步骤。Agent 把操作知识收进系统，把自然语言需求转成可执行任务。</p>
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
                  {['用户描述目标','Agent 理解意图','规划并调用工具','持续反馈状态','交付完整结果'].map((x, i) => <div key={x}><i>{i + 1}</i>{x}</div>)}
                  <footer>低门槛 · 可观察 · 可恢复</footer>
                </div>
              </div>
            </article>

            <article className="agent-page architecture reveal">
              <div className="agent-copy">
                <span className="eyebrow">PAGE 02 · AGENT ARCHITECTURE</span>
                <h2>一个入口背后，<br />是一套<span>可恢复的执行架构。</span></h2>
                <p>小奈 / 沙包负责对话体验，FlowX Skill 提供稳定工具协议；主脑负责理解、规划、观察与恢复。</p>
              </div>
              <div className="agent-map">
                <div className="agent-entry"><b>用户入口</b><span>小奈 / 沙包</span><small>自然语言需求与过程反馈</small></div>
                <div className="map-down">↓</div>
                <div className="brain">
                  <header><b>AGENT MAIN BRAIN</b><span>理解 → 规划 → 执行 → 观察 → 恢复</span></header>
                  <div className="brain-grid"><span>意图路由</span><span>视觉理解</span><span>状态机</span><span>任务恢复</span></div>
                </div>
                <div className="map-down">↓ TOOL CALLING</div>
                <div className="skill-layer"><b>FLOWX SKILL / 工具层</b><span>/tools</span><span>/upload</span><span>/tasks</span><span>/results</span></div>
                <div className="map-down">↓</div>
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
                <h2>把 AE 单张制作，<br />升级为<span>分钟级批量输出。</span></h2>
                <p>过去套用 AE 模板，一张动态素材也要十几分钟。现在通过模板参数化与批量任务，一次生成多个版本，并一键导出适配不同规格尺寸的 GIF。</p>
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
                <h2>素材不是附件，<br />而是<span>AI 生产的底层资产。</span></h2>
                <p>统一管理角色、渠道骨架、字体效果和品牌资产，让不同生成模块能够调用同一份可信内容，避免重复上传、版本混乱和错误重绘。</p>
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

        <section className="strengths section-pad">
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
            <h2>让 AI 不只会生成，<br /><em>更能够稳定工作。</em></h2>
            <a href="mailto:3062282106@qq.com">3062282106@qq.com ↗</a>
            <div className="footer-bottom"><span>张喆涵 · AI 产品经理作品集</span><span>FLOWX / 2026</span></div>
          </div>
        </footer>
      </main>
    </div>
  );
}

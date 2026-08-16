import { useEffect, useRef, useState } from "react";
import HeroCanvas from "./components/HeroCanvas.jsx";

const NAV = [
  { href: "#background", label: "项目背景" },
  { href: "#case", label: "主案例" },
  { href: "#about", label: "关于" },
  { href: "#projects", label: "精选项目" },
  { href: "#strengths", label: "个人优势" },
  { href: "#contact", label: "联系" },
];

const STATS = [
  { num: "20+", label: "已落地游戏项目" },
  { num: "64", label: "主流宣发渠道适配" },
  { num: "614", label: "场景数据集条目" },
  { num: "128", label: "单次任务最高产能" },
  { num: "90%", label: "业务验收一次通过率" },
  { num: "95%", label: "兜底后可用率" },
  { num: "65%", label: "素材生产效率提升" },
  { num: "70%+", label: "核心资产复用率" },
];

const PROJECTS = [
  {
    img: "/projects/回流.png",
    name: "游戏营销素材批量生产",
    desc: "按游戏与渠道配置文案、奖励与玩法类型后批量生成。将渠道规格与批量流程产品化，把人工逐张制作升级为用户自助批量生成。",
    tags: ["64 渠道", "A/B 双版", "任务可恢复", "场景数据集"],
  },
  {
    img: "/projects/分镜.png",
    name: "分镜助手与视频生成",
    desc: "AI 分镜生成、镜头编辑、素材引用与多角度参考图，与视频生成链路打通，采用异步任务状态推进。",
    tags: ["AI 分镜", "素材引用", "视频生成", "异步任务"],
  },
  {
    img: "/projects/logo.png",
    name: "LOGO 创作模块",
    desc: "支持图生图微调、多尺寸批量延展、透明底输出与名称入画，提供跨项目风格参考与多模型选型。",
    tags: ["图生图", "透明底", "批量延展", "多模型"],
  },
  {
    img: "/projects/H5.png",
    name: "H5 组件生成",
    desc: "以原型骨架图约束比例，实现切图与布局匹配，提示词风格跟随 KV 参考图，输出可直接使用的 H5 长图。",
    tags: ["原型约束", "切图匹配", "风格跟随"],
  },
  {
    img: "/projects/无限画布.png",
    name: "可视化节点画布",
    desc: "支持图片与视频节点上传、连线生成与项目持久化，刷新后恢复视口与已存项目状态。",
    tags: ["节点编排", "项目持久化", "状态恢复"],
  },
  {
    img: "/projects/智能扩图.png",
    name: "智能扩图与局部重绘",
    desc: "以 mask 标记编辑区域实现局部重绘，复用 inpaint 管线，支持剪贴板导入与并发限流。",
    tags: ["局部重绘", "mask 编辑", "并发限流"],
  },
  {
    img: "/projects/角色三视图.png",
    name: "角色三视图生成",
    desc: "支持单角色与批量双模式，锁定身材比例并规避非人角色拟人化，批量失败槽位标记化且任务可恢复。",
    tags: ["双模式", "比例锁定", "任务可恢复"],
  },
  {
    img: "/projects/模板替换.png",
    name: "模板替换",
    desc: "将动效模板、图层编排与渠道规格抽象为标准能力，推动动态素材从少量定制走向用户自助批量供给。",
    tags: ["标准能力", "图层编排", "批量供给"],
  },
];

const STRENGTHS = [
  {
    title: "产品规划与落地",
    desc: "具备需求分析、业务流程梳理、产品原型、Spec、需求评审、项目推进、产品验收及上线迭代的完整经验。",
  },
  {
    title: "业务场景理解",
    desc: "理解游戏营销投放场景下 64 个宣发渠道的规格约束与转化职责，将经验型投放策略沉淀为可配置的场景数据集。",
  },
  {
    title: "AI 产品机制设计",
    desc: "将高阶参数收敛为智能默认项，并为边缘失败场景设计 A/B 双版生成、单渠道重生成、模型切换等兜底机制。",
  },
  {
    title: "质量成本平衡",
    desc: "根据任务质量要求及模型能力边界设计分层路由策略，在维持素材良品率的前提下控制单次调用成本。",
  },
  {
    title: "Agent 工作流编排",
    desc: "定义任务拆解、工具调用、状态反馈、异常处理与结果交付规则，将分散操作整合为统一任务入口。",
  },
  {
    title: "跨团队协作推进",
    desc: "协同运营、美术与研发推进模块上线，通过用户反馈记录及任务路径分析驱动迭代与效果验收。",
  },
];

const CASE_RESULT = [
  { num: "20+", unit: "款", label: "已落地游戏项目" },
  { num: "64", unit: "个", label: "宣发渠道规格适配" },
  { num: "128", unit: "张", label: "单次任务最高产能" },
  { num: "70", unit: "%", label: "单张调用成本降低" },
];

const PAINS = [
  {
    n: "01",
    k: "规格适配",
    then: "每个渠道单独切图，尺寸与安全区人工比对。",
    now: "64 个渠道规格内建，生成即合规。",
  },
  {
    n: "02",
    k: "文案与字效",
    then: "字效、排版与文案逐项手动调整。",
    now: "场景策略按渠道自动匹配文案与字效。",
  },
  {
    n: "03",
    k: "视觉多样性",
    then: "单一视觉方案跨渠道复用，效果单一。",
    now: "A/B 双版生成，多样性内建于流程。",
  },
  {
    n: "04",
    k: "产能与沉淀",
    then: "产能受人力线性约束，经验难以复用。",
    now: "单次任务 12-15 分钟交付，策略可沉淀。",
  },
];

const VERSUS = [
  { dim: "产出方式", a: "单张生成，逐次试错", b: "批量生成，单次最多 128 张" },
  { dim: "参数门槛", a: "提示词与模型参数需人工配置", b: "高阶参数收敛为智能默认项" },
  { dim: "规格适配", a: "生成后人工裁切适配", b: "64 个渠道规格与安全区内建" },
  { dim: "品牌资产", a: "LOGO 与奖励存在重绘风险", b: "固定资产分层合成，不参与生成", key: true },
  { dim: "交付状态", a: "半成品，需二次加工", b: "可直接进入投放" },
];

const LAYER_DEFAULT = [
  "智能默认项",
  "六类投放策略自动匹配",
  "渠道规格自动适配",
  "按任务要求自动选择模型",
];

const LAYER_CONTROL = [
  "A/B 双版生成",
  "失败自矫正",
  "单渠道重生成",
  "模型切换与任务状态反馈",
];

const FLOW = [
  {
    n: "01",
    t: "配置输入",
    d: "选择游戏与渠道，输入文案、奖励与玩法信息。",
  },
  {
    n: "02",
    t: "自动匹配与生成",
    d: "匹配渠道规格与场景策略，按质量要求路由模型，批量生成 A/B 双版。",
  },
  {
    n: "03",
    t: "校验与交付",
    d: "自动检查与失败兜底，按渠道预览、重生成与下载。",
  },
];

const STRATEGY = ["玩法", "颜值", "福利", "情怀", "紧迫感", "社交"];

const TAKEAWAYS = [
  "AI 产品的首要工作不是开放参数，而是收敛默认路径。",
  "质量机制需与失败恢复机制同步设计。",
  "模型选型应服务业务风险等级，而非追求单一模型效果。",
  "经验须经结构化与可迭代设计，才能成为可复用的产品资产。",
];

const METRICS = [
  { lab: "业务验收一次通过率", val: "90", unit: "%", pct: 90 },
  { lab: "兜底后可用率", val: "95", unit: "%", pct: 95 },
  { lab: "单张调用成本降低", val: "70", unit: "%", pct: 70 },
];

function CaseHead({ eyebrow, title, em, tail, sub }) {
  return (
    <div className="case-head center">
      {eyebrow && <div className="case-eyebrow">{eyebrow}</div>}
      <h3 className="case-h">
        {title}
        {em && <> <i className="em-serif">{em}</i></>}
        {tail}
      </h3>
      {sub && <p className="case-sub">{sub}</p>}
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    const targets = el.querySelectorAll(".reveal");
    targets.forEach((t) => io.observe(t));
    return () => targets.forEach((t) => io.unobserve(t));
  }, []);
  return ref;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#top">ZZH<b>®</b></a>
        <div className="nav-links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </div>
        <a className="nav-cta" href="mailto:3062282106@qq.com">联系我</a>
      </div>
    </nav>
  );
}

function SectionHead({ title, em, sub }) {
  return (
    <div className="sec-head reveal">
      <h2 className="sec-title">
        {title}
        {em && <> <i className="em-serif">{em}</i></>}
      </h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

export default function App() {
  const ref = useReveal();
  return (
    <div ref={ref} id="top">
      <Nav />

      {/* 1. HERO */}
      <section className="hero" id="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <HeroCanvas />
        <div className="hero-planet" />

        <span className="hero-spark plus" style={{ left: "12%", top: "13%", animationDelay: "0s" }}>+</span>
        <span className="hero-spark plus" style={{ left: "12.5%", top: "54%", animationDelay: "1.4s" }}>+</span>
        <span className="hero-spark plus" style={{ right: "13%", top: "56%", animationDelay: "2.1s" }}>+</span>
        <span className="hero-spark star" style={{ right: "31%", top: "26%", animationDelay: "0.7s" }}>✦</span>
        <span className="hero-spark star" style={{ left: "31%", top: "34%", animationDelay: "1.9s" }}>✦</span>

        <div className="hero-inner">
          <h1 className="hero-title">
            <span className="line bold">从 0 到 1</span>
            <span className="line serif-italic scribble">
              把 AI 想法
              <svg className="ellipse" viewBox="0 0 300 120" aria-hidden="true" preserveAspectRatio="none">
                <path d="M 196 10 C 262 16, 294 36, 292 58 C 289 88, 208 110, 122 110 C 44 110, 6 88, 8 62 C 10 36, 62 15, 128 11" />
              </svg>
              <span className="scribble-sparks">✦<span className="s2">✦</span></span>
            </span>
            <span className="line bold">变成可用产品</span>
          </h1>
          <a className="hero-cta" href="#projects">查看精选项目</a>
        </div>

        <p className="hero-sub">
          张喆涵 <i className="serif-italic">是</i> AI 产品经理 <i className="serif-italic">/</i> AI 运营{" "}
          <i className="serif-italic">/</i> AI 应用开发<i className="serif-italic">，把</i>{" "}
          <span className="em-sans">6+ 家大模型</span> <i className="serif-italic">整合为</i>{" "}
          标准化的<i className="serif-italic">批量素材生产流程</i><i className="serif-italic">。</i>
        </p>
      </section>

      {/* 2. 项目背景 */}
      <section className="bg-sec" id="background">
        <div className="container">
          <div className="bg-grid">
            <div className="bg-copy reveal">
              <h2 className="bg-title">
                参与网易游戏 AI 应用平台建设，<br />
                <span className="thin">负责游戏营销素材自动化模块的产品方案。</span>
              </h2>
              <div className="bg-body">
                <p>
                  平台面向游戏运营与设计团队，解决通用 AI 难适配内部模型、固定素材规格及品牌规范的问题。每款游戏有各自的角色、画风与品牌规范，每个渠道有固定尺寸与构图安全区，运营用户则不熟悉提示词与模型参数配置。
                </p>
                <p>
                  通过用户反馈记录及任务路径分析，定位参数理解成本高、生成失败后缺少指引、跨工具操作繁琐等问题，推动智能默认、异常兜底及任务状态反馈等机制落地，降低 AI 工具使用门槛。
                </p>
              </div>
              <div className="bg-facts">
                <div className="bg-fact">
                  <span className="k">服务对象</span>
                  <span className="v">游戏运营与设计团队</span>
                </div>
                <div className="bg-fact">
                  <span className="k">我的角色</span>
                  <span className="v">产品方案、业务流程梳理、交互原型、效果验收与迭代推进</span>
                </div>
                <div className="bg-fact">
                  <span className="k">产品机制</span>
                  <span className="v">智能默认、异常兜底、任务状态反馈</span>
                </div>
              </div>
            </div>

            <div className="bg-shot reveal">
              <figure className="shot3d">
                <div className="shot3d-glow" />
                <div className="shot3d-frame">
                  <div className="shot3d-back" />
                  <span className="shot3d-edge side" />
                  <span className="shot3d-edge bottom" />
                  <img src="/platform-home.png" alt="FlowX 内容制作中心 · AI 应用平台首页" loading="lazy" />
                  <div className="shot3d-sheen" />
                  <div className="shot3d-rim" />
                </div>
                <div className="shot3d-shadow" />
                <figcaption className="shot3d-cap">
                  内容制作中心 · AI 应用平台 <span className="ver">V1.5.0</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 主案例：游戏营销素材自动化 */}
      <section className="case" id="case">
        <div className="container">

          {/* 01 封面：结果先行 */}
          <div className="case-cover reveal">
            <div className="case-eyebrow">Main Case</div>
            <h2 className="case-title">
              让复杂 AI，<i className="em-serif">默认可用</i>
            </h2>
            <p className="case-lede">
              游戏营销素材自动化生产：将渠道规格与批量流程产品化，把人工逐张制作升级为用户自助批量生成。
            </p>
            <div className="case-result">
              {CASE_RESULT.map((r) => (
                <div className="case-res" key={r.label}>
                  <div className="case-res-num">{r.num}<span className="u">{r.unit}</span></div>
                  <div className="case-res-lab">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 02 出发点 */}
          <div className="case-screen reveal">
            <CaseHead
              title="素材产能，构成投放规模的"
              em="实际上限"
            />
            <div className="gap2">
              <div className="gap2-col">
                <div className="gap2-tag">投放侧需求</div>
                <p className="gap2-line">同一场活动，数十个渠道，各自合规的成品。</p>
              </div>
              <div className="gap2-vs">
                <span>产能落差</span>
              </div>
              <div className="gap2-col">
                <div className="gap2-tag">供给侧现状</div>
                <p className="gap2-line">人工逐张制作，产能受人力线性约束。</p>
              </div>
            </div>
            <p className="gap2-note">
              节奏收紧时，只能压缩渠道数量或降低交付标准。
            </p>
          </div>

          {/* 03 痛点对照 */}
          <div className="case-screen reveal">
            <CaseHead
              title="从人工逐张制作，到"
              em="用户自助批量生成"
            />
            <div className="pain-head">
              <span />
              <span className="cmp-a">改造前</span>
              <span className="cmp-b">改造后</span>
            </div>
            <div className="pains">
              {PAINS.map((p) => (
                <div className="pain" key={p.n}>
                  <div className="pain-k">
                    <span className="pain-n">{p.n}</span>
                    <span className="pain-t">{p.k}</span>
                  </div>
                  <div className="pain-then">{p.then}</div>
                  <div className="pain-now">{p.now}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 04 通用 AI vs 我们 */}
          <div className="case-screen reveal">
            <CaseHead
              title="通用 AI 工具与生产流程的"
              em="能力边界"
              sub="核心差异不在生成质量，而在生成结果能否直接进入业务交付。"
            />
            <div className="vs">
              <div className="vs-row vs-th">
                <div className="vs-dim" />
                <div className="vs-a">通用 AI 工具</div>
                <div className="vs-b">标准化生产流程</div>
              </div>
              {VERSUS.map((v) => (
                <div className={`vs-row ${v.key ? "key" : ""}`} key={v.dim}>
                  <div className="vs-dim">{v.dim}</div>
                  <div className="vs-a">{v.a}</div>
                  <div className="vs-b">{v.b}</div>
                </div>
              ))}
            </div>
            <p className="vs-note">
              其中品牌资产为关键约束：LOGO 与奖励图需保持<i className="em-serif">像素级一致</i>。生成式模型对该类元素存在重绘风险，因此固定资产以分层合成方式处理，不纳入生成环节。
            </p>
          </div>

          {/* 04 核心判断：双层结构 */}
          <div className="case-screen reveal">
            <CaseHead title="智能默认与" em="异常兜底" sub="高阶参数收敛为智能默认项，边缘失败场景保留可恢复路径。" />
            <div className="dual">
              <div className="dual-layer">
                <div className="dual-tag">智能默认</div>
                <ul className="dual-list">
                  {LAYER_DEFAULT.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <div className="dual-layer alt">
                <div className="dual-tag">异常兜底</div>
                <ul className="dual-list">
                  {LAYER_CONTROL.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
            <blockquote className="case-quote">
              AI 产品的价值不在于开放更多参数，<b>而在于降低获得正确结果所需的判断成本。</b>
            </blockquote>
          </div>

          {/* 05 产品方案：端到端 */}
          <div className="case-screen reveal">
            <CaseHead title="端到端" em="生产链路" sub="从任务输入到结果交付的完整流程定义。" />
            <div className="steps">
              {FLOW.map((f) => (
                <div className="step" key={f.n}>
                  <span className="step-ghost">{f.n}</span>
                  <div className="step-body">
                    <h4 className="step-t">{f.t}</h4>
                    <p className="step-d">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ph-grid">
              {["参数配置与任务输入", "批量生成与渠道预览", "状态追踪与结果交付"].map((p) => (
                <div className="ph" key={p}>
                  <div className="ph-name">{p}</div>
                  <div className="ph-note">结构示意，后续替换为脱敏产品界面</div>
                </div>
              ))}
            </div>
          </div>

          {/* 06 策略资产化 */}
          <div className="case-screen reveal">
            <CaseHead title="投放策略" em="资产化" sub="针对经验型投放策略难以沉淀的问题，构建可按渠道自动匹配的场景数据集。" />
            <div className="asset-grid">
              <div className="asset-live">
                <div className="asset-state on">已落地</div>
                <div className="asset-num">614<span className="u">条</span></div>
                <div className="asset-lab">场景数据集，按渠道自动匹配</div>
                <div className="asset-chips">
                  {STRATEGY.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
                <div className="asset-note">覆盖六类投放策略</div>
              </div>
              <div className="asset-design">
                <div className="asset-state off">机制设计</div>
                <div className="asset-flow">
                  {["投流数据回流", "数据清洗", "定期生成候选提示词", "人工审核", "入库更新"].map((s) => (
                    <div className="asset-step" key={s}>{s}</div>
                  ))}
                </div>
                <div className="asset-note">仅完成产品机制设计，未上线</div>
              </div>
            </div>
          </div>

          {/* 08 质量成本矩阵 */}
          <div className="case-screen reveal">
            <CaseHead
              title="质量成本"
              em="平衡策略"
              sub="根据任务质量要求及模型能力边界设计分层路由策略，避免全量调用高成本模型。"
            />
            <div className="matrix">
              <div className="mx-corner" />
              <div className="mx-col">低质量风险</div>
              <div className="mx-col">高质量风险</div>
              <div className="mx-row">低业务价值 / 可重试</div>
              <div className="mx-cell">优先低成本模型</div>
              <div className="mx-cell">中档模型 + 自动校验</div>
              <div className="mx-row">高业务价值 / 直接投放</div>
              <div className="mx-cell">中高档模型 + A/B</div>
              <div className="mx-cell hi">高质量模型 + 兜底流程</div>
            </div>
            <div className="mbars">
              {METRICS.map((m) => (
                <div className="mbar" key={m.lab}>
                  <div className="mbar-val">{m.val}<span className="u">{m.unit}</span></div>
                  <div className="mbar-lab">{m.lab}</div>
                </div>
              ))}
            </div>
            <div className="mbar-note">按 API 单价与任务量测算</div>
          </div>

          {/* 08 结果与方法沉淀 */}
          <div className="case-screen reveal">
            <CaseHead title="业务结果与" em="方法沉淀" />
            <div className="outcome">
              <div className="outcome-biz">
                <div className="outcome-tag">业务结果</div>
                <ul>
                  <li>已落地梦幻西游、永劫无间等 20+ 款游戏。</li>
                  <li>适配微信私域、手机品牌应用商店等 64 个主流宣发渠道。</li>
                  <li>单次任务可在 12-15 分钟内最多产出 128 张素材。</li>
                  <li>业务验收一次通过率 90%，兜底后可用率 95%。</li>
                </ul>
              </div>
              <div className="outcome-method">
                <div className="outcome-tag">方法沉淀</div>
                {TAKEAWAYS.map((t, i) => (
                  <div className="takeaway" key={t}>
                    <span className="tk-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tk-t">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ABOUT */}
      <section className="about" id="about">
        <div className="container">
          <SectionHead
            title="网易互娱"
            em="AI 产品实习生"
            sub="2026.03 - 2026.08　参与网易游戏 AI 应用平台建设，负责游戏营销素材自动化模块的产品方案。"
          />
          <div className="about-grid">
            <div className="reveal">
              <p className="about-lede">
                推动 AIGC 能力<em>从单点工具走向标准化生产流程</em>，已落地 20+ 款游戏项目。
              </p>
              <div className="about-desc">
                <p>
                  负责游戏营销素材自动化模块的产品方案，将渠道规格与批量流程产品化；并将角色、渠道骨架、字效等素材资产结构化沉淀并跨模块复用，素材生产效率提升约 65%，核心资产复用率达 70%+。
                </p>
                <p>
                  在多模态资源生产方向，梳理端到端生产链路，定义任务拆解、工具调用、状态反馈、异常处理与结果交付规则，将分散操作整合为统一任务入口，并完成从任务输入到结果交付的流程验证。
                </p>
              </div>
              <div className="about-tags">
                {["需求分析", "产品原型", "Agent 工作流", "模型选型评估", "质量-成本平衡", "MVP 快速验证", "异步任务状态", "前后端协作"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div className="contact-list">
                <div className="contact-row"><span className="k">姓名</span><span className="v">张喆涵</span></div>
                <div className="contact-row"><span className="k">身份</span><span className="v">AI 产品经理 / AI 运营</span></div>
                <div className="contact-row"><span className="k">实习</span><span className="v">网易互娱 · AI 产品实习生</span></div>
                <div className="contact-row"><span className="k">电话</span><span className="v"><a href="tel:18826079659">188 2607 9659</a></span></div>
                <div className="contact-row"><span className="k">邮箱</span><span className="v"><a href="mailto:3062282106@qq.com">3062282106@qq.com</a></span></div>
                <div className="contact-row"><span className="k">坐标</span><span className="v">广东 · 可远程</span></div>
              </div>
            </div>
          </div>

          <div className="stats-grid reveal">
            {STATS.map((s) => (
              <div className="stat-cell" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS */}
      <section className="projects" id="projects">
        <div className="container">
          <SectionHead
            title="平台内由本人主导产品方案的"
            em="功能模块"
          />
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <article className="proj-card reveal" key={p.name}>
                <div className="proj-media">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="proj-body">
                  <h3 className="proj-name">{p.name}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="proj-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STRENGTHS */}
      <section className="strengths" id="strengths">
        <div className="container">
          <SectionHead
            title="专业能力与"
            em="落地经验"
          />
          <div className="str-grid">
            {STRENGTHS.map((s, i) => (
              <div className="str-card reveal" key={s.title}>
                <div className="str-num">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="str-title">{s.title}</h3>
                <p className="str-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <section className="footer" id="contact">
        <div className="footer-glow" />
        <div className="footer-inner reveal">
          <h2 className="footer-big">
            期待交流<br />
            <span className="thin">AI 产品方向的机会</span>
          </h2>
          <a className="footer-mail" href="mailto:3062282106@qq.com">3062282106@qq.com</a>
        </div>
        <div className="footer-bottom reveal">
          <span>© {new Date().getFullYear()} 张喆涵</span>
          <div className="footer-links">
            <a href="tel:18826079659">18826079659</a>
            <a href="#top">回到顶部</a>
          </div>
        </div>
      </section>
    </div>
  );
}

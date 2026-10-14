import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { PLATFORM_METRICS, PLATFORM_VALUE, CASE_RESULT, PAINS, MARKETING_DECISIONS, PIPELINE, AGENT_ROLES, QUALITY_METRICS, EVAL_SUITE, ITERATIONS, STRENGTHS } from "../src/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = process.env.SITE_URL ?? "http://127.0.0.1:5174/";
const outFile = path.resolve(process.env.PDF_OUTPUT ?? path.join(root, "output/pdf/张喆涵-AI产品作品集-精简版.pdf"));
const qaDir = path.join(root, "tmp/pdfs");
await mkdir(path.dirname(outFile), { recursive: true });
await mkdir(qaDir, { recursive: true });
let browser;
try { browser = await chromium.launch(); }
catch { browser = await chromium.launch({ channel: "msedge" }); }
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(async () => {
    document.querySelectorAll("details").forEach(node => { node.open = true; });
    document.querySelectorAll(".reveal").forEach(node => node.classList.add("visible"));
    document.querySelectorAll("img").forEach(node => { node.loading = "eager"; });
    await document.fonts.ready;
    await Promise.all([...document.images].map(async node => { await node.decode(); if (!node.naturalWidth) throw new Error(`Missing image: ${node.src}`); }));
  });
  const sourceAudit = await page.evaluate(() => ({
    details: [...document.querySelectorAll("details")].map(node => ({ title: node.querySelector("summary").innerText, open: node.open, images: node.querySelectorAll("img").length })),
    images: [...document.images].map(node => ({ src: node.getAttribute("src"), width: node.naturalWidth, height: node.naturalHeight })),
    titles: [...document.querySelectorAll("h1,h2,h3,h4")].map(node => node.textContent.trim()),
  }));
  // Build separate print pages from live DOM without changing the website.
  const manifest = await page.evaluate((data) => {
    const sheets = document.createElement("div"); sheets.id = "pdf-pages";
    const entries = [];
    function clone(selector) {
      const source = document.querySelector(selector);
      if (!source) throw new Error(`Missing export section: ${selector}`);
      const node = source.cloneNode(true);
      if (source.matches("#hero") && source.querySelector("canvas")) {
        const image = document.createElement("img");
        image.src = source.querySelector("canvas").toDataURL(); image.className = source.querySelector("canvas").className;
        node.querySelector("canvas").replaceWith(image);
      }
      return node;
    }
    function sheet(title, children, className = "") {
      const section = document.createElement("section"); section.className = `pdf-sheet ${className}`;
      const content = document.createElement("div"); content.className = "pdf-content";
      children.forEach(child => content.append(typeof child === "string" ? clone(child) : child));
      const footer = document.createElement("div"); footer.className = "pdf-folio";
      const label = document.createElement("span"); label.textContent = title;
      const number = document.createElement("span"); number.className = "pdf-page-number";
      footer.append(label, number); section.append(content, footer); sheets.append(section); entries.push({ title });
    }
    function group(className, nodes) {
      const wrapper = document.createElement("div"); wrapper.className = className;
      nodes.forEach(node => wrapper.append(typeof node === "string" ? clone(node) : node)); return wrapper;
    }
    function el(tag, className, text) {
      const node = document.createElement(tag); node.className = className;
      if (text !== undefined) node.textContent = text; return node;
    }
    function header(kicker, title, subtitle) {
      const node = el("header", "brief-heading");
      node.append(el("span", "brief-kicker", kicker), el("h2", "brief-title", title));
      if (subtitle) node.append(el("p", "brief-subtitle", subtitle)); return node;
    }
    function metrics(items, columns = items.length) {
      const node = el("div", "brief-metrics"); node.style.setProperty("--columns", columns);
      items.forEach(item => {
        const cell = el("article", "brief-metric");
        cell.append(el("strong", "", item.value + (item.unit ?? "")), el("span", "", item.label));
        if (item.sample) cell.append(el("small", "", item.sample)); node.append(cell);
      }); return node;
    }
    function proof(selector, caption, className = "") {
      const source = document.querySelector(selector);
      if (!source) throw new Error(`Missing proof: ${selector}`);
      const image = source.matches("img") ? source : source.querySelector("img");
      const node = el("figure", `brief-proof ${className}`); node.append(image.cloneNode(true));
      if (caption) node.append(el("figcaption", "", caption)); return node;
    }
    function row(no, title, text) {
      const node = el("article", "brief-row");
      const body = el("div", ""); body.append(el("h3", "", title));
      if (text) body.append(el("p", "", text)); node.append(el("span", "brief-row-no", no), body); return node;
    }

    // Twelve edited spreads: group each product story with its evidence, rather
    // than giving every web section and disclosure image a separate page.
    const cover = el("div", "brief-cover-copy");
    cover.append(el("span", "brief-kicker", "AI PRODUCT DESIGN / 张喆涵"), el("h1", "", "面向业务交付"), el("h2", "", "设计 AI 产品"), el("p", "brief-subtitle", "FlowX · 营销自动化 · 多模态 Agent · 评测与迭代"));
    const contents = group("brief-contents", [row("01", "把业务需求，做成批量生产", "营销素材自动化与真实交付"), row("02", "把生成能力，做成可验收任务", "代理职责、质量门禁与失败恢复"), row("03", "用结果与反馈，持续迭代", "评测、市场验证与场景复用")]);
    sheet("张喆涵 / AI 产品作品集", [cover, contents], "brief-cover");

    const background = group("brief-background", [header("PROJECT BACKGROUND", "FlowX", "面向业务的 AI 应用平台，为运营、设计与赛事提供生产管线。"), proof("#background .bg-shot img", "内容制作中心 V1.7.0 · 应用与运行数据")]);
    const values = el("div", "brief-values");
    data.PLATFORM_VALUE.forEach((item, index) => {
      const node = el("article", ""); node.append(el("span", "brief-kicker", `0${index + 1} / ${item.title}`), el("strong", "", item.value + item.unit), el("p", "", item.label)); values.append(node);
    });
    sheet("FlowX / 项目背景与平台价值", [background, metrics(data.PLATFORM_METRICS), values], "brief-platform");

    const decisions = el("div", "brief-decisions");
    data.PAINS.forEach((pain, index) => {
      const node = el("article", ""); node.append(el("span", "brief-kicker", `0${index + 1} / ${pain.tag}`), el("p", "brief-pain", pain.title), el("h3", "", data.MARKETING_DECISIONS[index].title)); decisions.append(node);
    });
    const marketingEngine = clone(".marketing-system"); marketingEngine.querySelector(".engine-title").remove();
    sheet("CASE 01 / 游戏营销素材自动化", [header("CASE 01 / 游戏营销素材自动化", "把多渠道制作，做成自助批量生产", "把活动素材与渠道规范，转成一次提交的批量任务。"), metrics(data.CASE_RESULT), decisions, group("brief-flow", [".flow-stack", marketingEngine])], "brief-marketing");

    const delivery = clone(".delivery-gallery");
    sheet("营销自动化 / 完整界面与多规格交付", [header("CASE 01 / DELIVERY", "同一活动，适配多个资源位"), group("brief-marketing-proof", [group("brief-ui-pair", [proof("#main-case .case-shots .placeholder:nth-child(1)", "业务配置 · 一次提交"), proof("#main-case .case-shots .placeholder:nth-child(2)", "生成预览 · 批量交付")]), delivery])], "brief-delivery");

    const roles = el("div", "brief-agent-roles");
    data.AGENT_ROLES.forEach(role => roles.append(row("", role.title, role.text)));
    const pipeline = clone(".pipeline-board"); pipeline.querySelector(".pipeline-detail").remove(); pipeline.querySelector(".pipeline-caption > span").remove();
    sheet("CASE 02 / 多模态资源生产 Agent", [header("CASE 02 / 多模态资源生产 Agent", "把一句业务需求，组织成可验收交付", "我的工作：代理职责 · 执行契约 · 质量门禁 · 边界评测"), group("brief-contract", [row("执行契约", "先约束职责，再派发任务", "权限、配额与产物归属，派发前校验。"), roles]), pipeline, "#agent .agent-hard-rules"], "brief-agent");

    const agentScreens = group("brief-agent-screens", [proof("#agent .agent-shot > .placeholder", "自然语言任务入口", "brief-agent-home"), proof(".agent-shot-grid .placeholder:nth-child(1)", "模板批量替换 · 任务与结果"), proof(".agent-shot-grid .placeholder:nth-child(2)", "人物生成 · 任务与结果")]);
    sheet("Agent / 展开的任务与结果", [header("CASE 02 / IN USE", "从自然语言入口，到完整任务交付"), agentScreens], "brief-agent-evidence");

    const evalItems = el("div", "brief-eval-items");
    data.EVAL_SUITE.forEach(item => evalItems.append(row(`${item.count} 项`, item.title, item.text)));
    const iterations = el("div", "brief-iterations");
    data.ITERATIONS.forEach(item => iterations.append(row(`${item.no} / ${item.count}`, item.title, item.decision)));
    sheet("评测与迭代 / 数据和失败样本", [header("EVALUATION / 评测与产品迭代", "用验收口径与失败样本，确定优先级"), metrics(data.QUALITY_METRICS), group("brief-evaluation", [group("brief-evaluation-left", [header("MY EVALUATION", "53 个测试文件 / 544 个用例"), evalItems]), group("brief-evaluation-right", [header("FAILURE REVIEW", "11 轮人工收尾，分别解决"), iterations])])], "brief-eval");

    const business = el("div", "brief-business-grid");
    const dynamic = el("article", "brief-business-case");
    dynamic.append(header("03 / 动态内容供给平台化", "专业动效，变成自助生产", "上传 KV，批量生成动效并按渠道规格导出。"), clone(".mini-compare"), proof(".dynamic-proof > .placeholder", "动态素材批量任务"), clone(".dynamic-examples"));
    const reuse = el("article", "brief-business-case");
    reuse.append(header("04 / 素材资产化与复用", "沉淀一次，服务多条管线", "角色、版式与字效结构化入库，跨模块复用。"), clone(".reuse-stat"), proof(".split-case.reverse > .placeholder", "统一资产库"), clone(".asset-route")); business.append(dynamic, reuse);
    sheet("业务场景 / 动态内容与资产复用", [business], "brief-business");

    sheet("模板批量替换 / 数据与成品", [header("05 / 表格驱动的模板批量替换", "模板驱动生产，规模化内容交付"), group("brief-template-proofs", [proof(".template-proof-grid > figure", "Excel 数据、字体与图层配置"), clone(".template-team-grid")])], "brief-template");

    sheet("市场验证 / 真实内容与渠道效果", [header("MARKET EVIDENCE", "市场验证"), ".market-board"], "brief-market");

    const projects = clone(".project-grid");
    projects.querySelectorAll(".project-tags,.project-body > p").forEach(node => node.remove());
    sheet("平台产品模块 / 8 个产品能力", [header("PRODUCT MODULES", "平台产品模块"), projects], "brief-modules");

    const strengths = el("div", "brief-strengths");
    const summaries = ["把用户反馈、渠道规范与素材要求转为可配置规则。", "定义路由、执行契约、验收门禁与异常恢复。", "统一批量生产、异步状态与结果交付。", "协同运营、美术上线，跟进验收与使用反馈。", "用 Figma 与 Spec 推进交互原型及可行性验证。", "用评测和分层路由，平衡交付质量与调用成本。"];
    data.STRENGTHS.forEach(([no, title], index) => strengths.append(row(no, title, summaries[index])));
    const loop = clone(".loop-board");
    const sceneRoles = clone(".scene-roles"); sceneRoles.querySelectorAll("p,h3 small").forEach(node => node.remove());
    sheet("ABOUT ME / 从做功能到做闭环", [header("ABOUT ME / 张喆涵", "从「做功能」到「做闭环」", "需求驱动建设，反馈反哺迭代。"), group("brief-about", [strengths, group("brief-about-loop", [loop, sceneRoles])]), ".about-tools"], "brief-about-page");
    sheets.querySelectorAll(".hero-actions,.hero-scroll,#contact a").forEach(node => node.remove());
    sheets.querySelectorAll(".reveal").forEach(node => node.classList.add("visible"));
    sheets.querySelectorAll("img").forEach(node => { node.loading = "eager"; });
    sheets.querySelectorAll("button").forEach(node => { node.tabIndex = -1; });
    [...sheets.querySelectorAll(".pdf-page-number")].forEach((node, index) => { node.textContent = `${String(index + 1).padStart(2, "0")} / ${entries.length}`; });
    document.body.append(sheets); document.body.classList.add("pdf-export"); return entries;
  }, { PLATFORM_METRICS, PLATFORM_VALUE, CASE_RESULT, PAINS, MARKETING_DECISIONS, PIPELINE, AGENT_ROLES, QUALITY_METRICS, EVAL_SUITE, ITERATIONS, STRENGTHS });
  await page.addStyleTag({ content: `
    @page { size: A4 landscape; margin: 0; }
    html, body { margin: 0; padding: 0; background: #050706; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body.pdf-export > :not(#pdf-pages) { display: none !important; }
    #pdf-pages { width: 297mm; }
    .pdf-sheet { width: 297mm; height: 210mm; position: relative; overflow: hidden; background: #050706; break-after: page; break-inside: avoid; }
    .pdf-sheet:last-child { break-after: auto; }
    .pdf-content { position: absolute; width: 1200px; transform-origin: top left; }
    .pdf-folio { position: absolute; left: 48px; right: 48px; bottom: 28px; display: flex; justify-content: space-between; font-size: 9px; color: #a5aaa5; letter-spacing: .08em; }
    .pdf-content *, .pdf-content *::before, .pdf-content *::after { animation: none !important; transition: none !important; }
    .pdf-content .reveal { opacity: 1; transform: none; }
    .pdf-content .container { width: 100%; }
    .pdf-content > *, .pdf-content .chapter, .pdf-content .agent-arch, .pdf-content .eval-suite, .pdf-content .quality-evidence, .pdf-content .iteration-review, .pdf-content .split-case, .pdf-content .template-case, .pdf-content .about-scene { margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; border-top: 0; border-bottom: 0; }
    .pdf-content > * + * { margin-top: 36px; }
    .pdf-content .chapter-head { margin-bottom: 40px; }
    .pdf-content .chapter-head h3 { font-size: 52px; }
    .pdf-content .case-title { font-size: 64px; }
    .pdf-content .market-heading { margin-bottom: 36px; }
    .pdf-content .delivery-portrait { grid-column: 2; grid-row: 1 / span 2; }
    .pdf-content .delivery-wide { grid-column: 1; grid-row: 1; }
    .pdf-content .delivery-landscape { grid-column: 1; grid-row: 2; }
    .pdf-content .project-grid { margin: 0; }
    .pdf-content .strength-card { min-height: 166px; padding: 20px 0; }
    .pdf-content .strength-card h3 { margin-top: 20px; }
    .pdf-content .about-tools { padding: 22px 0; }
    .pdf-content .scene-head { margin-bottom: 30px; }
    .pdf-content .loop-board { padding-top: 24px; }
    .pdf-content .scene-roles { margin-top: 28px; }
    .pdf-content .scene-role { padding: 20px 0; }
    .pdf-content .platform-overview { margin: 0; }
    .pdf-content .bg-grid { gap: 56px; }
    .pdf-content .pipeline-board { margin-top: 24px; }
    .pdf-content .agent-hard-rules { margin-top: 24px; }
    .pdf-node-details { display: grid; gap: 24px; }
    .pdf-node-details .pipeline-detail { margin: 0; min-height: 160px; }
    .pdf-cover .hero { min-height: 0; height: 700px; }
    .pdf-cover .hero-inner { min-height: 0; padding: 220px 24px 0; }
    .pdf-cover .hero-title { font-size: 84px; }
    .pdf-ending .footer { height: 620px; padding: 0; }
    .pdf-ending .footer-inner { padding-top: 160px; }

    /* Editorial PDF spreads: fixed columns, generous type, complete images. */
    .pdf-content { color: #eff1ec; font-family: Arial, "Microsoft YaHei", sans-serif; }
    .pdf-content > * + * { margin-top: 30px; }
    .brief-kicker { display: block; color: #00dfa0; font-size: 14px; letter-spacing: .12em; line-height: 1.5; }
    .brief-heading { margin: 0; }
    .brief-title { margin: 16px 0 0; font-size: 46px; font-weight: 550; line-height: 1.22; letter-spacing: -.025em; }
    .brief-subtitle { margin: 16px 0 0; color: #aeb8b4; font-size: 18px; line-height: 1.7; }
    .brief-proof { margin: 0; min-width: 0; }
    .brief-proof img { display: block; width: 100%; height: auto; object-fit: contain; }
    .brief-proof figcaption { margin-top: 10px; color: #aeb8b4; font-size: 15px; line-height: 1.6; }
    .brief-metrics { display: grid; grid-template-columns: repeat(var(--columns), minmax(0, 1fr)); gap: 26px; }
    .brief-metric { display: flex; flex-direction: column; gap: 14px; }
    .brief-metric strong { color: #00dfa0; font-size: 52px; line-height: 1.15; font-weight: 550; letter-spacing: -.04em; white-space: nowrap; }
    .brief-metric > span { color: #d0d7d2; font-size: 16px; line-height: 1.5; }
    .brief-metric small { color: #aeb8b4; font-size: 14px; line-height: 1.6; }
    .brief-row { display: grid; grid-template-columns: 64px 1fr; gap: 20px; align-items: start; }
    .brief-row-no { color: #00dfa0; font-size: 15px; padding-top: 5px; white-space: nowrap; }
    .brief-row h3 { margin: 0; font-size: 24px; line-height: 1.45; font-weight: 550; }
    .brief-row p { margin: 10px 0 0; color: #aeb8b4; font-size: 17px; line-height: 1.65; }
    .brief-cover-copy { padding: 36px 0 0; }
    .brief-cover-copy h1 { margin: 48px 0 0; font-size: 96px; letter-spacing: -.05em; line-height: 1.2; font-weight: 550; }
    .brief-cover-copy h2 { margin: 12px 0 0; color: #00dfa0; font-size: 96px; letter-spacing: -.05em; line-height: 1.2; font-weight: 550; }
    .brief-cover-copy .brief-subtitle { margin-top: 36px; font-size: 21px; }
    .brief-cover .brief-contents { display: grid; grid-template-columns: repeat(3, 1fr); gap: 50px; margin-top: 100px; }
    .brief-cover .brief-row { display: block; }
    .brief-cover .brief-row h3 { font-size: 23px; margin-top: 20px; }
    .brief-cover .brief-row p { font-size: 16px; }
    .brief-background { display: grid; grid-template-columns: .85fr 1.7fr; gap: 50px; align-items: center; }
    .brief-background .brief-title { font-size: 60px; }
    .brief-platform .brief-metrics { margin-top: 44px; }
    .brief-platform .brief-metric strong { font-size: 36px; }
    .brief-platform .brief-metric > span { font-size: 15px; }
    .brief-values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; padding-top: 30px; }
    .brief-values strong { display: block; margin-top: 18px; font-size: 30px; font-weight: 550; }
    .brief-values p { color: #aeb8b4; font-size: 16px; margin: 12px 0 0; }
    .brief-decisions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
    .brief-decisions .brief-pain { margin: 12px 0; color: #aeb8b4; font-size: 17px; }
    .brief-decisions h3 { margin: 0; font-size: 23px; line-height: 1.5; font-weight: 550; }
    .brief-marketing .brief-metrics { margin-top: 30px; }
    .brief-flow { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
    .brief-flow .flow-stack { border: 0; }
    .brief-flow .flow-lane { padding: 0; }
    .brief-flow .flow-lane + .flow-lane { padding-left: 24px; margin-left: 24px; }
    .brief-flow .lane-title { font-size: 14px; margin-bottom: 14px; }
    .brief-flow .lane-step { padding: 10px 0; min-height: 0; }
    .brief-flow .lane-step b { font-size: 16px; }
    .brief-flow .lane-step span { font-size: 13px; }
    .brief-flow .system-map { margin: 0; }
    .brief-flow .engine-layers { grid-template-columns: repeat(2, 1fr); border: 0; gap: 20px 28px; }
    .brief-flow .engine-layers > div { padding: 0; min-height: 0; border: 0; }
    .brief-flow .engine-layers span { margin-bottom: 12px; font-size: 13px; }
    .brief-flow .engine-layers b { font-size: 19px; }
    .brief-flow .engine-layers small { font-size: 14px; }
    .brief-marketing-proof { display: grid; grid-template-columns: 1.12fr 1fr; gap: 42px; }
    .brief-ui-pair { display: grid; gap: 22px; }
    .brief-ui-pair img { height: 242px; }
    .brief-delivery .delivery-gallery { gap: 18px; grid-template-columns: 1fr .7fr; align-self: center; }
    .brief-delivery .delivery-gallery figcaption { font-size: 14px; flex-wrap: wrap; }
    .brief-contract { display: grid; grid-template-columns: 1fr 1.65fr; gap: 48px; }
    .brief-contract > .brief-row { display: block; }
    .brief-contract > .brief-row h3 { margin-top: 18px; font-size: 26px; }
    .brief-agent-roles { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 26px; }
    .brief-agent-roles .brief-row { display: block; }
    .brief-agent-roles .brief-row h3 { font-size: 20px; }
    .brief-agent-roles .brief-row p { font-size: 15px; margin-top: 6px; }
    .brief-agent .pipeline-boundary { padding: 12px 0; }
    .brief-agent .pipeline-boundary p, .brief-agent .pipeline-boundary > span { font-size: 15px; }
    .brief-agent .pipeline-main { padding: 18px 0; }
    .brief-agent .pipeline-caption { margin-bottom: 18px; }
    .brief-agent .pipeline-caption b { font-size: 16px; }
    .brief-agent .pipeline-node { padding: 15px 12px; min-height: 108px; }
    .brief-agent .pipeline-node > span { font-size: 13px; margin-bottom: 12px; }
    .brief-agent .pipeline-node b { font-size: 17px; }
    .brief-agent .pipeline-node small { font-size: 13px; margin-top: 8px; }
    .brief-agent .pipeline-retry { padding-top: 16px; margin-top: 18px; grid-template-columns: 1fr 180px 1fr; }
    .brief-agent .pipeline-retry > p { font-size: 15px; }
    .brief-agent .agent-hard-rules { font-size: 17px; padding: 0; margin-top: 20px; }
    .brief-agent-screens { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
    .brief-agent-home { grid-column: 1 / -1; }
    .brief-agent-home img { height: 250px; }
    .brief-agent-screens > .brief-proof:not(.brief-agent-home) img { height: 244px; }
    .brief-evaluation { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 44px; }
    .brief-evaluation .brief-title { font-size: 26px; margin-top: 12px; }
    .brief-eval-items, .brief-iterations { display: grid; gap: 28px; margin-top: 30px; }
    .brief-evaluation .brief-row { grid-template-columns: 90px 1fr; gap: 18px; }
    .brief-evaluation .brief-row h3 { font-size: 21px; }
    .brief-evaluation .brief-row p { font-size: 16px; }
    .brief-iterations .brief-row-no { color: #ff784f; }
    .brief-business-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; }
    .brief-business-case .brief-title { font-size: 34px; }
    .brief-business-case .brief-subtitle { font-size: 16px; }
    .brief-business-case > .brief-proof { margin-top: 28px; }
    .brief-business-case > .brief-proof img { height: 280px; }
    .brief-business-case .mini-compare { margin-top: 28px; border: 0; gap: 20px; }
    .brief-business-case .mini-compare > div { min-height: 98px; padding: 0; }
    .brief-business-case .mini-compare span { font-size: 15px; }
    .brief-business-case .mini-compare b { font-size: 27px; margin-top: 16px; }
    .brief-business-case .mini-compare small { font-size: 14px; }
    .brief-business-case .reuse-stat { height: 98px; align-items: center; margin-top: 28px; }
    .brief-business-case .reuse-stat strong { font-size: 62px; }
    .brief-business-case .reuse-stat span { font-size: 17px; }
    .brief-business-case .dynamic-examples { margin-top: 22px; grid-template-columns: 1fr 1fr; }
    .brief-business-case .dynamic-examples img { height: 112px; object-fit: contain; border-radius: 0; }
    .brief-business-case .asset-route { margin-top: 22px; }
    .brief-business-case .asset-route span { font-size: 16px; }
    .brief-template-proofs { display: grid; gap: 24px; }
    .brief-template-proofs > .brief-proof:first-child img { height: 324px; }
    .brief-template-proofs > .brief-proof:last-child img { height: 190px; }
    .brief-template-proofs .template-team-grid { gap: 16px; }
    .brief-template-proofs .template-team-grid img { height: 145px; object-fit: contain; }
    .brief-template-proofs figcaption { text-align: center; }
    .brief-market .market-board { gap: 40px; }
    .brief-market .market-stat-group { border: 0; padding-top: 0; }
    .brief-market .market-stat-group h3 { font-size: 25px; margin-bottom: 24px; }
    .brief-market .market-stat-group h3 > span { font-size: 15px; }
    .brief-market .market-stat-row { min-height: 180px; }
    .brief-market .market-stat-row > div > span { font-size: 15px; }
    .brief-market .market-stat-row strong { font-size: 29px; }
    .brief-market .market-stat-row > div:first-child strong { font-size: 62px; }
    .brief-market .market-social-proof img { height: 334px; object-fit: contain; object-position: top; }
    .brief-market .market-channel-proof { gap: 26px; }
    .brief-modules .project-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 26px 22px; }
    .brief-modules .project-card { min-width: 0; }
    .brief-modules .project-body { padding: 18px 16px; }
    .brief-modules .project-body h3 { font-size: 21px; margin: 10px 0 0; }
    .brief-modules .project-no { font-size: 12px; }
    .brief-about { display: grid; grid-template-columns: 1.1fr 1fr; gap: 50px; }
    .brief-strengths { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 28px; }
    .brief-strengths .brief-row { display: block; }
    .brief-strengths .brief-row h3 { font-size: 22px; margin-top: 12px; }
    .brief-strengths .brief-row p { font-size: 16px; }
    .brief-about-loop .loop-board { border: 0; padding-top: 0; }
    .brief-about-loop .loop-grid { gap: 24px; }
    .brief-about-loop .loop-node { min-height: 92px; padding: 14px 6px; gap: 12px; }
    .brief-about-loop .loop-node b { font-size: 15px; }
    .brief-about-loop .loop-node span { font-size: 12px; }
    .brief-about-loop .loop-build::after, .brief-about-loop .loop-use::after, .brief-about-loop .loop-feedback::after { right: -24px; width: 24px; }
    .brief-about-loop .loop-need::after { bottom: -24px; height: 24px; }
    .brief-about-loop .loop-iterate::after { top: -24px; height: 24px; }
    .brief-about-loop .loop-return { margin: 0 -24px; }
    .brief-about-loop .loop-caption { font-size: 15px; margin-top: 16px; }
    .brief-about-loop .scene-roles { margin-top: 28px; }
    .brief-about-loop .scene-role { grid-template-columns: 44px 1fr; gap: 14px; padding: 14px 0; border: 0; }
    .brief-about-loop .scene-role span { font-size: 15px; }
    .brief-about-loop .scene-role h3 { font-size: 19px; }
    .brief-about-page .about-tools { border: 0; padding: 0; margin-top: 28px; gap: 20px; font-size: 16px; }
    .brief-about-page .about-tools span { font-size: 18px; }
  ` });
  // Match the print paper's CSS viewport before measuring any page content.
  await page.setViewportSize({ width: 1123, height: 794 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const encoded = new Map();
    for (const node of document.querySelectorAll("#pdf-pages img")) {
      await node.decode();
      const source = node.src;
      if (!encoded.has(source)) {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(1, 2600 / Math.max(node.naturalWidth, node.naturalHeight));
        canvas.width = Math.round(node.naturalWidth * ratio); canvas.height = Math.round(node.naturalHeight * ratio);
        const context = canvas.getContext("2d");
        context.fillStyle = "#050706"; context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(node, 0, 0, canvas.width, canvas.height);
        encoded.set(source, canvas.toDataURL("image/jpeg", .95));
      }
      node.src = encoded.get(source);
      await node.decode();
    }
  });
  await page.emulateMedia({ media: "print" });
  const layout = await page.evaluate(() => [...document.querySelectorAll(".pdf-sheet")].map((sheet, index) => {
    const content = sheet.querySelector(".pdf-content"); const width = sheet.offsetWidth; const height = sheet.offsetHeight;
    const naturalHeight = content.getBoundingClientRect().height;
    const scale = Math.min((width - 96) / 1200, (height - 108) / naturalHeight);
    // Zoom changes print layout geometry as well as paint geometry, preventing
    // Chromium from fragmenting unscaled grid rows onto the following page.
    content.style.zoom = String(scale);
    content.style.left = `${(width - 1200 * scale) / 2 / scale}px`;
    content.style.top = `${(48 + Math.max(0, (height - 108 - naturalHeight * scale) / 2)) / scale}px`;
    return { page: index + 1, scale, naturalHeight, images: content.querySelectorAll("img").length };
  }));
  const audit = await page.evaluate(() => {
    const failures = [];
    document.querySelectorAll(".pdf-sheet").forEach((sheet, index) => {
      const outer = sheet.getBoundingClientRect();
      sheet.querySelector(".pdf-content").querySelectorAll("img,svg,h1,h2,h3,h4,p,.project-card,.pipeline-node").forEach(node => {
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height || node.closest(".hero,.capability-crop")) return;
        if (rect.left < outer.left - .5 || rect.right > outer.right + .5 || rect.top < outer.top - .5 || rect.bottom > outer.bottom - 58) failures.push({ page: index + 1, tag: node.tagName, text: (node.textContent || node.getAttribute("alt") || "").slice(0, 60) });
      });
    });
    const exportedImages = [...document.querySelectorAll("#pdf-pages img")];
    const expandedEvidence = ["游戏回流营销素材模块的业务配置界面", "游戏回流营销素材模块的生成结果预览", "Agent 小奈模板批量替换任务与结果", "Agent 小奈选手服装生成任务与结果"].every(alt => exportedImages.some(node => node.alt === alt));
    return { failures, projectCount: document.querySelectorAll("#pdf-pages .project-card").length, pipelineNodes: document.querySelectorAll("#pdf-pages .pipeline-node").length, expandedEvidence, loadedImages: exportedImages.every(node => node.complete && node.naturalWidth > 0) };
  });
  if (manifest.length !== 12 || audit.failures.length || audit.projectCount !== 8 || audit.pipelineNodes !== 7 || !audit.expandedEvidence || !audit.loadedImages || errors.length) throw new Error(JSON.stringify({ audit, errors }));
  await page.pdf({ path: outFile, format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, tagged: true, outline: true });
  await writeFile(path.join(qaDir, "compact-export-audit.json"), JSON.stringify({ outFile, manifest, sourceAudit, layout, audit }, null, 2));
  console.log(JSON.stringify({ file: outFile, pages: manifest.length, smallestScale: Math.min(...layout.map(item => item.scale)), detailsExpanded: sourceAudit.details, audit }, null, 2));
} finally { await browser.close(); }

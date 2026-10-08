/** 站点文案与案例数据 */

export const RESUME_URL = "/projects/张喆涵-27校招.pdf";

export const NAV = [
  { href: "#background", label: "项目背景" },
  { href: "#main-case", label: "营销自动化" },
  { href: "#agent", label: "Agent" },
  { href: "#method", label: "评测与迭代" },
  { href: "#sub-cases", label: "业务案例" },
  { href: "#projects", label: "项目集" },
  { href: "#about", label: "关于我" },
];

export const PLATFORM_METRICS = [
  { value: "46+", label: "可调用 AI 管线" },
  { value: "58", label: "覆盖游戏" },
  { value: "37,461", label: "上线至今累计调用（套）" },
];

export const CASE_RESULT = [
  { value: "150+", unit: "素材", label: "单任务最多产出 · 12–15 分钟" },
  { value: "64", unit: "渠道", label: "适配主流宣发渠道" },
  { value: "90%", unit: "", label: "模块业务验收一次通过率" },
  { value: "70%", unit: "↓", label: "单张模型调用成本降低约" },
];

export const PAINS = [
  { no: "01", title: "多渠道，重复制作", text: "同一活动要适配多个资源位，尺寸、体积与安全区分别核对。", tag: "业务" },
  { no: "02", title: "参数难懂，失败难处理", text: "运营要理解专业参数，生成失败后还要跨工具找原因、重新提交。", tag: "体验" },
  { no: "03", title: "生成后，还要人工收尾", text: "通用 AI 不能直接满足内部素材、品牌规范与成品交付要求。", tag: "交付" },
];

export const OLD_FLOW = ["业务提单，等待排期", "设计理解需求、查找规范", "逐资源位生成、适配", "审核返工，打包交付"];
export const NEW_FLOW = ["业务选择场景、提交素材", "自动匹配规格与场景策略", "批量生成，跟踪任务状态", "校验成品，汇总交付"];

export const MARKETING_DECISIONS = [
  {
    no: "01", title: "把专业参数收敛为业务输入", label: "降低使用门槛",
    problem: "参数理解成本高，用户容易在配置环节中断。",
    decision: "以活动、渠道和素材组织任务，把高阶参数收敛为智能默认项；让用户持续看到任务状态与失败指引。",
    outcome: "运营自助发起批量任务，减少跨工具操作。",
  },
  {
    no: "02", title: "为生成波动设计兜底路径", label: "交付质量",
    problem: "单次模型生成存在波动，失败后缺少可继续的路径。",
    decision: "采用 A/B 双版生成与失败自矫正机制，以业务验收结果判断任务完成。",
    outcome: "模块一次验收通过率 90%，兜底后可用率 95%。",
  },
  {
    no: "03", title: "把内容策略与渠道规格资产化", label: "质量与成本",
    problem: "提示词、投放经验和素材规格分散，难以复用。",
    decision: "沉淀 614 条场景数据、六类投放策略，按渠道匹配；设计数据回流、清洗、审核入库机制，并采用分层路由。",
    outcome: "同一套策略持续迭代，单张模型调用成本降低约 70%。",
  },
];

export const PIPELINE = [
  { no: "01", title: "需求解析", hint: "目标 → 参数", type: "execute", detail: "将自然语言目标拆成结构化任务，明确活动、输入素材与交付范围。", rule: "必填参数缺失或取值非法，拦截后续执行。" },
  { no: "02", title: "规格推导", hint: "渠道与资源位", type: "execute", detail: "从已上架模板与渠道配置读取尺寸、体积上限、安全区和批次规模。", rule: "规格必须有存量配置依据，无法推导时停止提交。" },
  { no: "03", title: "素材生成", hint: "生成与合成", type: "execute", detail: "按任务调用出图、编辑与合成工具，登记候选产物并关联本轮需求。", rule: "产物文件真实存在且可读取，才能进入质检。" },
  { no: "04", title: "客观校验 L1", hint: "确定性交付底线", type: "gate", detail: "逐张核验尺寸、比例、格式、透明底、体积上限与必填槽位。", rule: "硬性问题直接拦截，不进入视觉评分。" },
  { no: "05", title: "视觉质检 L2", hint: "逐张读取画面", type: "gate", detail: "由只读质检代理核对主体、文字、版式与角色身份一致性，返回结构化结论。", rule: "质检代理没有提交入口；缺少可用证据时不放行。" },
  { no: "06", title: "带改动重做", hint: "未通过时触发", type: "retry", detail: "根据缺陷修改参数与产物，重做后重新经过门禁；默认最多重做两次。", rule: "指纹校验禁止原样重发；预算用尽或核验异常，升级人工确认。" },
  { no: "07", title: "交付与报告", hint: "成品与质量结论", type: "deliver", detail: "汇总成品、版本与检查结论，将不可交付项和升级原因一并记录。", rule: "仅交付达标产物，业务在终点验收并决定上架。" },
];

export const AGENT_ROLES = [
  { title: "执行代理", text: "组织任务、派发工具与汇总交付，承担流程推进。" },
  { title: "创意代理", text: "处理内容与生成策略，在任务边界内产出方案。" },
  { title: "视觉代理", text: "承担视觉制作与修改，产物与当前任务关联。" },
  { title: "质检代理", text: "独立检查产物，以只读权限给出质量结论。" },
];

export const QUALITY_METRICS = [
  { value: "84.6%", label: "第一版即交付", sample: "55 / 65 个作品级轮次" },
  { value: "90.8%", label: "最终交付合格率", sample: "59 / 65 个作品级轮次" },
  { value: "57.1%", label: "自动重做自愈率", sample: "4 / 7 个重做轮次" },
  { value: "84.3%", label: "全量自主交付率", sample: "59 / 70 个全量轮次" },
];

export const EVAL_SUITE = [
  { count: "26", title: "归档准入对抗矩阵", text: "验证交付物归属与归档准入边界。" },
  { count: "29", title: "像素指纹矩阵", text: "核对重做是否产生了真实改动。" },
  { count: "12", title: "防抖边界用例", text: "覆盖重复提交与临界状态场景。" },
];

export const ITERATIONS = [
  { no: "P0", count: "5 轮", title: "画面核验未取到证据", decision: "先加固证据采集：核验前确保产物可读、可判，减少无证据的人工确认。" },
  { no: "P0", count: "2 轮", title: "核验链路故障", decision: "把链路重试与作品重做分开，让基础设施故障不消耗内容重做预算。" },
  { no: "P1", count: "4 轮", title: "作品缺陷仍未解决", decision: "按缺陷类型分配重做预算，版式问题调整参数，主体问题优先换策略。" },
];

export const HUMAN_COMPARE = [
  ["协作", "运营 ↔ 设计反复对齐", "运营配置，系统执行"],
  ["生产", "逐张制作", "分钟级批量交付"],
  ["扩产", "加人、加班", "复制规则"],
];

export const AI_COMPARE = [
  ["输入", "提示词", "企业资产 + 渠道 + 业务规则"],
  ["输出", "质量波动的半成品", "可投放成品"],
  ["复用", "每次重来", "跨公司 / 行业配置复用"],
];

export const MAIN_RESULTS = [
  { value: "40,000+", unit: "资源", label: "回流模块累计素材产出" },
  { value: "约50", unit: "倍", label: "产出效率提升" },
  { value: "70%", unit: "", label: "素材生成成本降低" },
  { value: "90%", unit: "", label: "业务验收一次通过率" },
  { value: "94%+", unit: "", label: "生成良品率" },
  { value: "20+", unit: "项", label: "已落地项目" },
];

export const PROJECTS = [
  { no: "01", title: "AI 分镜助手", desc: "将脚本拆解为分镜，把图像与视频生成衔接为异步任务。", tags: ["脚本拆解", "视频生成", "异步任务"], image: "/projects/分镜.png" },
  { no: "02", title: "H5 组件生成", desc: "按页面布局与参考风格生成组件，适配不同活动的视觉需求。", tags: ["组件生成", "布局匹配", "风格跟随"], image: "/projects/H5.png" },
  { no: "03", title: "可视化节点画布", desc: "将多步素材处理组织为节点流程，集中管理输入、状态与产物。", tags: ["节点编排", "状态持久化", "工作流"], image: "/projects/无限画布.png" },
  { no: "04", title: "智能扩图与局部重绘", desc: "以选区与遮罩明确修改范围，支持画面延展及局部编辑。", tags: ["Inpaint", "Mask", "任务恢复"], image: "/projects/智能扩图.png" },
  { no: "05", title: "角色三视图生成", desc: "将多视角生成封装为批量任务，关注角色一致性与失败兜底。", tags: ["一致性", "批量生成", "失败兜底"], image: "/projects/角色三视图.png" },
  { no: "06", title: "Logo 创作模块", desc: "内置六类风格模板，支持 Logo 创作及配套品牌延展。", tags: ["配套延展", "多尺寸", "多模型"], image: "/projects/logo.png" },
  { no: "07", title: "H5 智能制作", desc: "上传 KV 参考图，生成组件库并自动切图、打包交付。", tags: ["KV 参考图", "组件生成", "生产可用"], image: "/projects/H5智能制作.png" },
  { no: "08", title: "智能定妆照", desc: "封装定妆照、人物三视图与换衣流程，支持批量处理。", tags: ["质感保留", "批量处理", "肤色矫正"], image: "/projects/定妆照.png" },
];

export const DYNAMIC_GIF_COLS = [
  ["/projects/gif1.gif"],
  ["/projects/gif2.gif"],
  ["/projects/gif3.gif", "/projects/华为_216x216.gif"],
];

export const SIMPLIFY_LANES = [
  { tag: "传统流程", steps: "制作 AE 工程 / 找规范 / 手动导出" },
  { tag: "商业平台", steps: "上传 KV / 写提示词 / 调参数 / 导出 / 转格式" },
  { tag: "FlowX", steps: "上传 KV / 导出", highlight: true },
];

export const STRENGTHS = [
  ["01", "业务问题抽象", "结合用户反馈与任务路径，识别高频生产问题，把业务经验、渠道规范和素材要求转为可配置规则。"],
  ["02", "AI 机制设计", "为模型与 Agent 定义路由、执行契约、验收门禁和异常恢复，让生成能力能够承担具体任务。"],
  ["03", "复杂流程产品化", "梳理多角色、多工具的协作路径，将批量生产、异步状态与结果交付组织为统一任务流程。"],
  ["04", "跨团队落地", "协同运营、美术推进模块上线，对齐输入规范与业务验收标准，持续跟进使用反馈和迭代。"],
  ["05", "原型与 MVP 验证", "使用 Figma 完成交互与高保真原型，编写 Spec，理解前后端协作与异步任务状态，推进可行性验证。"],
  ["06", "效果评估与成本控制", "用评测集验证权限、重做与状态边界，分别观察一次通过、自愈和人工介入；用分层路由平衡调用成本。"],
];

export const AGENT_PAST = ["找到正确模块", "理解并填写参数", "上传与引用素材", "等待并检查状态", "手动进入下一步"];
export const AGENT_NOW = ["描述批量目标", "自动拆解步骤", "批量调用工具", "跟踪与失败恢复", "交付完整结果"];
export const AGENT_LOOP = ["任务拆解", "工具调用", "状态反馈", "异常处理", "结果交付"];
export const AGENT_PROTOCOL = ["能力清单", "输入输出", "状态反馈", "异常协议"];
export const AGENT_TOOLS = ["资源生成", "素材管理", "动态生成", "任务中心"];

export const GUARD_STEPS = [
  { no: "01", title: "真实痛点", text: "一线生产和真实反馈" },
  { no: "02", title: "值不值得做", text: "频次 × 收益，对照投入 × 风险" },
  { no: "03", title: "按标准验收", text: "对照交付标准逐项过" },
  { no: "04", title: "用数据复盘", text: "用量、失败、反馈，驱动下一轮" },
];

export const GUARD_ROUTES = [
  { tag: "确定性任务", title: "优先工具", text: "切图、压缩、命名、分组、多规格导出" },
  { tag: "生成性任务", title: "调用模型", text: "选题、风格、角色与画面；人留验收" },
  { tag: "低频或已成熟", title: "接入或不做", text: "市场已有、或用量低投入大的，不重复建设" },
  { tag: "成本判断", title: "把额度花在生成上", text: "一次调用不贵，重试和人工返工才贵" },
];

export const REPEAT_OLD = ["需求方提单", "等待排期", "人工处理", "交付"];
export const REPEAT_NEW = ["选业务场景", "上传素材自动处理", "交付"];
export const REPEAT_CASES = [
  {
    title: "选手定妆照",
    flow: "传统流程 → 专业效率管线 → AI 网页服务",
    note: "历年管线实战，约减少",
    stat: "83%",
    after: "人力处理投入",
    images: ["/projects/定妆照界面.png", "/projects/定妆照展示.png"],
  },
  {
    title: "Logo 智能延展",
    flow: "逐个调整 / 命名 / 打包 → 专业效率管线 → 算法智能处理",
    stat: "80%",
    extra: "提效 400%",
    note: "机械操作耗时减少",
    images: ["/projects/logo延展1.png", "/projects/logo延展2.png"],
  },
  {
    title: "多渠道资源位",
    flow: "裁切 / 压缩 / 转格式 / 命名 → 专业效率管线 → 算法智能处理",
    stat: "50%",
    note: "多环节操作封装为自动化流程，提效",
    images: ["/projects/资源位1.png", "/projects/资源位2.png"],
  },
];

export const SCENE_ROLES = [
  {
    tag: "运营",
    title: "快速出素材",
    extra: "活动图、动图、多渠道规格",
    text: "固定、批量的需求交给模板替换与批量出图，一句话或一套配置搞定，不再逐张等美术排期",
  },
  {
    tag: "美术",
    title: "高频素材处理与创作",
    extra: "三视图、扩图、肤色矫正、无限画布",
    text: "重复的处理交给工具批量做，把精力留给创作；多步产出在无限画布上编排成完整作品",
  },
  {
    tag: "内容",
    title: "从图到片到配音的成片链路",
    extra: "分镜、视频生成、音频",
    text: "分镜到成片一条链路批量完成，内容制作环节全链路打通",
  },
];

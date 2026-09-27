/** 站点文案与案例数据 */

export const RESUME_URL = "/projects/张喆涵-27校招.pdf";

export const NAV = [
  { href: "#background", label: "项目背景" },
  { href: "#main-case", label: "旗舰项目" },
  { href: "#method", label: "方法" },
  { href: "#agent", label: "Agent" },
  { href: "#sub-cases", label: "副案例" },
  { href: "#projects", label: "项目集" },
  { href: "#about", label: "关于我" },
  { href: "#scene", label: "场景" },
];

export const CASE_RESULT = [
  { value: "40,000+", unit: "资源", label: "回流模块累计产出" },
  { value: "约50", unit: "倍", label: "产出效率提升" },
  { value: "70%", unit: "", label: "素材成本降低" },
  { value: "90%", unit: "", label: "业务验收一次通过率" },
];

export const PAINS = [
  { no: "01", title: "单张数小时", text: "质量与产量无法兼得", tag: "产能" },
  { no: "02", title: "切图慢、质量低", text: "渠道越多，多样性越差", tag: "质量" },
  { no: "03", title: "跨部门反复对齐", text: "运营提要求，设计师逐张执行", tag: "协作" },
];

export const OLD_FLOW = ["运营提需求", "设计转译", "逐渠道制作", "反复返工"];
export const NEW_FLOW = ["规则配置", "自动匹配", "资产整合", "成品交付"];

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
  { no: "01", title: "AI 分镜助手", desc: "智能拆解脚本，自由参数控制", tags: ["AI 分镜", "视频生成", "异步任务"], image: "/projects/分镜.png" },
  { no: "02", title: "H5 组件生成", desc: "多样性组件产出", tags: ["生成即成品", "布局匹配", "风格跟随"], image: "/projects/H5.png" },
  { no: "03", title: "可视化节点画布", desc: "一整条创作，装进一块画布", tags: ["节点编排", "状态持久化", "工作流"], image: "/projects/无限画布.png" },
  { no: "04", title: "智能扩图与局部重绘", desc: "扩图与重绘，像素级可控", tags: ["Inpaint", "Mask", "任务恢复"], image: "/projects/智能扩图.png" },
  { no: "05", title: "角色三视图生成", desc: "一键批量生成，三视图一次出齐", tags: ["一致性", "批量生成", "失败兜底"], image: "/projects/角色三视图.png" },
  { no: "06", title: "Logo 创作模块", desc: "内置六大风格模板，一次完成品牌延展", tags: ["配套延展", "多尺寸", "多模型"], image: "/projects/logo.png" },
  { no: "07", title: "H5智能制作", desc: "上传 KV 参考图，生成组件库并自动切图打包", tags: ["KV 参考图", "组件生成", "生产可用"], image: "/projects/H5智能制作.png" },
  { no: "08", title: "智能定妆照", desc: "内置定妆照生成、定妆照三视图、人像换衣等多张板块", tags: ["质感保留", "批量处理", "肤色矫正"], image: "/projects/定妆照.png" },
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
  ["01", "业务问题抽象", "把隐性经验，转成可配置规则。"],
  ["02", "AI 机制设计", "为模型设计路由、验收、兜底与恢复。"],
  ["03", "复杂流程产品化", "把多角色、多工具收敛成一条任务路径。"],
  ["04", "跨团队落地", "拉通运营、美术与研发，持续交付。"],
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

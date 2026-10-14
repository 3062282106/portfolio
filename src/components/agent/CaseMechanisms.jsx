import ArchDiagram from "./ArchDiagram.jsx";

function MechanismSteps({ steps, label, className = "" }) {
  return (
    <ol className={`mechanism-steps ${className}`} aria-label={label}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="mechanism-step-index">0{index + 1}</span>
          <div><h5>{step.title}</h5><p>{step.text}</p></div>
        </li>
      ))}
    </ol>
  );
}

export default function CaseMechanisms() {
  return (
    <div className="agent-architecture">
      <div className="agent-production reveal">
        <div className="agent-role-strip" aria-label="Agent 职责分工">
          <div><span>规划</span><b>主 Agent</b><small>意图判断 · 编排 · 汇总</small></div>
          <div><span>执行</span><b>执行 / 创意 / 视觉子代理</b><small>按任务类型调用工具</small></div>
          <div><span>核验</span><b>只读质检子代理</b><small>独立检查 · 结构化结论</small></div>
        </div>
        <ArchDiagram />
      </div>

      <div className="agent-support-grid">
        <article className="agent-support contract-support reveal">
          <span className="eyebrow">EXECUTION CONTRACT / 执行契约</span>
          <h4>结构化执行契约</h4>
          <p className="mechanism-intro">派发前约束权限、参数与产物</p>
          <MechanismSteps label="执行契约的三项校验" steps={[
            { title: "权限校验", text: "工具白名单" },
            { title: "参数校验", text: "Schema 与输入规范" },
            { title: "调度约束", text: "调用配额 · 产物归属" },
          ]} />
        </article>

        <article className="agent-support rag-support reveal">
          <span className="eyebrow">AGENTIC RAG / 检索增强</span>
          <h4>检索增强与知识约束注入</h4>
          <p className="mechanism-intro">检索证据转为执行与验收约束</p>
          <MechanismSteps className="rag-route" label="知识召回、原文核对与约束注入" steps={[
            { title: "混合召回", text: "HNSW 向量 + 字面" },
            { title: "原文溯源", text: "版本 · 来源 · 片段核对" },
            { title: "约束注入", text: "写入执行单与验收口径" },
          ]} />
          <small className="mechanism-config-note">候选重排按配置启用</small>
        </article>

        <article className="agent-support agent-memory reveal" aria-label="记忆与上下文分层">
          <span className="eyebrow">MEMORY / CONTEXT</span>
          <h4>分层记忆与上下文治理</h4>
          <p className="mechanism-intro">知识、状态与规则分层装载</p>
          <MechanismSteps label="记忆与上下文的三个层级" steps={[
            { title: "长期记忆", text: "用户事实 · 项目档案" },
            { title: "任务状态", text: "本轮任务 · 进度 · 产物" },
            { title: "按需装载", text: "相关知识 · Skill 正文" },
          ]} />
        </article>
      </div>
      <div className="agent-hard-rules"><span>客观不过，不进视觉</span><span>重做必须带改动</span><span>没有证据，不放行</span></div>
    </div>
  );
}

import ArchDiagram from "./ArchDiagram.jsx";
import Placeholder from "../Placeholder.jsx";
import { AGENT_ROLES } from "../../content.js";
import "./agent.css";

export default function AgentSection() {
  return (
    <section className="agent section-pad" id="agent">
      <div className="agent-watermark" aria-hidden="true">AGENT</div>
      <div className="container">
        <header className="agent-masthead reveal">
          <span className="agent-kicker">CASE 02 / 多模态资源生产 Agent</span>
          <h2>把一句业务需求<em>组织成可验收的交付</em></h2>
          <p>工具多了以后，用户仍需选工具、串步骤、追状态。Agent 小奈承接自然语言入口；产品设计进一步明确每一步能做什么、如何判定完成、失败后如何继续。</p>
        </header>
        <div className="case-ownership reveal"><span>我的工作</span><p>定义四类代理职责与执行契约，设计交付前门禁及评分标准，建设边界评测集与指标口径。</p></div>

        <article className="agent-contribution reveal">
          <div className="agent-contract">
            <span className="eyebrow">执行契约</span>
            <h3>先约束职责，再派发任务</h3>
            <p>将工具白名单、单轮提交配额和交付产物归属，转为派发前可校验的结构化规则。让权限与提交边界成为系统约束。</p>
            <div className="case-tags"><span>工具白名单</span><span>提交配额</span><span>产物归属</span></div>
          </div>
          <div className="agent-roles">
            {AGENT_ROLES.map((role) => <div key={role.title}><h4>{role.title}</h4><p>{role.text}</p></div>)}
          </div>
        </article>

        <article className="agent-arch reveal">
          <header className="agent-masthead compact">
            <span className="agent-kicker">生产流程与质量边界</span>
            <h3>生成、检查与重做，形成完整闭环</h3>
            <p>业务在两端提交与验收，中间由管线执行。客观校验、视觉质检后，再核对交付物与报告；异常时保留明确的升级出口。</p>
          </header>
          <ArchDiagram />
          <div className="agent-hard-rules"><span>客观不过，不进视觉</span><span>重做必须带改动</span><span>没有证据，不放行</span></div>
          <p className="data-note">规则体系：12 条美术维度、10 条红线、32 条工具专属规则；评分与硬性门禁分别判断。</p>
        </article>

        <div className="agent-shot reveal">
          <Placeholder title="Agent 小奈的自然语言任务入口与业务场景推荐" src="/projects/agent-chat-home.webp" />
          <details className="evidence-details">
            <summary>查看批量模板替换与人物生成任务 <span aria-hidden="true">＋</span></summary>
            <div className="agent-shot-grid">
              <Placeholder title="Agent 小奈模板批量替换任务与结果" src="/projects/agent-chat-assets.webp" />
              <Placeholder title="Agent 小奈选手服装生成任务与结果" src="/projects/agent-chat-stylist.webp" />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

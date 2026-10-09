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
        </header>
        <div className="case-ownership reveal"><span>我的工作</span><p>代理职责 · 执行契约 · 质量门禁 · 边界评测</p></div>

        <article className="agent-contribution reveal">
          <div className="agent-contract">
            <span className="eyebrow">执行契约</span>
            <h3>先约束职责，再派发任务</h3>
            <p>权限、配额与产物归属，派发前校验。</p>
          </div>
          <div className="agent-roles">
            {AGENT_ROLES.map((role) => <div key={role.title}><h4>{role.title}</h4><p>{role.text}</p></div>)}
          </div>
        </article>

        <article className="agent-arch reveal">
          <header className="agent-masthead compact">
            <span className="agent-kicker">生产流程与质量边界</span>
            <h3>生成、检查与重做，形成完整闭环</h3>
          </header>
          <ArchDiagram />
          <div className="agent-hard-rules"><span>客观不过，不进视觉</span><span>重做必须带改动</span><span>没有证据，不放行</span></div>
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

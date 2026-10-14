import ChapterHead from "../ChapterHead.jsx";
import Placeholder from "../Placeholder.jsx";
import Guardrails from "../../sections/Guardrails.jsx";
import CaseMechanisms from "./CaseMechanisms.jsx";
import "./agent.css";

export default function AgentSection() {
  return (
    <section className="agent section-pad case-study" id="agent">
      <div className="agent-watermark" aria-hidden="true">AGENT</div>
      <div className="container">
        <header className="agent-masthead case-cover reveal">
          <span className="agent-kicker">CASE 02 / 多模态资源生产 Agent</span>
          <h2>多模态资源生产<em>Agent 编排与质量闭环</em></h2>
        </header>

        <div className="agent-brief reveal">
          <div><span className="eyebrow">01 / 项目背景</span><p>运营、设计与赛事素材生产，需要跨工具执行与人工验收</p></div>
          <div><span className="eyebrow">02 / 我的职责</span><p>参与代理编排、工具声明、知识检索与质量门禁设计</p></div>
        </div>

        <article className="chapter agent-design" id="agent-design">
          <ChapterHead eyebrow="03 / 关键设计" title="需求编排、工具执行与" highlight="质量闭环" />
          <CaseMechanisms />
        </article>

        <Guardrails />
        <div className="agent-shot reveal">
          <div className="case-proof-heading"><h3>真实任务与交付界面</h3><span>自然语言入口 · 批量生成 · 结果验收</span></div>
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

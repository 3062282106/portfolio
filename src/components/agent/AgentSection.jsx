import ArchDiagram from "./ArchDiagram.jsx";
import Placeholder from "../Placeholder.jsx";
import { AGENT_NOW, AGENT_PAST } from "../../content.js";
import "./agent.css";

/**
 * Agent 案例条 — 一句任务、一条路径，再展开生产架构
 */
export default function AgentSection() {
  return (
    <section className="agent section-pad" id="agent">
      <div className="agent-watermark" aria-hidden="true">AGENT</div>
      <div className="container">
        <article className="agent-case reveal">
          <header className="agent-masthead">
            <span className="agent-kicker">Agent 价值</span>
            <h2>将跨工具操作<em>压缩为单次输入</em></h2>
            <p>自动选工具、串流程、盯状态，把多步操作收敛成一次交付</p>
          </header>

          <p className="agent-now-label">现在 · Agent 编排任务</p>
          <ol className="agent-rail">
            {AGENT_NOW.map((step, index) => (
              <li key={step}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <b>{step}</b>
              </li>
            ))}
          </ol>
          <p className="agent-now-foot">跨步骤自动化 · 批量产出</p>

          <aside className="agent-past">
            <span>过去 · 用户编排工具</span>
            <div className="agent-past-loop">
              <ol className="agent-past-steps">
                {AGENT_PAST.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <span className="cycle-leg start" aria-hidden="true" />
              <span className="cycle-rail" aria-hidden="true" />
              <span className="cycle-leg end" aria-hidden="true" />
              <p className="agent-past-return">循环数轮，才最终拿到交付结果</p>
            </div>
            <small>高学习成本 · 多步骤 · 易中断</small>
          </aside>
        </article>

        <article className="agent-arch reveal">
          <header className="agent-masthead compact">
            <span className="agent-kicker">多模态资源生产 Agent</span>
            <h2>从人操作工具<em>到 AI 编排供给</em></h2>
            <p>把任务拆解、工具调用、状态反馈、异常处理与结果交付，收成统一任务入口</p>
          </header>
          <ArchDiagram />
        </article>

        <div className="agent-shot reveal">
          <div className="agent-shot-home">
            <Placeholder title="FlowX AI 应用平台 · Agent 首页" src="/projects/agent-chat-home.png" />
          </div>
          <div className="agent-shot-grid">
            <Placeholder title="Agent 小奈 · 模板批量替换" src="/projects/agent-chat-assets.png" />
            <Placeholder title="Agent 小奈 · 选手服装生成" src="/projects/agent-chat-stylist.png" />
          </div>
        </div>
      </div>
    </section>
  );
}

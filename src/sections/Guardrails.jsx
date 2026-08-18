import RepeatWork from "./repeat/RepeatWork.jsx";
import { GUARD_ROUTES, GUARD_STEPS } from "../content.js";
import "./guardrails.css";

/**
 * 护栏与成本 — 上线门禁与调用策略，排版对齐双栏板块
 */
export default function Guardrails() {
  return (
    <section className="guard section-pad" id="method">
      <div className="container">
        <header className="guard-head reveal">
          <span className="guard-kicker">METHOD · 护栏与成本</span>
          <h2>从「能生成」到「敢上线」</h2>
          <p>先判断，再决策，拒绝无效AI渗透</p>
        </header>

        <article className="guard-band reveal">
          <aside className="guard-side">
            <span>01 / GATE</span>
            <h3>上线门禁</h3>
            <p>用验收卡住上线，人力留给真实、高频、可复用的问题</p>
          </aside>
          <div className="guard-main">
            <ol className="guard-flow">
              {GUARD_STEPS.map((step) => (
                <li key={step.no}>
                  <b>{step.title}</b>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
            <p className="guard-note">稳不住、追不回、对不上的能力，宁可延后</p>
          </div>
        </article>

        <article className="guard-band reveal">
          <aside className="guard-side">
            <span>02 / CALL</span>
            <h3>怎么调用</h3>
            <p>先判断任务属性，再决定用工具、走算法还是调模型</p>
          </aside>
          <div className="guard-cards">
            {GUARD_ROUTES.map((route) => (
              <article className="guard-card" key={route.tag}>
                <span>{route.tag}</span>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
              </article>
            ))}
          </div>
        </article>

        <RepeatWork />
      </div>
    </section>
  );
}

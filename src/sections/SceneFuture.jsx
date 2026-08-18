import { SCENE_ROLES } from "../content.js";
import "./scene-future.css";

const LOOP_TOP = ["真实需求", "投入使用"];
const LOOP_BOT = ["建设能力", "用起来", "收集反馈", "打磨迭代"];

/**
 * 场景与未来 — 从做功能到做闭环，以及谁在用
 */
export default function SceneFuture() {
  return (
    <section className="scene section-pad" id="scene">
      <div className="container">
        <header className="scene-head reveal">
          <span className="scene-kicker">SCENE & FUTURE · 谁在用 · 会长成什么</span>
          <h2>从「做功能」到「做闭环」</h2>
          <p>需求驱动建设，反馈反哺迭代</p>
        </header>

        <div className="loop-board reveal">
          <div className="loop-grid">
            <div className="loop-node">{LOOP_TOP[0]}</div>
            <span className="loop-dash" aria-hidden="true" />
            <span className="loop-dash" aria-hidden="true" />
            <div className="loop-node">{LOOP_TOP[1]}</div>
            {LOOP_BOT.map((step) => (
              <div className="loop-node" key={step}>{step}</div>
            ))}
          </div>
          <p className="loop-caption"><b>让平台越用越贴合业务</b>——铺好的能力，靠循环持续进化</p>
        </div>

        <div className="scene-roles reveal">
          {SCENE_ROLES.map((role) => (
            <article className="scene-role" key={role.tag}>
              <span>{role.tag}</span>
              <div>
                <h3>{role.title} <small>{role.extra}</small></h3>
                <p>{role.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SCENE_ROLES } from "../content.js";
import "./scene-future.css";

const LOOP_STEPS = [
  { label: "真实需求", type: "need" },
  { label: "建设能力", type: "build" },
  { label: "用起来", type: "use" },
  { label: "收集反馈", type: "feedback" },
  { label: "打磨迭代", type: "iterate" },
  { label: "投入使用", type: "release" },
];

/**
 * 场景与未来 — 从做功能到做闭环，以及谁在用
 */
export default function SceneFuture({ embedded = false }) {
  const Wrapper = embedded ? "div" : "section";
  return (
    <Wrapper className={embedded ? "scene about-scene" : "scene section-pad"} id="scene">
      <div className={embedded ? "about-scene-content" : "container"}>
        <header className="scene-head reveal">
          <span className="scene-kicker">SCENE & FUTURE · 谁在用 · 会长成什么</span>
          <h2>从「做功能」到「做闭环」</h2>
          <p>需求驱动建设，反馈反哺迭代</p>
        </header>

        <div className="loop-board reveal">
          <ol className="loop-grid" aria-label="需求、建设、使用、反馈、迭代与投入使用，反馈回到真实需求形成闭环">
            {LOOP_STEPS.map((step, index) => (
              <li className={`loop-node loop-${step.type}`} key={step.type}><span>0{index + 1}</span><b>{step.label}</b></li>
            ))}
            <li className="loop-return" aria-hidden="true" />
          </ol>
          <p className="loop-caption">让平台越用越贴合业务</p>
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
    </Wrapper>
  );
}

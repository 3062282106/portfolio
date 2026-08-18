import Placeholder from "../../components/Placeholder.jsx";
import { REPEAT_CASES, REPEAT_NEW, REPEAT_OLD } from "../../content.js";
import "./repeat.css";

/**
 * 方法页下半 — 重复活交给 AI 实战案例
 */
export default function RepeatWork() {
  return (
    <div className="repeat reveal">
      <header className="repeat-head">
        <h3>重复活交给 AI</h3>
      </header>

      <div className="repeat-compare">
        <div className="repeat-lane old">
          <b>传统流程</b>
          <p>{REPEAT_OLD.join(" → ")}</p>
        </div>
        <div className="repeat-shift">
          <span>持续优化</span>
          <i>→</i>
          <small>迭代管线</small>
        </div>
        <div className="repeat-lane now">
          <b>AI 助力</b>
          <p>FlowX {REPEAT_NEW.join(" → ")}</p>
        </div>
      </div>

      <div className="repeat-grid">
        {REPEAT_CASES.map((item) => (
          <article className="repeat-card" key={item.title}>
            <h4>{item.title} <small>为例</small></h4>
            <p className="repeat-flow">{item.flow}</p>
            <p className="repeat-stat">
              {item.note} <strong>{item.stat}</strong> {item.after}
              {item.extra ? <em>，{item.extra}</em> : null}
            </p>
            <div className="repeat-thumbs">
              {item.images.map((src, index) => (
                <Placeholder key={src} title={`${item.title} ${index + 1}`} src={src} />
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="repeat-foot">可规格化、可验收、反复出现的任务，不应承担跨部门协调沟通成本</p>
    </div>
  );
}

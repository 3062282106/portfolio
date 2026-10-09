import { EVAL_SUITE, ITERATIONS, QUALITY_METRICS } from "../content.js";
import "./guardrails.css";

export default function Guardrails() {
  return (
    <section className="guard section-pad" id="method">
      <div className="container">
        <header className="guard-head reveal">
          <span className="guard-kicker">EVALUATION / 评测与产品迭代</span>
          <h2>用验收口径与失败样本<br />确定下一轮优先级</h2>
          <p>分别衡量第一版能否交付、重做能否救回、最终是否需要人工收尾，让生成质量与运行稳定性都能被看见。</p>
        </header>

        <article className="eval-suite reveal">
          <div className="eval-suite-heading"><h3>我的评测建设</h3><p><strong>53</strong> 个测试文件 <span>/</span> <strong>544</strong> 个用例</p></div>
          <div className="eval-matrices">
            {EVAL_SUITE.map((item) => <div key={item.title}><strong>{item.count}<small>项</small></strong><h4>{item.title}</h4><p>{item.text}</p></div>)}
          </div>
        </article>

        <article className="quality-evidence reveal">
          <div className="section-kicker"><span>PLATFORM VALIDATION</span></div>
          <div className="quality-metrics">
            {QUALITY_METRICS.map((item) => <div key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><span>{item.sample}</span></div>)}
          </div>
        </article>

        <article className="iteration-review reveal">
          <header><span className="eyebrow">失败归因 · 迭代优先级</span><h3>11 轮需要人工收尾，分别解决</h3></header>
          <div className="iteration-list">
            {ITERATIONS.map((item) => <div className="iteration-row" key={item.title}><span className="iteration-priority">{item.no}</span><div><h4>{item.title} <small>{item.count}</small></h4><p>{item.decision}</p></div></div>)}
          </div>
        </article>
      </div>
    </section>
  );
}

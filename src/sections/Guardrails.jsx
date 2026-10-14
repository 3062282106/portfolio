import ChapterHead from "../components/ChapterHead.jsx";
import { EVAL_SUITE, ITERATIONS, QUALITY_METRICS } from "../content.js";
import "./guardrails.css";

export default function Guardrails() {
  return (
    <article className="chapter agent-validation" id="method">
      <ChapterHead eyebrow="04 / 验证结果" title="分别衡量，" highlight="首版交付与失败恢复" />
      <div className="quality-evidence reveal">
        <div className="quality-metrics">
          {QUALITY_METRICS.map((item) => <div key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><span>{item.sample}</span></div>)}
        </div>
      </div>

      <details className="evidence-details reveal" open>
        <summary>查看工程回归与失败复盘 <span aria-hidden="true">＋</span></summary>
        <div>
          <article className="eval-suite">
            <div className="eval-suite-heading"><h3>工程回归覆盖</h3><p><strong>53</strong> 个测试文件 <span>/</span> <strong>544</strong> 个用例</p></div>
            <p className="case-measure-note">该阶段回归基线，验证执行边界与运行稳定性</p>
            <div className="eval-matrices">
              {EVAL_SUITE.map((item) => <div key={item.title}><strong>{item.count}<small>项</small></strong><h4>{item.title}</h4><p>{item.text}</p></div>)}
            </div>
          </article>
          <article className="iteration-review">
            <header><span className="eyebrow">失败归因 · 迭代优先级</span><h3>11 轮人工收尾，落到三类改进</h3></header>
            <div className="iteration-list">
              {ITERATIONS.map((item) => <div className="iteration-row" key={item.title}><span className="iteration-priority">{item.no}</span><div><h4>{item.title} <small>{item.count}</small></h4><p>{item.decision}</p></div></div>)}
            </div>
          </article>
        </div>
      </details>
    </article>
  );
}

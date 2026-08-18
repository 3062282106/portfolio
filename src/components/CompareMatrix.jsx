/**
 * 对比卡 — 与流程泳道同一套左右两栏
 * @param {{ title: string, left: string, right: string, tone: string, rows: string[][], conclusion: string }} props
 */
export default function CompareMatrix({ title, left, right, rows, conclusion }) {
  return (
    <section className="compare-matrix reveal">
      <h4>{title}</h4>
      <div className="compare-pair">
        <div className="compare-lane old">
          <div className="lane-label">{left}</div>
          {rows.map(([label, before]) => (
            <div className="compare-item" key={`b-${label}`}>
              <span>{label}</span>
              <b>{before}</b>
            </div>
          ))}
        </div>
        <div className="compare-lane new">
          <div className="lane-label">{right}</div>
          {rows.map(([label, , after]) => (
            <div className="compare-item" key={`a-${label}`}>
              <span>{label}</span>
              <b>{after}</b>
            </div>
          ))}
        </div>
      </div>
      <p className="compare-verdict">{conclusion}</p>
    </section>
  );
}

/**
 * 流程泳道 — 展示过去或现在的步骤序列
 * @param {{ title: string, tone: string, items: string[] }} props
 */
export default function FlowLane({ title, tone, items }) {
  return (
    <div className={`flow-lane ${tone}`}>
      <div className="lane-label">{title}</div>
      <div className="lane-steps">
        {items.map((item, index) => (
          <div className="lane-step" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item}</b>
            {index < items.length - 1 && <i>→</i>}
          </div>
        ))}
      </div>
    </div>
  );
}

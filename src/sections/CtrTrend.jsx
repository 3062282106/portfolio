const PERIODS = ["24H2", "25H1", "25H2", "26H1"];
const VALUES = [1.0, 1.1, 1.2, 1.3];
const POINTS = VALUES.map((value, index) => ({ x: 42 + index * 88, y: 168 - (value - 1) * 400, value }));

export default function CtrTrend() {
  return (
    <figure className="ctr-trend">
      <svg viewBox="0 0 360 224" role="img" aria-labelledby="ctr-title ctr-description">
        <title id="ctr-title">OPPO 渠道 CTR 趋势</title>
        <desc id="ctr-description">24H2 为 1.0%，25H1 为 1.1%，25H2 为 1.2%，26H1 为 1.3%。</desc>
        <text className="ctr-axis-title" x="0" y="15">CTR</text>
        {POINTS.map(({ y, value }) => <line className="ctr-grid-line" key={value} x1="30" x2="330" y1={y} y2={y} />)}
        <polyline className="ctr-line" points={POINTS.map(({ x, y }) => `${x},${y}`).join(" ")} />
        {POINTS.map(({ x, y, value }, index) => (
          <g key={value}>
            <circle className="ctr-point" cx={x} cy={y} r="3.5" />
            <text className="ctr-value" x={x} y={y - 14} textAnchor="middle">{value.toFixed(1)}%</text>
            <text className="ctr-period" x={x} y="208" textAnchor="middle">{PERIODS[index]}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

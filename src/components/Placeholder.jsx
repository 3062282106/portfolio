/**
 * 截图占位 — 有 src 时展示真实产品图
 * @param {{ title: string, note?: string, ratio?: string, src?: string }} props
 */
export default function Placeholder({ title, note = "待替换真实产品截图", ratio = "wide", src }) {
  if (src) {
    return (
      <figure className={`placeholder filled ${ratio}`}>
        <img src={src} alt={title} />
      </figure>
    );
  }

  return (
    <div className={`placeholder ${ratio}`} role="img" aria-label={`${title}占位图`}>
      <div className="ph-grid" />
      <span className="ph-index">IMAGE PLACEHOLDER</span>
      <div className="ph-center">
        <span className="ph-icon">＋</span>
        <strong>{title}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}

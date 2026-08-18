/**
 * 章节标题 — 左侧标签 + 右侧主标题
 * @param {{ eyebrow: string, title: string, highlight?: string, desc?: string }} props
 */
export default function ChapterHead({ eyebrow, title, highlight, desc }) {
  return (
    <header className="chapter-head reveal">
      <div className="chapter-label"><span className="eyebrow">{eyebrow}</span></div>
      <div>
        <h3>{title} {highlight && <em>{highlight}</em>}</h3>
        {desc && <p>{desc}</p>}
      </div>
    </header>
  );
}

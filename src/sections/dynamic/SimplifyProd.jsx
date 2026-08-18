import { SIMPLIFY_LANES } from "../../content.js";
import "./simplify.css";

/**
 * 动态生成 — 化繁为简升级生产方式（无工作台截图版）
 */
export default function SimplifyProd() {
  return (
    <div className="simplify reveal">
      <header className="simplify-head">
        <span>生产方式</span>
        <h3>化繁为简，升级生产方式</h3>
        <p>朝着可交付、可运维的应用系统下沉</p>
      </header>

      <p className="simplify-case">KV 动态循环动画 · 为例</p>

      <div className="simplify-lanes">
        {SIMPLIFY_LANES.map((lane) => (
          <article className={lane.highlight ? "lane flowx" : "lane"} key={lane.tag}>
            <b>{lane.tag}</b>
            <p>{lane.steps}</p>
          </article>
        ))}
      </div>

      <p className="simplify-bridge">
        <strong>使用门槛降低</strong>——功能便捷的背后，是把内部业务交付标准吃透（封装时长、帧数、码率…参数），将 SOP 封装为自动化流程运转
      </p>

      <div className="simplify-impact">
        <article>
          <span>角色扩展 · 用户增长</span>
          <p>美术专业人员 <i>→</i> 非美术专业人员（导演、运营人员…）</p>
        </article>
      </div>
    </div>
  );
}

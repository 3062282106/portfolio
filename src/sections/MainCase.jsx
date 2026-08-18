import ChapterHead from "../components/ChapterHead.jsx";
import CompareMatrix from "../components/CompareMatrix.jsx";
import FlowLane from "../components/FlowLane.jsx";
import Placeholder from "../components/Placeholder.jsx";
import {
  AI_COMPARE,
  CASE_RESULT,
  HUMAN_COMPARE,
  MAIN_RESULTS,
  NEW_FLOW,
  OLD_FLOW,
  PAINS,
} from "../content.js";

/**
 * 旗舰项目 — 回流营销素材生产
 */
export default function MainCase() {
  return (
    <section className="main-case section-pad" id="main-case">
      <div className="container">
        <div className="case-cover reveal">
          <span className="case-eyebrow">旗舰项目｜游戏回流营销素材生产</span>
          <h2 className="case-title">分钟级产出效率，<em>生成即投放</em></h2>
          <div className="case-result">
            {CASE_RESULT.map((item) => (
              <div className="case-res" key={item.label}>
                <strong>{item.value}<small>{item.unit}</small></strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <article className="chapter">
          <ChapterHead eyebrow="业务痛点" title="耗尽工时，" highlight="换不来质量" />
          <div className="pain-grid reveal">
            {PAINS.map((pain) => (
              <div className="pain-card" key={pain.no}>
                <div className="pain-top"><span>{pain.no}</span><b>{pain.tag}</b></div>
                <h4>{pain.title}</h4><p>{pain.text}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="chapter">
          <ChapterHead eyebrow="流程重构" title="从经验交付，" highlight="到规则驱动" />
          <div className="flow-stack reveal">
            <FlowLane title="过去 · 依赖人" tone="old" items={OLD_FLOW} />
            <FlowLane title="现在 · 系统承接" tone="new" items={NEW_FLOW} />
          </div>
        </article>

        <article className="chapter">
          <ChapterHead eyebrow="价值对比" title="同样是 AI，" highlight="差在交付" />
          <div className="compare-stack">
            <CompareMatrix title="解决人工瓶颈" left="人工流程" right="FlowX" tone="human" rows={HUMAN_COMPARE} conclusion="人力扩产 → 系统扩产" />
            <CompareMatrix title="跨过通用 AI 的最后一公里" left="通用 AI" right="FlowX" tone="ai" rows={AI_COMPARE} conclusion="生成图片 → 交付成品" />
          </div>
        </article>

        <article className="chapter">
          <ChapterHead eyebrow="系统蓝图" title="企业规则，" highlight="就是产品壁垒" />
          <div className="system-map reveal">
            <div className="system-inputs">
              <span>业务规则</span><span>内容策略</span><span>渠道规格</span><span>品牌资产</span>
            </div>
            <div className="system-engine">
              <div className="engine-title"><b>FLOWX 生产引擎</b><span>把模型能力封装为稳定交付</span></div>
              <div className="engine-layers">
                <div><span>策略</span><b>614 条场景策略</b><small>规则化选题与提示词</small></div>
                <div><span>生成</span><b>成本平衡策略</b><small>质量匹配与版本生成</small></div>
                <div><span>体验</span><b>收敛智能参数</b><small>解决「调参难、易失败」痛点</small></div>
                <div><span>任务</span><b>状态与恢复</b><small>失败兜底、续跑、交付</small></div>
              </div>
            </div>
            <div className="system-outputs"><span>可投放成品</span><span>64 种渠道规格</span><span>分层路由策略</span><span>可追踪任务</span></div>
          </div>
          <div className="value-strip reveal">
            <span>差异化价值</span>
            <p>可按企业资产、渠道与业务规则配置，复用到各个方向</p>
          </div>
        </article>

        <article className="chapter result-chapter">
          <ChapterHead eyebrow="结果" title="从一次生成，" highlight="到规模化生产" />
          <div className="result-grid reveal">
            {MAIN_RESULTS.map((result) => (
              <div className="result-card" key={result.label}>
                <strong>{result.value}<small>{result.unit}</small></strong><span>{result.label}</span>
              </div>
            ))}
          </div>
          <div className="case-shots">
            <Placeholder title="游戏回流营销素材生产" src="/projects/游戏回流.png" />
            <Placeholder title="游戏回流生成预览" src="/projects/游戏回流2.png" />
          </div>
        </article>
      </div>
    </section>
  );
}

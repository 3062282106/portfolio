import ChapterHead from "../components/ChapterHead.jsx";
import FlowLane from "../components/FlowLane.jsx";
import Placeholder from "../components/Placeholder.jsx";
import { CASE_RESULT, MARKETING_DECISIONS, NEW_FLOW, OLD_FLOW, PAINS } from "../content.js";

export default function MainCase() {
  return (
    <section className="main-case section-pad case-study" id="main-case">
      <div className="container">
        <div className="case-cover reveal">
          <span className="case-eyebrow">CASE 01 / 游戏营销素材自动化</span>
          <h2 className="case-title">游戏营销素材<br /><em>自动化生产管线</em></h2>
        </div>

        <article className="chapter">
          <ChapterHead eyebrow="01 / 项目背景" title="同一活动，" highlight="反复适配不同渠道" />
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
          <ChapterHead eyebrow="02 / 我的职责" title="业务需求建模与" highlight="批量生产产品化" />
          <div className="decision-list">
            {MARKETING_DECISIONS.map((item) => (
              <article className="decision-row reveal" key={item.no}>
                <div className="decision-index"><span>{item.no}</span></div>
                <div className="decision-body">
                  <h4>{item.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="chapter" id="marketing-design">
          <ChapterHead eyebrow="03 / 关键设计" title="将场景与渠道规范" highlight="前置到生产流程" />
          <div className="flow-stack reveal">
            <FlowLane title="原流程 · 人工逐项衔接" tone="old" items={OLD_FLOW} />
            <FlowLane title="产品化流程 · 自助批量任务" tone="new" items={NEW_FLOW} />
          </div>
          <div className="system-map reveal marketing-system">
            <div className="system-engine">
              <div className="engine-title"><b>从场景策略到成品验收</b><span>业务配置进入生成与合成链路</span></div>
              <div className="engine-layers">
                <div><span>策略</span><b className="engine-data"><strong>614</strong><span>条场景数据</span></b><small>六类投放策略，按渠道匹配</small></div>
                <div><span>生成</span><b>版式与主体双参考</b><small>分别约束布局与角色身份</small></div>
                <div><span>合成</span><b>安全区与资源位适配</b><small>按渠道配置排版与导出</small></div>
                <div><span>验收</span><b>视觉核验与失败修正</b><small>缺陷回传，结果统一交付</small></div>
              </div>
            </div>
          </div>
        </article>

        <article className="chapter result-chapter">
          <ChapterHead eyebrow="04 / 验证结果" title="一次提交，" highlight="交付多规格成品" />
          <figure className="marketing-demo reveal">
            <img
              src="/projects/flowx/marketing-multi-size-ab-skill.gif"
              alt="买量营销操作演示：上传风格参考，配置多规格与 A/B 双版，并复用 Skill"
              width="1040"
              height="585"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="case-result reveal">
            {CASE_RESULT.map((item) => (
              <div className="case-res" key={item.label}>
                <strong>{item.value}<small>{item.unit}</small></strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="delivery-gallery reveal">
            <figure className="delivery-wide"><img src="/projects/flowx/marketing-wide.png" alt="梦幻西游回流活动插屏广告成品，1110×477" loading="lazy" decoding="async" /></figure>
            <figure className="delivery-portrait"><img src="/projects/flowx/marketing-popup.png" alt="同批回流活动大神启动弹窗成品，580×870" loading="lazy" decoding="async" /></figure>
            <figure className="delivery-landscape"><img src="/projects/flowx/marketing-feed.png" alt="同批回流活动内容流单图成品，690×188" loading="lazy" decoding="async" /></figure>
          </div>
          <details className="evidence-details reveal">
            <summary>查看营销模块界面与生成预览 <span aria-hidden="true">＋</span></summary>
            <div className="case-shots">
              <Placeholder title="游戏回流营销素材模块的业务配置界面" src="/projects/游戏回流.png" />
              <Placeholder title="游戏回流营销素材模块的生成结果预览" src="/projects/游戏回流2.png" />
            </div>
          </details>
        </article>
      </div>
    </section>
  );
}

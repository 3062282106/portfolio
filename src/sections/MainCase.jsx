import ChapterHead from "../components/ChapterHead.jsx";
import FlowLane from "../components/FlowLane.jsx";
import Placeholder from "../components/Placeholder.jsx";
import { CASE_RESULT, MARKETING_DECISIONS, NEW_FLOW, OLD_FLOW, PAINS } from "../content.js";

export default function MainCase() {
  return (
    <section className="main-case section-pad" id="main-case">
      <div className="container">
        <div className="case-cover reveal">
          <span className="case-eyebrow">CASE 01 / 游戏营销素材自动化</span>
          <h2 className="case-title">把多渠道制作<br /><em>做成自助批量生产</em></h2>
          <p className="case-intro">面向运营与设计团队，解决通用 AI 难适配内部素材、固定规格与品牌规范的问题。把渠道适配、生成兜底和批量交付纳入同一条任务路径。</p>
          <div className="case-result">
            {CASE_RESULT.map((item) => (
              <div className="case-res" key={item.label}>
                <strong>{item.value}<small>{item.unit}</small></strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="data-note">营销自动化模块项目口径 · 已落地梦幻西游等 20+ 款游戏 · 与下方平台 Agent 质量评测分别统计</p>
        </div>

        <article className="chapter">
          <ChapterHead eyebrow="需求分析" title="三个阻塞点，" highlight="决定产品切入点" />
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
          <ChapterHead eyebrow="产品决策" title="让用户表达业务，" highlight="让系统处理复杂度" />
          <div className="decision-list">
            {MARKETING_DECISIONS.map((item) => (
              <article className="decision-row reveal" key={item.no}>
                <div className="decision-index"><span>{item.no}</span><small>{item.label}</small></div>
                <div className="decision-body">
                  <h4>{item.title}</h4>
                  <p className="decision-problem">{item.problem}</p>
                  <p>{item.decision}</p>
                  <p className="decision-outcome">{item.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="chapter">
          <ChapterHead eyebrow="流程设计" title="运营发起任务，" highlight="系统承接生产" />
          <div className="flow-stack reveal">
            <FlowLane title="原流程 · 人工逐项衔接" tone="old" items={OLD_FLOW} />
            <FlowLane title="产品化流程 · 自助批量任务" tone="new" items={NEW_FLOW} />
          </div>
          <div className="system-map reveal marketing-system">
            <div className="system-inputs"><span>活动目标</span><span>渠道资源位</span><span>品牌与角色资产</span><span>版式与内容策略</span></div>
            <div className="system-engine">
              <div className="engine-title"><b>FLOWX 营销生产模块</b><span>将业务约束前置到生成与交付流程</span></div>
              <div className="engine-layers">
                <div><span>策略</span><b>614 条场景数据</b><small>六类投放策略，按渠道匹配</small></div>
                <div><span>生成</span><b>分层路由 + 双版生成</b><small>平衡模型调用成本与可用率</small></div>
                <div><span>体验</span><b>智能默认与状态反馈</b><small>降低调参成本，解释任务进度</small></div>
                <div><span>迭代</span><b>数据回流与审核入库</b><small>清洗投流数据，定期更新策略</small></div>
              </div>
            </div>
            <div className="system-outputs"><span>多规格成品</span><span>可编辑底图</span><span>批量任务结果</span><span>可复用策略与资产</span></div>
          </div>
        </article>

        <article className="chapter result-chapter">
          <ChapterHead eyebrow="业务验证" title="同一活动，" highlight="适配多个资源位" />
          <div className="delivery-gallery reveal">
            <figure className="delivery-wide"><img src="/projects/flowx/marketing-wide.png" alt="梦幻西游回流活动插屏广告成品，1110×477" loading="lazy" decoding="async" /><figcaption>插屏广告 <span>1110 × 477</span></figcaption></figure>
            <figure className="delivery-portrait"><img src="/projects/flowx/marketing-popup.png" alt="同批回流活动大神启动弹窗成品，580×870" loading="lazy" decoding="async" /><figcaption>启动弹窗 <span>580 × 870</span></figcaption></figure>
            <figure className="delivery-landscape"><img src="/projects/flowx/marketing-feed.png" alt="同批回流活动内容流单图成品，690×188" loading="lazy" decoding="async" /><figcaption>内容流单图 <span>690 × 188</span></figcaption></figure>
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

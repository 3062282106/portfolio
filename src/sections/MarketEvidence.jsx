import CtrTrend from "./CtrTrend.jsx";

const SOCIAL_RESULTS = [
  { platform: "抖音", image: "market-douyin-proof.png", width: 627, height: 507, metrics: [["127万", "最高点赞"], ["78万", "最高转发"], ["3.8万", "最高评论"]] },
  { platform: "小红书", image: "market-xiaohongshu-proof.png", width: 511, height: 528, metrics: [["7.6万", "最高点赞"], ["2.8万", "最高收藏"], ["6,200", "最高评论"]] },
];

export default function MarketEvidence() {
  return (
    <section className="market-evidence section-pad" id="market-evidence">
      <div className="container">
        <header className="market-heading reveal"><span className="eyebrow">MARKET EVIDENCE</span><h2>市场验证</h2></header>
        <div className="market-board reveal">
            {SOCIAL_RESULTS.map(({ platform, image, width, height, metrics }) => (
              <article className="market-stat-group" key={platform}>
                <h3>{platform} <span>赛事内容</span></h3>
                <div className="market-stat-row">{metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
                <figure className="market-social-proof"><img src={`/projects/flowx/${image}`} alt={`${platform}赛事内容的真实发布与互动截图`} width={width} height={height} loading="lazy" decoding="async" /></figure>
              </article>
            ))}
          <article className="market-stat-group market-ctr-stats">
            <h3>OPPO <span>渠道营销</span></h3>
            <div className="market-stat-row"><div><strong>+5<small>%</small></strong><span>点击率提升</span></div></div>
            <div className="market-channel-proof">
              <CtrTrend />
              <figure><img src="/projects/flowx/market-community-proof.png" alt="内容发布后的真实评论与用户互动记录" width="509" height="184" loading="lazy" decoding="async" /></figure>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

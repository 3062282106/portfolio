import { useState } from "react";
import { PIPELINE } from "../../content.js";
import "./agent-arch.css";

export default function ArchDiagram() {
  const [active, setActive] = useState("04");
  const selected = PIPELINE.find((step) => step.no === active);
  const retry = PIPELINE.find((step) => step.type === "retry");

  function stepButton(step) {
    return (
      <button type="button" className={`pipeline-node ${step.type}`} aria-pressed={active === step.no} aria-controls="pipeline-detail" onClick={() => setActive(step.no)}>
        <span>{step.no}</span><b>{step.title}</b><small>{step.hint}</small>
      </button>
    );
  }

  return (
    <div className="pipeline-board">
      <div className="pipeline-boundary"><span>人工起点</span><p>说明需求 · 提供素材 · 确认范围</p></div>
      <div className="pipeline-main">
        <div className="pipeline-caption"><b>FlowX 自动执行链路</b><span>选择节点查看边界</span></div>
        <ol className="pipeline-steps" aria-label="素材生产与交付主流程">
          {PIPELINE.filter((step) => step.type !== "retry").map((step) => <li key={step.no}>{stepButton(step)}</li>)}
        </ol>
        <div className="pipeline-retry">
          <p><span>L1 / L2 未通过</span>依据缺陷修改后，重新经过质量门禁</p>
          {stepButton(retry)}
          <p><span>预算用尽 / 核验异常</span>升级人工确认，说明未解决项</p>
        </div>
      </div>
      <div className="pipeline-boundary end"><span>人工终点</span><p>验收成品与报告 · 决定是否上架</p></div>
      <div className="pipeline-detail" id="pipeline-detail" aria-live="polite" aria-atomic="true">
        <div><span>NODE {selected.no}</span><h4>{selected.title}</h4></div>
        <div><p>{selected.detail}</p><p className="pipeline-rule"><b>验收边界</b>{selected.rule}</p></div>
      </div>
    </div>
  );
}

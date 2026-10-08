import AgentSection from "./components/agent/AgentSection.jsx";
import Nav from "./components/Nav.jsx";
import { useReveal } from "./hooks/useReveal.js";
import Guardrails from "./sections/Guardrails.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import MainCase from "./sections/MainCase.jsx";
import MoreWork from "./sections/MoreWork.jsx";
import "./portfolio.css";

/**
 * 作品集根组件 — 组装各区块
 */
export default function App() {
  const root = useReveal();
  return (
    <div ref={root} id="top">
      <Nav />
      <main>
        <HeroSection />
        <MainCase />
        <AgentSection />
        <Guardrails />
        <MoreWork />
      </main>
    </div>
  );
}

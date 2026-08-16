import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.72,
      r: 0.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.5,
    }));

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = 0.16 + 0.34 * Math.sin(t * s.speed + s.phase);
        ctx.fillStyle = `rgba(226, 255, 200, ${Math.max(tw, 0)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

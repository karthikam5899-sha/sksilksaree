import { useEffect, useState } from "react";
import { sarees } from "../data/sarees";

export default function IntroSplash() {
  const [phase, setPhase] = useState("brand");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const brandDuration = reducedMotion ? 350 : 900;
    const silkDuration = reducedMotion ? 900 : 2550;
    const hideDuration = reducedMotion ? 1250 : 3100;
    const timers = [
      window.setTimeout(() => setPhase("silk"), brandDuration),
      window.setTimeout(() => setPhase("exit"), silkDuration),
      window.setTimeout(() => setVisible(false), hideDuration)
    ];

    return () => timers.forEach(window.clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-splash ${phase === "exit" ? "intro-splash-exit" : ""}`} role="status" aria-label="Welcome to SK Silk & Saree's">
      <div className={`intro-brand ${phase !== "brand" ? "intro-brand-leave" : ""}`}>
        <img src="/images/SK%20Silk%20&%20Saree.png" alt="" className="intro-logo"/>
        <h1>SK Silk &amp; Saree's</h1>
        <p>Tamil Nadu Silks</p>
      </div>
      <div className={`intro-sarees ${phase !== "brand" ? "intro-sarees-visible" : ""}`} aria-hidden="true">
        {sarees.slice(0, 3).map((saree, index) => <img key={saree.id} src={saree.image} alt="" className="intro-saree" style={{ "--index": index, "--tilt": index === 1 ? "0deg" : index === 0 ? "-4deg" : "4deg" }}/ >)}
      </div>
      <button type="button" onClick={() => setVisible(false)} className="intro-skip">Skip intro</button>
    </div>
  );
}

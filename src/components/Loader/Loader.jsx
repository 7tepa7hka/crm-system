import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/crm-sultan-light.png";
import logoDark from "../../assets/crm-sultan-dark.png";
import "./Loader.css";

export function Loader({ onFinish }) {
  const { isDark } = useTheme();
  const [stage, setStage] = useState("appear");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("grow"), 100);
    const t2 = setTimeout(() => setStage("fade"), 1200);
    const t3 = setTimeout(() => onFinish(), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className={`loader-screen loader-${stage}`}>
      <img
        src={isDark ? logoDark : logoLight}
        alt="Sultan CRM System"
        className="loader-logo"
      />
    </div>
  );
}

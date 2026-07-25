import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/crm-sultan-light.png";
import logoDark from "../../assets/crm-sultan-dark.png";
import "./Navbar.css";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img
          src={isDark ? logoDark : logoLight}
          alt="Sultan CRM"
          className="navbar-logo"
        />
        <span className="navbar-title">Sultan CRM System</span>
      </div>

      <div className="navbar-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Переключить тему"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

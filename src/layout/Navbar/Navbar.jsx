import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useSettings } from "../../hooks/useSettings";
import logoLight from "../../assets/crm-sultan-light.png";
import logoDark from "../../assets/crm-sultan-dark.png";
import adminAvatar from "../../assets/admin-avatar.png";
import "./Navbar.css";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { settings } = useSettings();
  const navigate = useNavigate();

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
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="navbar-profile"
          onClick={() => navigate("/settings")}
          title="Настройки"
        >
          <img src={adminAvatar} alt="Admin" className="navbar-avatar" />
          <span className="navbar-admin-name">
            {settings?.adminName || "Admin"}
          </span>
        </button>
      </div>
    </header>
  );
}

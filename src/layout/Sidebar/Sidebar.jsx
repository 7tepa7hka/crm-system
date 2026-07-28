import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Home as HomeIcon,
  Users as UsersIcon,
  BookOpen,
  BarChart3,
  Settings as SettingsIcon,
  Phone,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import "./Sidebar.css";

export function Sidebar() {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/", label: t.sidebar.home, Icon: HomeIcon },
    { path: "/users", label: t.sidebar.users, Icon: UsersIcon },
    { path: "/lessons", label: t.sidebar.lessons, Icon: BookOpen },
    { path: "/statistics", label: t.sidebar.statistics, Icon: BarChart3 },
    { path: "/settings", label: t.sidebar.settings, Icon: SettingsIcon },
    { path: "/contacts", label: t.sidebar.contacts, Icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    toast.info(t.settings.loggedOut);
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <Icon size={18} className="sidebar-icon" />
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={18} className="sidebar-icon" />
        <span className="sidebar-label">{t.common.logout}</span>
      </button>
    </aside>
  );
}

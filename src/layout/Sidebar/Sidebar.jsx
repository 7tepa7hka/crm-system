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
import "./Sidebar.css";

const menuItems = [
  { path: "/", label: "Home", Icon: HomeIcon },
  { path: "/users", label: "Users", Icon: UsersIcon },
  { path: "/lessons", label: "Lessons", Icon: BookOpen },
  { path: "/statistics", label: "Statistics", Icon: BarChart3 },
  { path: "/settings", label: "Settings", Icon: SettingsIcon },
  { path: "/contacts", label: "Contacts", Icon: Phone },
];

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Вы вышли из системы");
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
        <span className="sidebar-label">Выйти</span>
      </button>
    </aside>
  );
}

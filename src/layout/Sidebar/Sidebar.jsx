import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const menuItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/users", label: "Users", icon: "👥" },
  { path: "/lessons", label: "Lessons", icon: "📖" },
  { path: "/statistics", label: "Statistics", icon: "📊" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
  { path: "/contacts", label: "Contacts", icon: "📞" },
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
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <span className="sidebar-icon">🚪</span>
        <span className="sidebar-label">Выйти</span>
      </button>
    </aside>
  );
}

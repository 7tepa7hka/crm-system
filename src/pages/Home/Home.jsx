import { useEffect, useState } from "react";
import { Users, Wallet, GraduationCap, UserPlus } from "lucide-react";
import { getDashboardStats } from "../../services/dashboardService";
import { useLanguage } from "../../context/LanguageContext";
import { StatCard } from "../../components/StatCard/StatCard";
import "./Home.css";

export function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <h1 className="page-title">{t.home.title}</h1>
      <p className="page-subtitle">{t.home.subtitle}</p>

      {loading && <p className="loading-text">{t.common.loading}</p>}

      {!loading && stats && (
        <div className="stats-grid">
          <StatCard
            icon={Users}
            label={t.home.totalUsers}
            value={stats.totalUsers}
            accent="blue"
          />
          <StatCard
            icon={Wallet}
            label={t.home.income}
            value={`${stats.income.toLocaleString("ru-RU")} UZS`}
            accent="green"
          />
          <StatCard
            icon={GraduationCap}
            label={t.home.activeStudents}
            value={stats.activeStudents}
            accent="orange"
          />
          <StatCard
            icon={UserPlus}
            label={t.home.newRegistrations}
            value={stats.newRegistrations}
            accent="purple"
          />
        </div>
      )}

      {!loading && !stats && <p className="error-text">{t.common.error}</p>}

      {!loading && stats && (
        <>
          <h2 className="section-title">{t.home.recentStudentsTitle}</h2>
          <div className="recent-students-card">
            {stats.recentUsers.length === 0 && (
              <p className="empty-text">{t.home.recentStudentsEmpty}</p>
            )}
            {stats.recentUsers.length > 0 && (
              <ul className="recent-students-list">
                {stats.recentUsers.map((user) => (
                  <li key={user.id} className="recent-student-row">
                    <div className="recent-student-name-block">
                      <span className="recent-student-name">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="recent-student-group">{user.group}</span>
                    </div>
                    <span
                      className={`badge ${user.paid ? "badge-success" : "badge-danger"}`}
                    >
                      {user.paid ? t.users.paidStatus : t.users.unpaidStatus}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

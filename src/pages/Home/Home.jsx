import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import { teamMembers } from "../../data/team";
import { StatCard } from "../../components/StatCard/StatCard";
import { TeamCard } from "../../components/TeamCard/TeamCard";
import "./Home.css";

export function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Обзор состояния учебного центра</p>

      {loading && <p className="loading-text">Загрузка данных...</p>}

      {!loading && stats && (
        <div className="stats-grid">
          <StatCard
            icon="👥"
            label="Количество пользователей"
            value={stats.totalUsers}
            accent="blue"
          />
          <StatCard
            icon="💰"
            label="Доход"
            value={`${stats.income.toLocaleString("ru-RU")} UZS`}
            accent="green"
          />
          <StatCard
            icon="🎓"
            label="Активные ученики"
            value={stats.activeStudents}
            accent="orange"
          />
          <StatCard
            icon="✨"
            label="Новые регистрации"
            value={stats.newRegistrations}
            accent="purple"
          />
        </div>
      )}

      {!loading && !stats && (
        <p className="error-text">Не удалось загрузить данные.</p>
      )}

      <h2 className="section-title">Руководство CRM</h2>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <TeamCard
            key={member.id}
            emoji={member.emoji}
            name={member.name}
            role={member.role}
          />
        ))}
      </div>
    </div>
  );
}

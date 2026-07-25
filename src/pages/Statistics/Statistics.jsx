import { useStatistics } from "../../hooks/useStatistics";
import { StatCard } from "../../components/StatCard/StatCard";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import "./Statistics.css";

export function Statistics() {
  const { stats, loading, error } = useStatistics();

  return (
    <div className="statistics-page">
      <h1 className="page-title">Statistics</h1>
      <p className="page-subtitle">Общая статистика учебного центра</p>

      {loading && <p className="loading-text">Загрузка...</p>}
      {error && <p className="error-text">Ошибка загрузки: {error}</p>}

      {!loading && !error && stats && (
        <>
          <div className="stats-grid">
            <StatCard
              icon="🎓"
              label="Общее количество учеников"
              value={stats.totalStudents}
              accent="blue"
            />
            <StatCard
              icon="✅"
              label="Количество оплат"
              value={stats.paidCount}
              accent="green"
            />
            <StatCard
              icon="❌"
              label="Количество неоплат"
              value={stats.unpaidCount}
              accent="orange"
            />
            <StatCard
              icon="💰"
              label="Доход"
              value={`${stats.income.toLocaleString("ru-RU")} UZS`}
              accent="purple"
            />
            <StatCard
              icon="👥"
              label="Количество групп"
              value={stats.groupsCount}
              accent="blue"
            />
          </div>

          <div className="progress-section">
            <h2 className="section-title">Прогресс оплат</h2>
            <div className="progress-list">
              <ProgressBar
                label="Оплачено"
                value={stats.paidPercent}
                color="green"
              />
              <ProgressBar
                label="Не оплачено"
                value={stats.unpaidPercent}
                color="red"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

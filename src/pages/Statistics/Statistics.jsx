import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useStatistics } from "../../hooks/useStatistics";
import { StatCard } from "../../components/StatCard/StatCard";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import "./Statistics.css";

const PIE_COLORS = ["#22c55e", "#ef4444"];

export function Statistics() {
  const { stats, loading, error } = useStatistics();

  const pieData = stats
    ? [
        { name: "Оплачено", value: stats.paidCount },
        { name: "Не оплачено", value: stats.unpaidCount },
      ]
    : [];

  const groupsBarData = stats?.groupsBreakdown || [];

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

          <div className="charts-grid">
            <div className="chart-card">
              <h2 className="section-title">Соотношение оплат</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h2 className="section-title">Ученики по группам</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={groupsBarData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-color)"
                  />
                  <XAxis
                    dataKey="group"
                    tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#5b5bf7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
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

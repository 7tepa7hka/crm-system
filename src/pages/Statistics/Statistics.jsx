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
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Wallet,
  Layers,
} from "lucide-react";
import { useStatistics } from "../../hooks/useStatistics";
import { useLanguage } from "../../context/LanguageContext";
import { StatCard } from "../../components/StatCard/StatCard";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import "./Statistics.css";

const PIE_COLORS = ["#3a8a5c", "#a34747"];

export function Statistics() {
  const { stats, loading, error } = useStatistics();
  const { t } = useLanguage();

  const pieData = stats
    ? [
        { name: t.statistics.paid, value: stats.paidCount },
        { name: t.statistics.unpaid, value: stats.unpaidCount },
      ]
    : [];

  const groupsBarData = stats?.groupsBreakdown || [];

  return (
    <div className="statistics-page">
      <h1 className="page-title">{t.statistics.title}</h1>
      <p className="page-subtitle">{t.statistics.subtitle}</p>

      {loading && <p className="loading-text">{t.common.loading}</p>}
      {error && <p className="error-text">{t.common.error}</p>}

      {!loading && !error && stats && (
        <>
          <div className="stats-grid">
            <StatCard
              icon={GraduationCap}
              label={t.statistics.totalStudents}
              value={stats.totalStudents}
              accent="blue"
            />
            <StatCard
              icon={CheckCircle2}
              label={t.statistics.paidCount}
              value={stats.paidCount}
              accent="green"
            />
            <StatCard
              icon={XCircle}
              label={t.statistics.unpaidCount}
              value={stats.unpaidCount}
              accent="orange"
            />
            <StatCard
              icon={Wallet}
              label={t.statistics.income}
              value={`${stats.income.toLocaleString("ru-RU")} UZS`}
              accent="purple"
            />
            <StatCard
              icon={Layers}
              label={t.statistics.groupsCount}
              value={stats.groupsCount}
              accent="blue"
            />
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <h2 className="section-title">
                {t.statistics.paymentsBreakdown}
              </h2>
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
              <h2 className="section-title">{t.statistics.studentsByGroup}</h2>
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
                  <Bar dataKey="count" fill="#5a6b8c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="progress-section">
            <h2 className="section-title">{t.statistics.progressTitle}</h2>
            <div className="progress-list">
              <ProgressBar
                label={t.statistics.paid}
                value={stats.paidPercent}
                color="green"
              />
              <ProgressBar
                label={t.statistics.unpaid}
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

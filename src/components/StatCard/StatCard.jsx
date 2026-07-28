import "./StatCard.css";

export function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-icon-${accent}`}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

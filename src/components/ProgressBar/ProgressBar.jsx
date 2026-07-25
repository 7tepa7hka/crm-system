import "./ProgressBar.css";

export function ProgressBar({ label, value, color }) {
  return (
    <div className="progress-block">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{value}%</span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill progress-fill-${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

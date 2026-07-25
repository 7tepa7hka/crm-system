import "./TeamCard.css";

export function TeamCard({ emoji, name, role }) {
  return (
    <div className="team-card">
      <div className="team-emoji">{emoji}</div>
      <div className="team-info">
        <span className="team-name">{name}</span>
        <span className="team-role">{role}</span>
      </div>
    </div>
  );
}

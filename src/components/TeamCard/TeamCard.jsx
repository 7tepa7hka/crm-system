import "./TeamCard.css";

export function TeamCard({ Icon, name, role }) {
  return (
    <div className="team-card">
      <div className="team-icon-wrap">
        <Icon size={26} strokeWidth={1.7} />
      </div>
      <div className="team-info">
        <span className="team-name">{name}</span>
        <span className="team-role">{role}</span>
      </div>
    </div>
  );
}

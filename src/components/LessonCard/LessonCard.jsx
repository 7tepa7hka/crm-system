import "./LessonCard.css";

export function LessonCard({ Icon, name, studentsLabel, onClick }) {
  return (
    <button className="lesson-card" onClick={onClick}>
      <div className="lesson-icon">
        <Icon size={26} strokeWidth={1.7} />
      </div>
      <div className="lesson-info">
        <span className="lesson-name">{name}</span>
        <span className="lesson-count">{studentsLabel}</span>
      </div>
    </button>
  );
}

import "./LessonCard.css";

export function LessonCard({ icon, name, studentsCount, onClick }) {
  return (
    <button className="lesson-card" onClick={onClick}>
      <div className="lesson-icon">{icon}</div>
      <div className="lesson-info">
        <span className="lesson-name">{name}</span>
        <span className="lesson-count">{studentsCount} учеников</span>
      </div>
    </button>
  );
}

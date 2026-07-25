import "./Badge.css";

export function Badge({ paid, onClick }) {
  return (
    <button
      type="button"
      className={`badge badge-clickable ${paid ? "badge-success" : "badge-danger"}`}
      onClick={onClick}
      title="Нажми, чтобы изменить статус"
    >
      {paid ? "Оплачено" : "Не оплачено"}
    </button>
  );
}

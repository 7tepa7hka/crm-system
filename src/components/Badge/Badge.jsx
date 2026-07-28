import "./Badge.css";

export function Badge({ paid, onClick, paidLabel, unpaidLabel }) {
  return (
    <button
      type="button"
      className={`badge badge-clickable ${paid ? "badge-success" : "badge-danger"}`}
      onClick={onClick}
    >
      {paid ? paidLabel : unpaidLabel}
    </button>
  );
}

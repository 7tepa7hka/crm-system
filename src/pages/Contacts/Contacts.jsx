import "./Contacts.css";

export function Contacts() {
  return (
    <div className="contacts-page">
      <h1 className="page-title">Contacts</h1>
      <p className="page-subtitle">Связь с руководством</p>

      <div className="contact-card">
        <div className="contact-avatar">👑</div>
        <div className="contact-info">
          <span className="contact-name">Sultan</span>
          <span className="contact-role">Директор школы</span>
          <a
            href="https://t.me/Ksa_038"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            💬 Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

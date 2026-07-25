import { teamMembers } from "../../data/team";
import "./Contacts.css";

export function Contacts() {
  return (
    <div className="contacts-page">
      <h1 className="page-title">Contacts</h1>
      <p className="page-subtitle">
        Свяжитесь с нами или руководством учебного центра
      </p>

      <div className="contacts-main">
        <div className="contact-card contact-card-primary">
          <div className="contact-avatar">👑</div>
          <div className="contact-info">
            <span className="contact-name">Sultan</span>
            <span className="contact-role">Директор школы</span>
            <p className="contact-desc">
              По вопросам сотрудничества, оплаты, расписания и другим важным
              темам — пишите напрямую в Telegram.
            </p>
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

        <div className="contact-info-card">
          <h2 className="contacts-section-title">О центре</h2>
          <p className="contact-desc">
            Sultan CRM System — учебный центр, который помогает ученикам
            осваивать английский, математику, физику, IT, химию и историю с
            профессиональными преподавателями.
          </p>
          <div className="contact-detail-row">
            <span>📍 Адрес</span>
            <span>Ташкент, Узбекистан</span>
          </div>
          <div className="contact-detail-row">
            <span>🕒 Режим работы</span>
            <span>Пн–Сб, 09:00–19:00</span>
          </div>
        </div>
      </div>

      <h2 className="contacts-section-title">Руководство</h2>
      <div className="contacts-team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="contact-team-card">
            <div className="contact-team-emoji">{member.emoji}</div>
            <div>
              <span className="contact-team-name">{member.name}</span>
              <span className="contact-team-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

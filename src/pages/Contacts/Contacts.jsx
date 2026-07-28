import {
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import { teamMembers } from "../../data/team";
import { useLanguage } from "../../context/LanguageContext";
import "./Contacts.css";

export function Contacts() {
  const { t } = useLanguage();
  const director = teamMembers[0];

  const faqs = [
    { q: t.contacts.faq1Q, a: t.contacts.faq1A },
    { q: t.contacts.faq2Q, a: t.contacts.faq2A },
    { q: t.contacts.faq3Q, a: t.contacts.faq3A },
  ];

  return (
    <div className="contacts-page">
      <h1 className="page-title">{t.contacts.title}</h1>
      <p className="page-subtitle">{t.contacts.subtitle}</p>

      <div className="contacts-main">
        <div className="contact-card contact-card-primary">
          <div className="contact-avatar">
            <director.Icon size={34} strokeWidth={1.6} />
          </div>
          <div className="contact-info">
            <span className="contact-name">{director.name}</span>
            <span className="contact-role">{t.contacts.directorRole}</span>
            <p className="contact-desc">{t.contacts.directorDesc}</p>
            <a
              href="https://t.me/Ksa_038"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <MessageCircle size={16} />
              <span>{t.contacts.telegramLink}</span>
            </a>
          </div>
        </div>

        <div className="contact-info-card">
          <h2 className="contacts-section-title">{t.contacts.aboutTitle}</h2>
          <p className="contact-desc">{t.contacts.aboutDesc}</p>
          <div className="contact-detail-row">
            <span className="contact-detail-label">
              <MapPin size={14} />
              {t.contacts.address}
            </span>
            <span>{t.contacts.addressValue}</span>
          </div>
          <div className="contact-detail-row">
            <span className="contact-detail-label">
              <Clock size={14} />
              {t.contacts.hours}
            </span>
            <span>{t.contacts.hoursValue}</span>
          </div>
          <div className="contact-detail-row">
            <span className="contact-detail-label">
              <Mail size={14} />
              {t.contacts.emailLabel}
            </span>
            <span>{t.contacts.emailValue}</span>
          </div>
          <div className="contact-detail-row">
            <span className="contact-detail-label">
              <Phone size={14} />
              {t.contacts.phoneLabel}
            </span>
            <span>{t.contacts.phoneValue}</span>
          </div>
        </div>
      </div>

      <h2 className="contacts-section-title">{t.contacts.managementTitle}</h2>
      <div className="contacts-team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="contact-team-card">
            <div className="contact-team-icon">
              <member.Icon size={24} strokeWidth={1.7} />
            </div>
            <div className="contact-team-text">
              <span className="contact-team-name">{member.name}</span>
              <span className="contact-team-role">
                {t.team[member.roleKey]}
              </span>
              <p className="contact-team-desc">
                {t.team[`${member.roleKey}Desc`]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="contacts-section-title">
        <HelpCircle
          size={18}
          style={{ marginRight: 8, verticalAlign: "middle" }}
        />
        {t.contacts.faqTitle}
      </h2>
      <div className="faq-list">
        {faqs.map((item) => (
          <div key={item.q} className="faq-item">
            <span className="faq-question">{item.q}</span>
            <p className="faq-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

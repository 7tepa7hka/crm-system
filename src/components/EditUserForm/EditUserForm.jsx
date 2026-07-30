import { useState } from "react";
import { groups } from "../../data/groups";
import { useLanguage } from "../../context/LanguageContext";
import "./EditUserForm.css";

export function EditUserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    group: user.group,
  });
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedGroup = groups.find((g) => g.name === form.group);
    if (!selectedGroup) return;

    setSubmitting(true);
    try {
      await onSubmit({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        group: selectedGroup.name,
        subject: selectedGroup.subject,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="edit-firstName">{t.users.firstName}</label>
        <input
          id="edit-firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="edit-lastName">{t.users.lastName}</label>
        <input
          id="edit-lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="edit-phone">{t.users.phone}</label>
        <input
          id="edit-phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="edit-group">{t.users.group}</label>
        <select
          id="edit-group"
          name="group"
          value={form.group}
          onChange={handleChange}
          required
        >
          {groups.map((g) => (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          {t.common.cancel}
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? t.common.saving : t.common.save}
        </button>
      </div>
    </form>
  );
}

import { useState } from "react";
import { groups } from "../../data/groups";
import "./AddUserForm.css";

const initialForm = { firstName: "", lastName: "", phone: "", group: "" };

export function AddUserForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

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
    <form className="add-user-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="firstName">Имя</label>
        <input
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Имя"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="lastName">Фамилия</label>
        <input
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Фамилия"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+998 90 123 45 67"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="group">Группа</label>
        <select
          id="group"
          name="group"
          value={form.group}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Выберите группу
          </option>
          {groups.map((g) => (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Сохранение..." : "Добавить"}
        </button>
      </div>
    </form>
  );
}

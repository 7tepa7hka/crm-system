import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../hooks/useSettings";
import "./Settings.css";

export function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { settings, loading, error, saveSettings } = useSettings();
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (settings) setAdminName(settings.adminName);
  }, [settings]);

  const handleSaveName = async (e) => {
    e.preventDefault();
    if (!adminName.trim()) {
      toast.error("Имя администратора не может быть пустым");
      return;
    }
    setSavingName(true);
    try {
      await saveSettings({ adminName: adminName.trim() });
      toast.success("Имя администратора обновлено");
    } catch {
      toast.error("Не удалось сохранить имя");
    } finally {
      setSavingName(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      toast.error("Пароль должен быть не короче 4 символов");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }
    setSavingPassword(true);
    try {
      await saveSettings({ password: newPassword });
      toast.success("Пароль обновлён");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Не удалось сохранить пароль");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info("Вы вышли из системы");
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Настройки CRM системы</p>

      {loading && <p className="loading-text">Загрузка...</p>}
      {error && <p className="error-text">Ошибка загрузки: {error}</p>}

      {!loading && !error && (
        <div className="settings-grid">
          <div className="settings-card">
            <h2 className="settings-card-title">Тема оформления</h2>
            <p className="settings-card-desc">
              Текущая тема: <strong>{isDark ? "Тёмная" : "Светлая"}</strong>
            </p>
            <button className="btn-secondary" onClick={toggleTheme}>
              {isDark
                ? "🌙 Переключить на светлую"
                : "☀️ Переключить на тёмную"}
            </button>
          </div>

          <div className="settings-card">
            <h2 className="settings-card-title">Имя администратора</h2>
            <form className="settings-form" onSubmit={handleSaveName}>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Имя администратора"
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={savingName}
              >
                {savingName ? "Сохранение..." : "Сохранить"}
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h2 className="settings-card-title">Изменить пароль</h2>
            <form className="settings-form" onSubmit={handleSavePassword}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Новый пароль"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Подтвердите пароль"
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={savingPassword}
              >
                {savingPassword ? "Сохранение..." : "Сохранить"}
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h2 className="settings-card-title">Информация о системе</h2>
            <div className="settings-info-row">
              <span>Версия CRM</span>
              <span className="settings-info-value">{settings.version}</span>
            </div>
            <div className="settings-info-row">
              <span>Администратор</span>
              <span className="settings-info-value">{settings.adminName}</span>
            </div>
          </div>

          <div className="settings-card settings-card-danger">
            <h2 className="settings-card-title">Выход из аккаунта</h2>
            <p className="settings-card-desc">
              Вы выйдете из текущей сессии администратора.
            </p>
            <button className="settings-logout-btn" onClick={handleLogout}>
              🚪 Выйти из аккаунта
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

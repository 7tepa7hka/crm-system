import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useSettings } from "../../hooks/useSettings";
import { languageOptions } from "../../translations";
import "./Settings.css";

export function Settings() {
  const { logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
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
      toast.error(t.settings.nameRequired);
      return;
    }
    setSavingName(true);
    try {
      await saveSettings({ adminName: adminName.trim() });
      toast.success(t.settings.nameUpdated);
    } catch {
      toast.error(t.settings.nameError);
    } finally {
      setSavingName(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      toast.error(t.settings.passwordTooShort);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t.settings.passwordMismatch);
      return;
    }
    setSavingPassword(true);
    try {
      await saveSettings({ password: newPassword });
      toast.success(t.settings.passwordUpdated);
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error(t.settings.passwordError);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info(t.settings.loggedOut);
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">{t.settings.title}</h1>
      <p className="page-subtitle">{t.settings.subtitle}</p>

      {loading && <p className="loading-text">{t.common.loading}</p>}
      {error && <p className="error-text">{t.common.error}</p>}

      {!loading && !error && (
        <div className="settings-grid">
          <div className="settings-card">
            <h2 className="settings-card-title">{t.settings.languageCard}</h2>
            <p className="settings-card-desc">{t.settings.languageDesc}</p>
            <div className="language-options">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  className={`language-option ${lang === option.code ? "language-option-active" : ""}`}
                  onClick={() => setLang(option.code)}
                >
                  <span>{option.label}</span>
                  {lang === option.code && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-card">
            <h2 className="settings-card-title">{t.settings.adminNameCard}</h2>
            <form className="settings-form" onSubmit={handleSaveName}>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder={t.settings.adminNameCard}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={savingName}
              >
                {savingName ? t.common.saving : t.common.save}
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h2 className="settings-card-title">{t.settings.passwordCard}</h2>
            <form className="settings-form" onSubmit={handleSavePassword}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t.settings.newPassword}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.settings.confirmPassword}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={savingPassword}
              >
                {savingPassword ? t.common.saving : t.common.save}
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h2 className="settings-card-title">{t.settings.systemInfoCard}</h2>
            <div className="settings-info-row">
              <span>{t.settings.version}</span>
              <span className="settings-info-value">{settings.version}</span>
            </div>
            <div className="settings-info-row">
              <span>{t.settings.administrator}</span>
              <span className="settings-info-value">{settings.adminName}</span>
            </div>
          </div>

          <div className="settings-card settings-card-danger">
            <h2 className="settings-card-title">{t.settings.logoutCard}</h2>
            <p className="settings-card-desc">{t.settings.logoutDesc}</p>
            <button className="settings-logout-btn" onClick={handleLogout}>
              {t.settings.logoutBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

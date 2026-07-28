import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { getSettings } from "../../services/settingsService";
import logoLight from "../../assets/crm-sultan-light.png";
import logoDark from "../../assets/crm-sultan-dark.png";
import "./Login.css";

const VALID_USERNAME = "admin";

export function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login: authLogin } = useAuth();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const settings = await getSettings();

      if (login === VALID_USERNAME && password === settings.password) {
        authLogin();
        toast.success(t.login.welcome);
        navigate("/");
      } else {
        toast.error(t.login.invalidCredentials);
      }
    } catch {
      toast.error(t.login.connectionError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src={isDark ? logoDark : logoLight}
          alt="Sultan CRM System"
          className="login-logo"
        />
        <h1 className="login-title">{t.login.title}</h1>
        <p className="login-subtitle">{t.login.subtitle}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login">{t.login.loginLabel}</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">{t.login.passwordLabel}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={submitting}>
            {submitting ? t.login.checking : t.login.signIn}
          </button>
        </form>
      </div>
    </div>
  );
}

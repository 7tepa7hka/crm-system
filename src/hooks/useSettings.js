import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/settingsService";

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const saveSettings = async (data) => {
    const updated = await updateSettings(data);
    setSettings((prev) => ({ ...prev, ...updated }));
    return updated;
  };

  return { settings, loading, error, saveSettings };
}

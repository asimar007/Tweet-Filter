import { useState, useEffect, useCallback } from 'react';
import { settingsStorage } from '@/utils/storage';
import { DEFAULT_SETTINGS } from '@/utils/types';
import type { Settings } from '@/utils/types';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({ ...DEFAULT_SETTINGS });

  useEffect(() => {
    settingsStorage.getValue().then((s) => {
      if (s) setSettings(s);
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const saveSettings = async (currentSettings: Settings) => {
    await settingsStorage.setValue(currentSettings);
  };

  return { settings, updateSettings, saveSettings };
}

import { DEFAULT_SETTINGS, DEFAULT_STATS } from './types';
import type { Settings, Stats } from './types';

// ============================================
// Typed chrome.storage wrappers
// ============================================

const isChromeStorageAvailable = () =>
  typeof chrome !== 'undefined' && chrome?.storage != null;

export const settingsStorage = {
  async getValue(): Promise<Settings> {
    if (!isChromeStorageAvailable()) return { ...DEFAULT_SETTINGS };
    return new Promise((resolve) => {
      chrome.storage.sync.get(['settings'], (data: { settings?: Settings }) => {
        resolve(data.settings ?? { ...DEFAULT_SETTINGS });
      });
    });
  },

  async setValue(settings: Settings): Promise<void> {
    if (!isChromeStorageAvailable()) return;
    return new Promise((resolve) => {
      chrome.storage.sync.set({ settings }, resolve);
    });
  },

  watch(callback: (newSettings: Settings | null) => void): void {
    if (!isChromeStorageAvailable()) return;
    chrome.storage.onChanged.addListener((changes: { [key: string]: chrome.storage.StorageChange }, namespace: string) => {
      if (namespace === 'sync' && changes.settings) {
        callback((changes.settings.newValue as Settings) ?? null);
      }
    });
  },
};

export const statsStorage = {
  async getValue(): Promise<Stats> {
    if (!isChromeStorageAvailable()) return { ...DEFAULT_STATS };
    return new Promise((resolve) => {
      chrome.storage.local.get(['stats'], (data: { stats?: Stats }) => {
        resolve(data.stats ?? { ...DEFAULT_STATS });
      });
    });
  },

  async setValue(stats: Stats): Promise<void> {
    if (!isChromeStorageAvailable()) return;
    return new Promise((resolve) => {
      chrome.storage.local.set({ stats }, resolve);
    });
  },

  watch(callback: (newStats: Stats) => void): void {
    if (!isChromeStorageAvailable()) return;
    chrome.storage.onChanged.addListener((changes: { [key: string]: chrome.storage.StorageChange }, namespace: string) => {
      if (namespace === 'local' && changes.stats) {
        callback((changes.stats.newValue as Stats) ?? { ...DEFAULT_STATS });
      }
    });
  },
};

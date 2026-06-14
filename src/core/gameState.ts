import { SAVE_KEY, SETTINGS_KEY, TIME_PHASES, type TimePhase } from './config';

export interface SaveData {
  version: 1;
  player: { x: number; y: number; zone: string };
  visited: string[];
  read: string[];
  unlockedAchievements: string[];
  lastPhase: TimePhase;
  lastSaved: number;
}

export interface Settings {
  volume: number;       // 0-1
  muted: boolean;
  lang: 'es' | 'en';
  fullscreen: boolean;
}

const DEFAULT_SAVE: SaveData = {
  version: 1,
  player: { x: 400, y: 300, zone: 'cuarto' },
  visited: [],
  read: [],
  unlockedAchievements: [],
  lastPhase: 'dia',
  lastSaved: 0,
};

const DEFAULT_SETTINGS: Settings = {
  volume: 0.7,
  muted: false,
  lang: 'es',
  fullscreen: false,
};

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    const parsed = JSON.parse(raw) as SaveData;
    if (parsed.version !== 1) return { ...DEFAULT_SAVE };
    return parsed;
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

export function persistSave(data: SaveData): void {
  try {
    data.lastSaved = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to persist save', e);
  }
}

export function resetSave(): SaveData {
  localStorage.removeItem(SAVE_KEY);
  return { ...DEFAULT_SAVE };
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function persistSettings(s: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch (e) {
    console.warn('Failed to persist settings', e);
  }
}

export function nextPhase(current: TimePhase): TimePhase {
  const i = TIME_PHASES.indexOf(current);
  return TIME_PHASES[(i + 1) % TIME_PHASES.length];
}

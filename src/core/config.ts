/**
 * Global configuration constants.
 */
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
export const TILE_SIZE = 32;
export const PLAYER_SPEED = 180; // pixels per second
export const SAVE_KEY = 'polar-web-save-v1';
export const SETTINGS_KEY = 'polar-web-settings-v1';

export const ZONES = ['cuarto', 'estudio', 'taller', 'sala', 'jardin'] as const;
export type Zone = (typeof ZONES)[number];

/**
 * Time-of-day palette phases. The villa cycles through these.
 * Easter egg: player can hit a hidden clock to force-change.
 */
export const TIME_PHASES = ['dia', 'atardecer', 'noche'] as const;
export type TimePhase = (typeof TIME_PHASES)[number];

export const PHASE_PALETTES: Record<TimePhase, { sky: string; ambient: number }> = {
  dia:       { sky: '#87ceeb', ambient: 1.0 },
  atardecer: { sky: '#ff9a76', ambient: 0.85 },
  noche:     { sky: '#1a1a3e', ambient: 0.55 },
};

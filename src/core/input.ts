/**
 * Keyboard + touch input handler.
 * Wires keyboard events into a queryable state map.
 */
export type KeyCode =
  | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
  | 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD'
  | 'Enter' | 'Escape' | 'Space'
  | 'KeyE' | 'KeyM';

const MOVEMENT_KEYS: ReadonlySet<KeyCode> = new Set([
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
]);

export class InputManager {
  private keys = new Set<KeyCode>();
  private listeners = new Map<KeyCode, Set<() => void>>();

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
  }

  destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    const code = e.code as KeyCode;
    if (MOVEMENT_KEYS.has(code)) e.preventDefault();
    if (this.keys.has(code)) return;
    this.keys.add(code);
    this.listeners.get(code)?.forEach((cb) => cb());
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code as KeyCode);
  };

  private onBlur = (): void => {
    this.keys.clear();
  };

  isDown(code: KeyCode): boolean {
    return this.keys.has(code);
  }

  /** Returns a normalized direction vector. */
  getMoveAxis(): { x: number; y: number } {
    let x = 0;
    let y = 0;
    if (this.isDown('ArrowLeft') || this.isDown('KeyA')) x -= 1;
    if (this.isDown('ArrowRight') || this.isDown('KeyD')) x += 1;
    if (this.isDown('ArrowUp') || this.isDown('KeyW')) y -= 1;
    if (this.isDown('ArrowDown') || this.isDown('KeyS')) y += 1;
    // Normalize diagonals
    const len = Math.hypot(x, y);
    if (len > 0) { x /= len; y /= len; }
    return { x, y };
  }

  onPress(code: KeyCode, cb: () => void): () => void {
    let set = this.listeners.get(code);
    if (!set) { set = new Set(); this.listeners.set(code, set); }
    set.add(cb);
    return () => set!.delete(cb);
  }
}

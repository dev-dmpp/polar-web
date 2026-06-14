import { Application } from 'pixi.js';
import './styles/ui.css';
import { GAME_HEIGHT, GAME_WIDTH } from './core/config';
import { InputManager } from './core/input';
import { loadSave, loadSettings, persistSave, persistSettings } from './core/gameState';
import { VillaScene } from './scenes/villaScene';
import { buildDock } from './ui/floatingUI';
import { buildDialogModal, showModal, showToast } from './ui/modals';
import { NPC_DIALOGS } from './content/dialogs';

async function bootstrap(): Promise<void> {
  const app = new Application();
  await app.init({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: 0x87ceeb,
    antialias: false,
    resolution: Math.min(window.devicePixelRatio, 2),
    autoDensity: true,
  });

  const container = document.getElementById('game-container')!;
  container.appendChild(app.canvas);

  const input = new InputManager();
  const save = loadSave();
  loadSettings();

  const scene = new VillaScene(save);
  app.stage.addChild(scene.container);

  // Restore player position
  scene.restorePlayerPosition(save.player.x, save.player.y);

  // Apply saved phase
  scene.applyPhase(save.lastPhase);

  // UI dock
  const dock = buildDock({
    onDownloadCV: () => downloadCVStub(),
    onSave: () => persistSave(save),
    onSettings: (s) => persistSettings(s),
    onResetSave: () => window.location.reload(),
  });
  document.getElementById('ui-overlay')!.appendChild(dock);

  // Scene events
  scene.on('npcTalk', (id: unknown) => {
    const lines = NPC_DIALOGS[id as string];
    if (lines) showModal(buildDialogModal(lines[0].speaker, lines[0].text));
  });

  // Input: E to interact with nearest interactable
  input.onPress('KeyE', () => {
    // Simple stub: cycle dialogs by id order
    const ids = Object.keys(NPC_DIALOGS);
    const idx = Math.floor(Math.random() * ids.length);
    const id = ids[idx];
    const lines = NPC_DIALOGS[id];
    if (lines) showModal(buildDialogModal(lines[0].speaker, lines[0].text));
  });

  // Resume audio context on first click (autoplay policy)
  window.addEventListener('pointerdown', () => {
    if ((window as any).Howler) (window as any).Howler.ctx?.resume?.();
  }, { once: true });

  // Auto-save every 30s
  setInterval(() => persistSave(save), 30_000);

  // Render loop
  app.ticker.add((ticker: { deltaMS: number }) => {
    const dt = ticker.deltaMS / 1000;
    scene.update(dt, input);
  });

  showToast('Bienvenido a la villa — pulsa [E] para hablar');
}

function downloadCVStub(): void {
  // TODO: bundle a CV PDF in /public and link to it.
  showToast('CV: pendiente de subir (placeholder)');
}

bootstrap().catch((e) => {
  console.error('Bootstrap failed', e);
  const c = document.getElementById('game-container')!;
  c.innerHTML = `<pre style="color:#ff6b6b; padding:20px">Error al iniciar: ${e}</pre>`;
});

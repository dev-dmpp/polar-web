import { showToast } from './modals';
import type { Settings, SaveData } from '../core/gameState';
import { loadSettings, persistSettings, resetSave } from '../core/gameState';

export interface FloatingUIHandlers {
  onDownloadCV: () => void;
  onSave: () => void;
  onSettings: (s: Settings) => void;
  onResetSave: () => void;
}

export function buildDock(
  handlers: FloatingUIHandlers,
): HTMLElement {
  const dock = document.createElement('div');
  dock.className = 'dock';
  const settings = loadSettings();

  const buttons: Array<{ id: string; label: string; title: string; onClick: () => void; primary?: boolean }> = [
    { id: 'cv',       label: '📄', title: 'Descargar CV', onClick: handlers.onDownloadCV, primary: true },
    { id: 'projects', label: '💼', title: 'Proyectos',     onClick: () => import('./modals').then(m => m.showModal(m.buildProjectsModal())) },
    { id: 'about',    label: '👤', title: 'Sobre mí',      onClick: () => import('./modals').then(m => m.showModal(m.buildAboutModal())) },
    { id: 'contact',  label: '✉️', title: 'Contacto',      onClick: () => import('./modals').then(m => m.showModal(m.buildContactModal())) },
    { id: 'settings', label: '⚙️', title: 'Configuración', onClick: () => openSettings(handlers, settings) },
    { id: 'save',     label: '💾', title: 'Guardar partida', onClick: () => { handlers.onSave(); showToast('Partida guardada'); } },
  ];

  for (const b of buttons) {
    const btn = document.createElement('button');
    btn.id = `dock-${b.id}`;
    btn.textContent = b.label;
    btn.title = b.title;
    btn.className = b.primary ? 'primary' : '';
    btn.addEventListener('click', b.onClick);
    dock.appendChild(btn);
  }

  return dock;
}

function openSettings(handlers: FloatingUIHandlers, s: Settings): void {
  import('./modals').then(m => {
    m.showModal(m.buildSettingsModal(
      (v) => { s.volume = v; persistSettings(s); handlers.onSettings(s); },
      () => { s.muted = !s.muted; persistSettings(s); handlers.onSettings(s); },
      () => { s.fullscreen = !s.fullscreen; persistSettings(s); handlers.onSettings(s); toggleFullscreen(); },
      () => { resetSave(); handlers.onResetSave(); m.closeModal(); showToast('Partida reiniciada'); },
      s.volume,
      s.muted,
    ));
  });
}

function toggleFullscreen(): void {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}

// Re-export for convenience (kept silent)
export type { SaveData };

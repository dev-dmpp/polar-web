import { PROFILE, SUMMARY } from '../content/profile';

export interface UIModalApi {
  show(content: HTMLElement): void;
  close(): void;
}

let backdrop: HTMLDivElement | null = null;

export function showModal(content: HTMLElement): void {
  closeModal();
  backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.appendChild(content);
  backdrop.appendChild(modal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.getElementById('ui-overlay')!.appendChild(backdrop);
}

export function closeModal(): void {
  if (backdrop) { backdrop.remove(); backdrop = null; }
}

/* ----------------- Modal content builders ----------------- */

export function buildAboutModal(): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Sobre mí</h2>
    <p><strong>${PROFILE.name}</strong> · ${PROFILE.alias}</p>
    <p>${PROFILE.location}</p>
    <p style="opacity:.7">${PROFILE.tagline}</p>
    <p>${SUMMARY}</p>
    <div class="actions">
      <button id="close">Cerrar</button>
    </div>
  `;
  div.querySelector('#close')!.addEventListener('click', closeModal);
  return div;
}

export function buildContactModal(): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Contacto</h2>
    <div class="row"><span>Email</span><span>${PROFILE.email}</span></div>
    <div class="row"><span>Teléfono</span><span>${PROFILE.phone}</span></div>
    <div class="row"><span>LinkedIn</span><a href="${PROFILE.linkedin}" target="_blank" style="color:#4a90e2">/in/davidmpollardp</a></div>
    <div class="row"><span>GitHub</span><a href="${PROFILE.github}" target="_blank" style="color:#4a90e2">@dev-dmpp</a></div>
    <div class="actions">
      <button id="close">Cerrar</button>
    </div>
  `;
  div.querySelector('#close')!.addEventListener('click', closeModal);
  return div;
}

export function buildProjectsModal(): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Proyectos</h2>
    <p style="opacity:.7">Repos destacados — más en construcción.</p>
    <div class="row">
      <span><strong>PolarTranslate</strong></span>
      <a href="https://github.com/dev-dmpp/PolarTranslate" target="_blank" style="color:#4a90e2">Ver repo →</a>
    </div>
    <div class="row">
      <span><strong>ZPlage</strong></span>
      <a href="https://github.com/Polar1920/ZPlage" target="_blank" style="color:#4a90e2">Ver repo →</a>
    </div>
    <div class="actions">
      <button id="close">Cerrar</button>
    </div>
  `;
  div.querySelector('#close')!.addEventListener('click', closeModal);
  return div;
}

export function buildSettingsModal(
  onVolume: (v: number) => void,
  onMuteToggle: () => void,
  onFullscreen: () => void,
  onResetSave: () => void,
  currentVolume: number,
  muted: boolean,
): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Configuración</h2>
    <div class="vol-row">
      <span>🔊 Volumen</span>
      <input type="range" id="vol" min="0" max="100" value="${Math.round(currentVolume * 100)}" />
      <span id="volVal">${Math.round(currentVolume * 100)}%</span>
    </div>
    <div class="row">
      <span>Silenciar</span>
      <button id="mute" style="padding:4px 10px">${muted ? '🔇 Activar' : '🔊 Silenciar'}</button>
    </div>
    <div class="row">
      <span>Pantalla completa</span>
      <button id="fs" style="padding:4px 10px">⛶ Activar</button>
    </div>
    <div class="row">
      <span>Borrar partida guardada</span>
      <button id="reset" style="padding:4px 10px; background:#aa3344">⚠ Reset</button>
    </div>
    <p style="opacity:.6; font-size:12px; margin-top:16px">Hecho con PixiJS + Vite · MIT License</p>
    <div class="actions">
      <button id="close">Cerrar</button>
    </div>
  `;
  const vol = div.querySelector<HTMLInputElement>('#vol')!;
  const volVal = div.querySelector('#volVal')!;
  vol.addEventListener('input', () => {
    const v = Number(vol.value) / 100;
    volVal.textContent = `${vol.value}%`;
    onVolume(v);
  });
  div.querySelector('#mute')!.addEventListener('click', () => onMuteToggle());
  div.querySelector('#fs')!.addEventListener('click', () => onFullscreen());
  div.querySelector('#reset')!.addEventListener('click', () => {
    if (confirm('¿Borrar la partida guardada? Volverás al inicio.')) onResetSave();
  });
  div.querySelector('#close')!.addEventListener('click', closeModal);
  return div;
}

export function buildDialogModal(speaker: string, text: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>${speaker}</h2>
    <p>${text}</p>
    <div class="actions">
      <button id="close">Adelante</button>
    </div>
  `;
  div.querySelector('#close')!.addEventListener('click', closeModal);
  return div;
}

export function showToast(msg: string): void {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.getElementById('ui-overlay')!.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

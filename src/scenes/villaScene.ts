import { Container, Graphics, Text } from 'pixi.js';
import { PHASE_PALETTES, TILE_SIZE, type TimePhase, type Zone } from '../core/config';
import { Player } from '../entities/player';
import type { InputManager } from '../core/input';
import type { SaveData } from '../core/gameState';
import { EXPERIENCES } from '../content/profile';

/**
 * The villa scene. Renders the current zone's tile map, the player,
 * zone-specific decorations, and the time-of-day lighting overlay.
 */
export class VillaScene {
  readonly container: Container;
  private bgLayer = new Container();
  private decoLayer = new Container();
  private interactableLayer = new Container();
  private overlay = new Graphics();
  private clock = new Graphics();
  private player: Player;
  private currentZone: Zone = 'cuarto';
  private save: SaveData;

  constructor(save: SaveData) {
    this.save = save;
    this.currentZone = save.player.zone as Zone;
    this.container = new Container();
    this.player = new Player();
    this.container.addChild(this.bgLayer, this.decoLayer, this.interactableLayer, this.player.container, this.overlay, this.clock);
    this.buildZone(this.currentZone);
  }

  private buildZone(zone: Zone): void {
    this.bgLayer.removeChildren();
    this.decoLayer.removeChildren();
    this.interactableLayer.removeChildren();

    const w = 25 * TILE_SIZE;
    const h = 18 * TILE_SIZE;

    // Floor
    const floor = new Graphics();
    floor.rect(0, 0, w, h);
    floor.fill(this.floorColor(zone));
    this.bgLayer.addChild(floor);

    // Walls (simple border)
    const wall = new Graphics();
    wall.rect(0, 0, w, h).stroke({ color: 0x333333, width: 4 });
    this.bgLayer.addChild(wall);

    // Zone-specific decorations
    switch (zone) {
      case 'cuarto':   this.buildCuarto(); break;
      case 'estudio':  this.buildEstudio(); break;
      case 'taller':   this.buildTaller(); break;
      case 'sala':     this.buildSala(); break;
      case 'jardin':   this.buildJardin(); break;
    }

    // Hidden clock (easter egg) — top-right corner, barely visible
    this.clock.removeChildren();
    this.clock.circle(w - 40, 40, 14).fill(0xffffff).stroke({ color: 0x000000, width: 1 });
    this.clock.circle(w - 40, 40, 2).fill(0x000000);
    // Hour hand
    this.clock.moveTo(w - 40, 40);
    this.clock.lineTo(w - 40, 30);
    this.clock.stroke({ color: 0x000000, width: 2 });
    this.clock.eventMode = 'static';
    this.clock.cursor = 'pointer';
    this.clock.on('pointertap', () => this.emit('togglePhase'));
  }

  private floorColor(zone: Zone): number {
    switch (zone) {
      case 'cuarto':   return 0x4a3a2a;
      case 'estudio':  return 0x2a3a4a;
      case 'taller':   return 0x3a2a2a;
      case 'sala':     return 0x3a4a2a;
      case 'jardin':   return 0x2a4a3a;
    }
  }

  private label(x: number, y: number, text: string, color = 0xffffff): Text {
    const t = new Text({
      text,
      style: { fill: color, fontSize: 14, fontFamily: 'monospace', fontWeight: '600' },
    });
    t.x = x;
    t.y = y;
    return t;
  }

  private buildCuarto(): void {
    // Bed (top-left)
    const bed = new Graphics();
    bed.roundRect(2 * TILE_SIZE, 2 * TILE_SIZE, 6 * TILE_SIZE, 4 * TILE_SIZE, 4).fill(0x6a4a8a);
    bed.roundRect(2 * TILE_SIZE + 8, 2 * TILE_SIZE + 8, 6 * TILE_SIZE - 16, 12).fill(0xffffff);
    this.decoLayer.addChild(bed);

    // Desk + PC (right side) — links to GitHub
    const desk = new Graphics();
    desk.rect(17 * TILE_SIZE, 6 * TILE_SIZE, 6 * TILE_SIZE, 2 * TILE_SIZE).fill(0x5a3a1a);
    this.decoLayer.addChild(desk);
    const monitor = new Graphics();
    monitor.roundRect(18 * TILE_SIZE, 3 * TILE_SIZE, 4 * TILE_SIZE, 3 * TILE_SIZE, 2).fill(0x111111).stroke({ color: 0x4a90e2, width: 2 });
    this.decoLayer.addChild(monitor);
    this.decoLayer.addChild(this.label(18 * TILE_SIZE, 3 * TILE_SIZE + 4, 'github.com/dev-dmpp', 0x4a90e2));

    this.decoLayer.addChild(this.label(2 * TILE_SIZE, 16 * TILE_SIZE, 'Mi Cuarto — pulsa [E] en objetos', 0xffff99));
  }

  private buildEstudio(): void {
    // About-me wall
    const wall = new Graphics();
    wall.rect(2 * TILE_SIZE, 2 * TILE_SIZE, 12 * TILE_SIZE, 8 * TILE_SIZE).fill(0xeeeeee);
    this.decoLayer.addChild(wall);
    this.decoLayer.addChild(this.label(3 * TILE_SIZE, 3 * TILE_SIZE, 'Sobre mí', 0x111111));
    this.decoLayer.addChild(this.label(3 * TILE_SIZE, 4 * TILE_SIZE, 'David M. Pollard P.', 0x111111));
    this.decoLayer.addChild(this.label(3 * TILE_SIZE, 4.7 * TILE_SIZE, '"Polar"', 0x4a90e2));
    this.decoLayer.addChild(this.label(3 * TILE_SIZE, 5.4 * TILE_SIZE, 'Meta Tech Provider', 0x6a4a8a));
    this.decoLayer.addChild(this.label(3 * TILE_SIZE, 6.1 * TILE_SIZE, 'MS AI Cloud Partner', 0x6a4a8a));

    // WOHTS banner
    const banner = new Graphics();
    banner.roundRect(15 * TILE_SIZE, 3 * TILE_SIZE, 8 * TILE_SIZE, 3 * TILE_SIZE, 4).fill(0x4a90e2);
    this.decoLayer.addChild(banner);
    this.decoLayer.addChild(this.label(15.5 * TILE_SIZE, 4 * TILE_SIZE, 'WOHTS — Conversari', 0xffffff));
  }

  private buildTaller(): void {
    // Experience boards on wall
    EXPERIENCES.forEach((exp, i) => {
      const board = new Graphics();
      board.roundRect(2 * TILE_SIZE, (2 + i * 4) * TILE_SIZE, 11 * TILE_SIZE, 3 * TILE_SIZE, 4).fill(0xf5f0e1).stroke({ color: 0x8a6a3a, width: 2 });
      this.decoLayer.addChild(board);
      this.decoLayer.addChild(this.label(2.5 * TILE_SIZE, (2.3 + i * 4) * TILE_SIZE, exp.role, 0x222222));
      this.decoLayer.addChild(this.label(2.5 * TILE_SIZE, (2.9 + i * 4) * TILE_SIZE, `${exp.company} · ${exp.period}`, 0x666666));
    });

    // Tools rack
    const tools = new Graphics();
    tools.rect(15 * TILE_SIZE, 3 * TILE_SIZE, 8 * TILE_SIZE, 12 * TILE_SIZE).fill(0x2a1a1a);
    this.decoLayer.addChild(tools);
    this.decoLayer.addChild(this.label(15.5 * TILE_SIZE, 4 * TILE_SIZE, 'Stack:', 0xffffff));
    ['C#', 'Go', 'Python', 'Node', 'Java', 'PHP', 'k3s', 'Docker'].forEach((t, i) => {
      this.decoLayer.addChild(this.label(15.5 * TILE_SIZE, (4.7 + i * 1.1) * TILE_SIZE, `· ${t}`, 0x4a90e2));
    });
  }

  private buildSala(): void {
    // Sofá
    const sofa = new Graphics();
    sofa.roundRect(3 * TILE_SIZE, 6 * TILE_SIZE, 8 * TILE_SIZE, 3 * TILE_SIZE, 6).fill(0x8a4a4a);
    this.decoLayer.addChild(sofa);
    // TV
    const tv = new Graphics();
    tv.roundRect(15 * TILE_SIZE, 4 * TILE_SIZE, 7 * TILE_SIZE, 5 * TILE_SIZE, 2).fill(0x111111);
    this.decoLayer.addChild(tv);
    this.decoLayer.addChild(this.label(16 * TILE_SIZE, 6 * TILE_SIZE, 'Trailers / Demos', 0x4a90e2));
  }

  private buildJardin(): void {
    // Trees
    [4, 12, 20].forEach((tx) => {
      const tree = new Graphics();
      tree.circle(tx * TILE_SIZE, 4 * TILE_SIZE, 28).fill(0x2a8a3a);
      tree.rect(tx * TILE_SIZE - 4, 4 * TILE_SIZE, 8, 30).fill(0x5a3a1a);
      this.decoLayer.addChild(tree);
    });
    // NPC placeholder
    const npc = new Graphics();
    npc.roundRect(12 * TILE_SIZE, 12 * TILE_SIZE, TILE_SIZE - 6, TILE_SIZE - 6, 4).fill(0xffaa44);
    npc.eventMode = 'static';
    npc.cursor = 'pointer';
    npc.on('pointertap', () => this.emit('npcTalk', 'hobbies'));
    this.decoLayer.addChild(npc);
    this.decoLayer.addChild(this.label(12 * TILE_SIZE, 13 * TILE_SIZE, '?', 0x000000));
  }

  setZone(zone: Zone): void {
    if (this.currentZone === zone) return;
    this.currentZone = zone;
    this.save.player.zone = zone;
    if (!this.save.visited.includes(zone)) this.save.visited.push(zone);
    this.buildZone(zone);
  }

  applyPhase(phase: TimePhase): void {
    const palette = PHASE_PALETTES[phase];
    this.overlay.clear();
    this.overlay.rect(0, 0, 25 * TILE_SIZE, 18 * TILE_SIZE).fill({ color: 0x000000, alpha: 1 - palette.ambient });
    this.save.lastPhase = phase;
  }

  update(dt: number, input: InputManager): void {
    this.player.update(dt, input);
    // Center camera-ish: keep player around (640, 360) of a 1280x720 viewport
    // For now we just position player absolutely; future: smooth camera follow.
  }

  setPosition(x: number, y: number): void {
    this.container.x = x;
    this.container.y = y;
  }

  restorePlayerPosition(x: number, y: number): void {
    this.player.setPosition(x, y);
  }

  get currentZoneName(): Zone { return this.currentZone; }
  get playerPosition(): { x: number; y: number } { return this.player.position; }

  // Minimal event bus
  private handlers: Record<string, ((...args: unknown[]) => void)[]> = {};
  on(event: string, cb: (...args: unknown[]) => void): void {
    (this.handlers[event] ||= []).push(cb);
  }
  private emit(event: string, ...args: unknown[]): void {
    (this.handlers[event] || []).forEach((cb) => cb(...args));
  }
}

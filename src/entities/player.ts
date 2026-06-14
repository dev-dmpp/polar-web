import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import { PLAYER_SPEED, TILE_SIZE } from '../core/config';
import type { InputManager } from '../core/input';

export class Player {
  readonly container: Container;
  private body: Graphics;
  private facing: 'down' | 'up' | 'left' | 'right' = 'down';
  private speed = PLAYER_SPEED;
  private bounds = { width: 25 * TILE_SIZE, height: 18 * TILE_SIZE };
  private texture: Texture | null;

  constructor(texture: Texture | null = null) {
    this.texture = texture;
    this.container = new Container();
    this.body = new Graphics();
    this.drawBody();
    this.container.addChild(this.body);
  }

  private drawBody(): void {
    this.body.clear();
    if (this.texture && this.texture.source) {
      this.body.rect(0, 0, TILE_SIZE - 6, TILE_SIZE - 6);
      this.body.fill({ color: 0xffffff, alpha: 0 });
      const sprite = new Sprite(this.texture);
      sprite.width = TILE_SIZE - 6;
      sprite.height = TILE_SIZE - 6;
      this.body.removeChildren();
      this.body.addChild(sprite);
    } else {
      // Placeholder pixel character: simple capsule with directional accent
      this.body.roundRect(0, 0, TILE_SIZE - 6, TILE_SIZE - 6, 4);
      this.body.fill(0x4a90e2);
      // "eye" position by facing
      const eye = new Graphics();
      switch (this.facing) {
        case 'down':  eye.rect(10, 14, 3, 3).fill(0xffffff); eye.rect(19, 14, 3, 3).fill(0xffffff); break;
        case 'up':    eye.rect(10, 8, 3, 3).fill(0xffffff); eye.rect(19, 8, 3, 3).fill(0xffffff); break;
        case 'left':  eye.rect(7, 14, 3, 3).fill(0xffffff); eye.rect(16, 14, 3, 3).fill(0xffffff); break;
        case 'right': eye.rect(13, 14, 3, 3).fill(0xffffff); eye.rect(22, 14, 3, 3).fill(0xffffff); break;
      }
      this.body.addChild(eye);
    }
  }

  setPosition(x: number, y: number): void {
    this.container.x = x;
    this.container.y = y;
  }

  update(dt: number, input: InputManager): void {
    const axis = input.getMoveAxis();
    if (axis.x === 0 && axis.y === 0) return;

    const dx = axis.x * this.speed * dt;
    const dy = axis.y * this.speed * dt;
    this.container.x = Math.max(0, Math.min(this.bounds.width - (TILE_SIZE - 6), this.container.x + dx));
    this.container.y = Math.max(0, Math.min(this.bounds.height - (TILE_SIZE - 6), this.container.y + dy));

    // Update facing
    if (Math.abs(axis.x) > Math.abs(axis.y)) {
      this.facing = axis.x < 0 ? 'left' : 'right';
    } else if (axis.y !== 0) {
      this.facing = axis.y < 0 ? 'up' : 'down';
    }
    this.drawBody();
  }

  get position(): { x: number; y: number } {
    return { x: this.container.x, y: this.container.y };
  }
}

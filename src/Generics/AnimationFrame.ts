import type { Callback } from "Types/Generics";

export class AnimationFrame {
  private frame: ReturnType<typeof requestAnimationFrame> | null = null;

  public execute(callback: Callback) {
    this.frame = requestAnimationFrame(() => {
      callback();
      this.clear();
    });
  }

  public clear() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }
}

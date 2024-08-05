import type { Callback } from "Types/Generics";

export class Timeout {
  timer: ReturnType<typeof setTimeout> | null = null;

  public execute(callback: Callback, delay: number = 0) {
    this.clear();
    this.timer = setTimeout(() => {
      callback();
    }, delay);
  }

  public clear() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

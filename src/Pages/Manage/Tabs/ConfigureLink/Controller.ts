import type { Callback } from "Types/Generics";

export class Controller {
  private setWidth: Callback<[string]>;
  private node: HTMLDivElement | null = null;
  constructor(setWidth: Callback<[string]>) {
    this.setWidth = setWidth;
  }

  public register = (node: HTMLDivElement) => {
    this.node = node;
  };

  public activeSubRoute(pathname: string) {
    if (pathname.endsWith("configure/living-spaces")) {
      return "Living Spaces";
    }
    if (pathname.endsWith("configure/amenities")) {
      return "Amenities";
    }
  }

  public resize() {
    if (!this.node) {
      return;
    }
    this.setWidth(`${this.node.getBoundingClientRect().width + 16 * 2.5}px`);
  }
}

export class Controller {
  public static getFill(width: number, length: number) {
    if (width < 670 && length < 2) {
      return 2 - (length % 2);
    }
    if (width < 1200 && length < 3) {
      return 3 - (length % 3);
    }
    if (width < 1400 && length < 4) {
      return 4 - (length % 4);
    }
    if (width < 1550 && length < 5) {
      return 5 - (length % 5);
    }
    if (width > 1550 && length < 6) {
      return 6 - (length % 6);
    }
    return 0;
  }

  public static fillGrid(width: number, length: number) {
    const N = this.getFill(width, length);
    return Array.from({ length: N }, () => "");
  }
}

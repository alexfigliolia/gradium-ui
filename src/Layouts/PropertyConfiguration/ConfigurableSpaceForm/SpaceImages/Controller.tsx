export class Controller {
  public static getFill(width: number, length: number) {
    if (width < 670 && length < 2) {
      return 2 - length;
    }
    if (width > 670 && width < 1400 && length < 3) {
      return 3 - (length % 3);
    }
    if (width > 1400 && length < 6) {
      return 6 - (length % 6);
    }
    return 0;
  }

  public static fillGrid(width: number, length: number) {
    const N = this.getFill(width, length);
    return Array.from({ length: N }, () => "");
  }
}

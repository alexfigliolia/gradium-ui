export class Colors {
  public static alphaHex(color: string, alpha: number) {
    if (!color.startsWith("#") || color.length !== 7) {
      throw new Error("Invalid 6 digit hex color");
    }
    const hex = color.replace("#", "");
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${hex}${alphaHex}`;
  }
}

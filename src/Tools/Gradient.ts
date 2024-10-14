export class Gradient {
  steps: number;
  color1: string;
  color2: string;
  constructor(color1: string, color2: string, steps: number) {
    this.steps = steps;
    this.color1 = color1;
    this.color2 = color2;
  }

  public generate() {
    const result: string[] = [];
    const colorA = this.hexToRGB(this.color1);
    const colorB = this.hexToRGB(this.color2);
    const rStep = this.nextStep(colorA[0], colorB[0]);
    const gStep = this.nextStep(colorA[1], colorB[1]);
    const bStep = this.nextStep(colorA[2], colorB[2]);
    result.push("#" + this.RGBToHex(colorA));
    let redValue = colorA[0];
    let greenValue = colorA[1];
    let blueValue = colorA[2];
    for (let i = 0; i < this.steps - 1; i++) {
      redValue =
        colorA[0] < colorB[0]
          ? redValue + Math.round(rStep)
          : redValue - Math.round(rStep);
      greenValue =
        colorA[1] < colorB[1]
          ? greenValue + Math.round(gStep)
          : greenValue - Math.round(gStep);
      blueValue =
        colorA[2] < colorB[2]
          ? blueValue + Math.round(bStep)
          : blueValue - Math.round(bStep);
      result.push("#" + this.RGBToHex([redValue, greenValue, blueValue]));
    }
    result.push("#" + this.RGBToHex(colorB));
    return result;
  }

  private hexToRGB(hex: string): RGBTuple {
    if (hex.startsWith("rgb(")) {
      const [r, g, b] = hex
        .replace(/rgb\(|\)|\s/g, "")
        .split(/,| /)
        .map(v => parseInt(v));
      return [r, g, b];
    }
    hex = hex.replace("#", "");
    if (hex.length !== 3 && hex.length !== 6) {
      return [255, 255, 255];
    }
    if (hex.length == 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16),
    ];
  }

  private RGBToHex(color: [r: number, g: number, b: number]) {
    color[0] = color[0] > 255 ? 255 : color[0] < 0 ? 0 : color[0];
    color[1] = color[1] > 255 ? 255 : color[1] < 0 ? 0 : color[1];
    color[2] = color[2] > 255 ? 255 : color[2] < 0 ? 0 : color[2];
    return (
      this.padZeros(color[0].toString(16), 2) +
      this.padZeros(color[1].toString(16), 2) +
      this.padZeros(color[2].toString(16), 2)
    );
  }

  private padZeros(token: string, width: number) {
    width -= token.toString().length;
    if (width > 0) {
      const padding = /\./.test(token) ? 2 : 1;
      return `${new Array(width + padding).join("0")}${token}`;
    }
    return token;
  }

  private nextStep(colorA: number, colorB: number) {
    return (Math.max(colorA, colorB) - Math.min(colorA, colorB)) / this.steps;
  }
}

export type RGBTuple = [r: number, g: number, b: number];

import CSSVars from "Styles/Exports.module.scss";
import type { Callback } from "Types/Generics";

export class Progress {
  public static readonly LOW_GRADIENT = [
    CSSVars.progressLowLight,
    CSSVars.progressLowDark,
  ];
  public static readonly MID_GRADIENT = [
    CSSVars.progressMidLight,
    CSSVars.progressMidDark,
  ];
  public static readonly HIGH_GRADIENT = [
    CSSVars.progressHighLight,
    CSSVars.progressHighDark,
  ];

  public static mapGradients<T>(
    callback: Callback<[name: string, colors: string[]], T>,
  ) {
    return [
      callback("lowProgressGradient", this.LOW_GRADIENT),
      callback("midProgressGradient", this.MID_GRADIENT),
      callback("highProgressGradient", this.HIGH_GRADIENT),
    ];
  }

  public static getGradientID(progress: number) {
    if (progress < 40) {
      return "url(#lowProgressGradient)";
    }
    if (progress < 75) {
      return "url(#midProgressGradient)";
    }
    return "url(#highProgressGradient)";
  }

  public static getClassName(progress: number) {
    if (progress < 40) {
      return "low-progress";
    }
    if (progress < 75) {
      return "mid-progress";
    }
    return "high-progress";
  }

  public static getGradient(progress: number) {
    if (progress < 40) {
      return this.LOW_GRADIENT;
    }
    if (progress < 75) {
      return this.MID_GRADIENT;
    }
    return this.HIGH_GRADIENT;
  }
}

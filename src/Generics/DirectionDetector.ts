import type { Callback } from "Types/Generics";

type DValue = "negative" | "positive";

export class DirectionDetector {
  N: number;
  private positiveSum = 0;
  private negativeSum = 0;
  private positive: number[] = [];
  private negative: number[] = [];
  constructor(N: number = 3) {
    this.N = N;
  }

  public add(value: number, callback: Callback<[number]>) {
    if (value >= 0) {
      this.positive.push(value);
      this.positiveSum += value;
      this.detect("positive", callback);
    } else {
      this.negative.push(value);
      this.negativeSum += value;
      this.detect("negative", callback);
    }
  }

  public detect(type: DValue, callback: Callback<[number]>) {
    if (this[type].length === this.N) {
      const op = type === "negative" ? "positive" : "negative";
      this[op] = [];
      this[`${op}Sum`] = 0;
      callback(this[`${type}Sum`]);
      this[type] = [];
      this[`${type}Sum`] = 0;
    }
  }
}

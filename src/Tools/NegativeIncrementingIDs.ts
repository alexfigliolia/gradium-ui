export class NegativeIncrementIDs {
  private incrementor = 0;
  public get() {
    return --this.incrementor;
  }

  public last() {
    return this.incrementor;
  }

  public reset() {
    this.incrementor = 1;
  }
}

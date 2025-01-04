export class DataLoader<T> {
  public fired = false;
  private _result!: Promise<T>;
  private readonly executor: () => Promise<T>;
  constructor(executor: () => Promise<T>) {
    this.executor = executor;
  }

  public get() {
    if (!this.fired) {
      this.fired = true;
      this._result = this.executor();
    }
    return this._result;
  }

  public populate(data: T) {
    this.fired = true;
    this._result = Promise.resolve(data);
  }

  public reset() {
    this.fired = false;
    // @ts-ignore;
    this._result = undefined;
  }
}

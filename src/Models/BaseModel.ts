import { State } from "@figliolia/galena";

export class BaseModel<T> extends State<T> {
  private static readonly instances = new Map<string, State<any>>();
  constructor(...args: ConstructorParameters<typeof State<T>>) {
    super(...args);
    const [name] = args;
    BaseModel.instances.set(name, this);
    this.applyDefaultMiddleware();
  }

  private applyDefaultMiddleware() {
    // if (import.meta.env.DEV) {
    //   this.registerMiddleware(new Logger(), new Profiler());
    // }
  }

  public static resetAll() {
    for (const [_, state] of this.instances) {
      state.reset();
    }
  }
}

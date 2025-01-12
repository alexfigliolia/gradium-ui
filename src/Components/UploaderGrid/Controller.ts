import { AutoIncrementingID } from "@figliolia/event-emitter";

export class Controller {
  private readonly IDs = new AutoIncrementingID();
  private readonly mutations = new Map<string, number>();

  public ID() {
    return this.IDs.get();
  }

  public cache(index: number) {
    const ID = this.IDs.get();
    this.mutations.set(ID, index);
    return ID;
  }

  public get(ID: string) {
    return this.mutations.get(ID) ?? 0;
  }

  public delete(ID: string) {
    return this.mutations.delete(ID);
  }

  public decrementAll(removedIndex: number) {
    for (const [key, index] of this.mutations) {
      if (removedIndex < index) {
        this.mutations.set(key, index - 1);
      }
    }
  }
}

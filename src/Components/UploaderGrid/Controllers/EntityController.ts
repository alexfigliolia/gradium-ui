import type { TimedPromise } from "@figliolia/promises";
import type { GradiumImage } from "GraphQL/Types";
import type { EntityState } from "../types";
import { InstanceTracker } from "./InstanceTracker";

export abstract class EntityController<
  T extends Omit<GradiumImage, "__typename"> = GradiumImage,
> extends InstanceTracker {
  public initialize(files: T[]) {
    return files.map(file => ({ savedDocument: file }));
  }

  public resetFromFiles(files: T[]) {
    return {
      uploading: [],
      initialFiles: this.initialize(files),
    };
  }

  public spliceFile<K extends keyof EntityState<T>>(
    ps: EntityState<T>,
    file: T,
    key: K,
  ) {
    return {
      ...ps,
      [key]: ps[key].filter((img, i) => {
        if (img.savedDocument?.id !== file.id) {
          return true;
        }
        if (key === "uploading") {
          this.decrementAll(i);
        }
        return false;
      }),
    };
  }

  public markErrorAtIndex(
    ps: EntityState<T>,
    index: number,
    key: keyof EntityState,
    error = true,
  ) {
    return {
      ...ps,
      [key]: ps[key].map((state, i) =>
        i === index ? { ...state, loading: false, error } : state,
      ),
    };
  }

  public markLoadingAtIndex(
    ps: EntityState<T>,
    index: number,
    key: keyof EntityState<T>,
  ) {
    return {
      ...ps,
      [key]: ps[key].map((state, i) =>
        i === index ? { ...state, loading: true } : state,
      ),
    };
  }

  public getMinUploaders(totalLength: number, min?: number) {
    let length = 0;
    if (min === undefined) {
      length = 1;
    } else {
      length = totalLength % min === 0 ? min : Math.max(1, min - totalLength);
    }
    return new Array(length).fill(null);
  }

  public abstract TimedDeletion(
    file: T,
    entityId: number,
    ...rest: any[]
  ): TimedPromise<T | undefined>;
}

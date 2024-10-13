export class RenderableMap<T, K> extends Map<T, K> {
  public map<R>(callback: (item: K, index: number) => R) {
    const result: R[] = [];
    let pointer = 0;
    for (const [_, item] of this) {
      result.push(callback(item, pointer++));
    }
    return result;
  }

  public mapReverse<R>(callback: (item: K, index: number) => R) {
    const result: R[] = [];
    let pointer = 0;
    for (const [_, item] of this) {
      result.push(callback(item, pointer++));
    }
    return result.reverse();
  }
}

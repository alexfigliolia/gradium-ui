export class EnhancedSet<T> extends Set<T> {
  public map<U>(callback: (item: T, index: number, set: Set<T>) => U) {
    const result: U[] = [];
    let pointer = -1;
    for (const item of this) {
      result.push(callback(item, ++pointer, this));
    }
    return result;
  }

  public toJSON() {
    return Array.from(this);
  }

  public static toNumericSet(set: Set<string>) {
    if (set instanceof EnhancedSet) {
      return new EnhancedSet(set.map(i => parseInt(i)));
    }
    return new EnhancedSet([...set].map(i => parseInt(i)));
  }

  public static toStringSet(set: Set<number>) {
    if (set instanceof EnhancedSet) {
      return new EnhancedSet<string>(set.map(i => i.toString()));
    }
    return new EnhancedSet<string>([...set].map(i => i.toString()));
  }
}

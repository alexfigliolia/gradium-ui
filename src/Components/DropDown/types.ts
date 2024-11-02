export type DDValue<M extends boolean | undefined = undefined> = M extends true
  ? Set<string>
  : string;

import type { ManualChunkMeta } from "rollup";

export class CodeSplits {
  public NODE_MODULES = new Set();
  public START_UP_MODULES: Set<string>;
  constructor(START_UP_MODULES: Set<string>) {
    this.START_UP_MODULES = START_UP_MODULES;
  }

  public generate(id: string, _meta: ManualChunkMeta) {
    if (this.START_UP_MODULES.has(id)) {
      return "main";
    }
    return null;
  }

  // private cacheVendor(id: string) {
  //   if (this.NODE_MODULES.has(id)) {
  //     return true;
  //   }
  //   if (id.includes("node_modules")) {
  //     this.NODE_MODULES.add(id);
  //     return true;
  //   }
  //   return false;
  // }
}

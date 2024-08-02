import type { ManualChunkMeta, ModuleInfo } from "rollup";

export class GraphGenerator {
  public static GRAPH = new Map<string, Set<string>>();
  public static ENTRY_POINT =
    "/Users/alexfigliolia/DEV/gradium/public/index.html";

  public static generate(id: string, meta: ManualChunkMeta) {
    this.graphModule(id, meta.getModuleInfo(id));
  }

  public static traceStartupModules(
    entrypoint = this.ENTRY_POINT,
    leaves = this.GRAPH.get(entrypoint) || new Set<string>(),
  ) {
    for (const child of leaves) {
      const subtrees = this.traceStartupModules(child);
      for (const node of subtrees) {
        leaves.add(node);
      }
    }
    return leaves;
  }

  private static graphModule(id: string, info: ModuleInfo | null) {
    if (!info) {
      return;
    }
    const { importers, importedIds } = info;
    for (const importer of importers) {
      const children = this.GRAPH.get(importer) || new Set();
      children.add(id);
      this.GRAPH.set(importer, children);
    }
    const children = this.GRAPH.get(id) || new Set();
    for (const importedId of importedIds) {
      children.add(importedId);
    }
    this.GRAPH.set(id, children);
  }

  protected static toJSON() {
    const graph: Record<string, string[]> = {};
    for (const [id, children] of this.GRAPH) {
      graph[id] = Array.from(children);
    }
    return graph;
  }
}

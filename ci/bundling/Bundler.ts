import { build } from "vite";
import viteCompression from "vite-plugin-compression";
import { ChildProcess } from "@figliolia/child-process";
import Config from "../../vite.config";
import { CodeSplits } from "./CodeSplits";
import { GraphGenerator } from "./GraphGenerator";

export class Bundler {
  public static async run() {
    this.buildGraph();
    await this.bundle(false);
    await new ChildProcess("rm -rf build").handler;
    this.applyCompression();
    this.generateCodeSplits();
    await this.bundle();
  }

  private static async bundle(log = true) {
    try {
      await new ChildProcess("tsc -b").handler;
      await build({ ...Config, logLevel: log ? "info" : "silent" });
    } catch (e) {
      console.log("Bundle Error:", e);
    }
  }

  private static buildGraph() {
    Config.build!.rollupOptions = {
      output: {
        manualChunks: (...args) => GraphGenerator.generate(...args),
      },
    };
  }

  private static applyCompression() {
    Config.plugins?.push(
      viteCompression({
        algorithm: "brotliCompress",
      }),
      viteCompression({
        algorithm: "gzip",
      }),
    );
  }

  private static generateCodeSplits() {
    const chunkGenerator = new CodeSplits(GraphGenerator.traceStartupModules());
    Config.build!.rollupOptions = {
      output: {
        manualChunks: (...args) => {
          return chunkGenerator.generate(...args);
        },
      },
    };
  }
}

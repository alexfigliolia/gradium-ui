import { chdir } from "process";
import { ChildProcess } from "@figliolia/child-process";

export class Builder {
  public static buildFlags = new Set([
    "--ui",
    "--server",
  ]);
  public static cleanFlags = new Set(this.buildFlags);
  public static totalbuildFlags = this.buildFlags.size;
  public static totalCleanFlags = this.cleanFlags.size;

  public static build = this.generateRunner("build");
  public static clean = this.generateRunner("clean");

  public static async buildAll() {
    await this.buildUI();
    await this.buildServer()
  }

  public static async buildUI() {
    await this.cleanUI();
    await this.exec("yarn vite build");
  }

  public static async buildServer() {
    await this.cleanServer();
    await this.exec("yarn build");
    await this.exec("mv ./dist/cjs/server.js server.js");
    await this.exec("rm -rf dist");
  }

  public static async cleanAll() {
    await this.cleanUI();
    await this.cleanServer()
  }

  public static async cleanUI() {
    try {
      await this.exec("rm -rf build")
    } catch (error) {
      // silence
    }
  }

  public static async cleanServer() {
    try {
      chdir("./production");
      await this.exec("rm -rf dist")
      await this.exec("rm server.js")
    } catch (error) {
      // silence
    }
  }

  private static exec(command: string) {
    return new ChildProcess(command).handler;
  }

  private static generateRunner(command: "build" | "clean") {
    const flags = command === "build" ? this.buildFlags : this.cleanFlags;
    const size = flags.size;
    return async () => {
      for(const arg of process.argv) {
        if(flags.has(arg)) {
          switch(arg) {
            case "--ui":
              await this[`${command}UI`]();
              flags.delete(arg);
              break;
            case "--server":
              await this[`${command}Server`]();
              flags.delete(arg);
              break;
            default:
              continue;
          }
        }
      }
      if(flags.size === size) {
        await this[`${command}All`]()
      }
    }
  }
}

import { chdir } from "process";
import { ChildProcess } from "@figliolia/child-process";

export class Builder {
  public static async build() {
    await this.clean()
    await this.exec("yarn vite build");
    await this.compileServer();
  }

  public static async clean() {
    try {
      await this.exec("rm -rf build")
      await this.exec("rm production/server.js")
    } catch (error) {
      // silence
    }
  }

  private static async compileServer() {
    chdir("./production");
    await this.exec("yarn build");
    await this.exec("mv ./dist/cjs/server.js server.js");
    await this.exec("rm -rf dist");
  }

  private static exec(command: string) {
    return new ChildProcess(command).handler;
  }
}

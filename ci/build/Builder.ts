import { chdir } from "process";
import { ChildProcess } from "@figliolia/child-process";

export class Builder {
  public static async build() {
    await this.exec("yarn vite build");
    await this.compileServer();
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

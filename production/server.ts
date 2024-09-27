import { default as Express, static as staticFiles } from "express";
import { existsSync } from "fs";
import helmet from "helmet";
import { join } from "path";

export class App {
  public static instance = Express();
  public static PORT = process.env.PORT || 8080;
  public static buildDirectory = this.locateBuild();

  public static initialize() {
    this.registerMiddleware();
    this.instance.listen(this.PORT, () => {
      console.log("Server Running!");
    });
  }

  private static registerMiddleware() {
    this.instance.set("trust proxy", true);
    this.instance.use(helmet());
    this.instance.use((req, res, next) => {
      if (/manifest.webmanifest/.test(req.path)) {
        res.setHeader("Content-Type", "application/manifest+json");
      }
      next();
    });
    this.instance.use(
      staticFiles(this.buildDirectory, { maxAge: 31557600, immutable: true }),
    );
  }

  private static locateBuild() {
    const buildPath: string[] = [process.cwd()];
    let N = 10;
    while (N > 0) {
      N--;
      console.log("testing", join(...buildPath));
      if (
        existsSync(join(...buildPath, "build")) &&
        existsSync(join(...buildPath, "src"))
      ) {
        break;
      } else {
        buildPath.push("..");
      }
    }
    return join(...buildPath, "build");
  }
}

App.initialize();

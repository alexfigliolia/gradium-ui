import path from "path";
import Config from "../../tsconfig.json";

export class Alias {
  public static BASE_URL = Config.compilerOptions.baseUrl;
  public static PATHS = Config.compilerOptions.paths;

  public static create() {
    const basePath = path.resolve(this.BASE_URL);
    const paths: Record<string, string> = {};
    for (const key in this.PATHS) {
      const KEY = key as keyof typeof Alias.PATHS;
      paths[this.clean(key)] = path.join(
        basePath,
        this.clean(this.PATHS[KEY][0]),
      );
    }
    return paths;
  }

  private static clean(token: string) {
    if (token.endsWith("/*")) {
      return token.slice(0, -2);
    }
    return token;
  }
}

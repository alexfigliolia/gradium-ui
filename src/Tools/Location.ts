import type { Params } from "react-router-dom";

export class Location {
  public static pathFromDefinition(
    definition: string,
    params: Readonly<Params<string>>,
    ...appendages: string[]
  ) {
    const path: string[] = [];
    const tokens = definition.split("/");
    for (const token of tokens) {
      if (token.startsWith(":")) {
        path.push(params[token.slice(1)] || "");
      } else {
        path.push(token);
      }
    }
    path.push(...appendages.map(a => a.replace("/", "")));
    return path.join("/");
  }
}

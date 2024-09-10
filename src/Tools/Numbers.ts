import { LanguageHandler } from "Tools/LanguageHandler";

export class Numbers {
  public static FORMATTER = new Intl.NumberFormat(
    window?.navigator?.language ?? "en-us",
    {},
  );

  static {
    LanguageHandler.subscribe(() => {
      this.FORMATTER = new Intl.NumberFormat(
        window?.navigator?.language ?? "en-us",
        {},
      );
    });
  }

  public static format(value: number) {
    return this.FORMATTER.format(value);
  }
}

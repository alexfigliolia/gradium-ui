import { LanguageHandler } from "Tools/LanguageHandler";

export class Numbers {
  public static HOUR_MINUTE_FORMATTER = new Intl.NumberFormat(
    LanguageHandler.locale,
    {
      minimumIntegerDigits: 2,
    },
  );
  public static FORMATTER = new Intl.NumberFormat(LanguageHandler.locale, {});

  static {
    LanguageHandler.subscribe(() => {
      this.FORMATTER = new Intl.NumberFormat(LanguageHandler.locale, {});
      this.HOUR_MINUTE_FORMATTER = new Intl.NumberFormat(
        LanguageHandler.locale,
        {
          minimumIntegerDigits: 2,
        },
      );
    });
  }

  public static format(value: number) {
    return this.FORMATTER.format(value);
  }

  public static formatHoursOrMinutes(value: number) {
    return this.HOUR_MINUTE_FORMATTER.format(value);
  }

  public static formatCurrency(value: number) {
    return value.toLocaleString(LanguageHandler.locale, {
      style: "currency",
      currency: "USD",
    });
  }
}

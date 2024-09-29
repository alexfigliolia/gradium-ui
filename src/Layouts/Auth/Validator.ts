import { z } from "zod";
import { Toasts } from "State/Toasts";
import type { Callback } from "Types/Generics";

export class Validator {
  private static EMAIL_PARSER = z
    .string()
    .min(1, { message: "A valid email is required" })
    .email("A valid email is required");

  private static validateEmail = (email: string) => {
    const { error } = this.EMAIL_PARSER.safeParse(email);
    return error?.message || false;
  };

  private static validateName = (name: string) => {
    const tokens = name.split(" ");
    if (tokens.length > 1 && tokens.every(t => t.length > 1)) {
      return false;
    }
    return "Your full name is required";
  };

  private static validatePassword = (password: string) => {
    if (password.length < 5) {
      return "Your password must be at least 5 characters long";
    }
    let hasNumber = false;
    let hasUppercase = false;
    for (const char of password) {
      // @ts-ignore
      if (parseInt(char) == char) {
        hasNumber = true;
      } else if (char.toLocaleUpperCase() === char) {
        hasUppercase = true;
      }
    }
    if (!hasNumber) {
      return "Your password must contain at least one number";
    }
    if (!hasUppercase) {
      return "Your password must contain at least one uppercase character";
    }
    return false;
  };

  private static parse(
    key: string,
    validator: Callback<[string], string | false>,
  ) {
    return (data: FormData) => {
      const value = (data.get(key) ?? "") as string;
      const error = validator(value);
      if (error) {
        Toasts.toast({
          type: "error",
          message: error,
        });
        throw new Error("terminate");
      }
      return value;
    };
  }

  public static nameParser = this.parse("name", this.validateName);
  public static emailParser = this.parse("email", this.validateEmail);
  public static passwordParser = this.parse("password", this.validatePassword);
}

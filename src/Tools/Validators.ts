/* eslint-disable no-useless-escape */

export class Validators {
  public static readonly EMAIL_REXEX =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  public static validateEmail(email: string) {
    return this.EMAIL_REXEX.test(email);
  }

  public static validateFullName(name: string) {
    const { length } = name;
    if (length <= 2) {
      return false;
    }
    const split = name.split(" ");
    const { length: N } = split;
    if (N < 2) {
      return false;
    }
    return split.every(v => !!v.length);
  }
}

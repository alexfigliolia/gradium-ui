export class Errors {
  public static parseFirst(
    error: any,
    fallback = "Something went wrong. Please try again",
  ) {
    return error?.[0]?.message ?? fallback;
  }
}

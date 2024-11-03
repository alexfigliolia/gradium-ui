import type { Callback } from "Types/Generics";

export class Controller {
  public static createInterceptor<F extends Callback<any[], any>>(
    interceptedCallback?: F,
  ) {
    return <R extends Callback<any[], any>>(
      intercept: R,
      argGenerator: Parameters<R> | Callback<Parameters<F>, Parameters<R>>,
    ) => {
      return (...args: Parameters<F>) => {
        const interceptArgs =
          typeof argGenerator === "function"
            ? argGenerator(...args)
            : argGenerator;
        intercept(...interceptArgs);
        interceptedCallback?.(...args);
      };
    };
  }
}

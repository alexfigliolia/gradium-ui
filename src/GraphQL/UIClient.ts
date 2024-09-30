import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { Toasts } from "State/Toasts";
import { Errors } from "Tools/Errors";
import { graphQLRequest } from "./request";

export class UIClient {
  errorMessage: string;
  setState: ILoadingStateSetter;
  successMessage: string | string[];
  private Abort = new AbortController();
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor({ setState, successMessage, errorMessage = "first" }: IUIClient) {
    this.setState = setState;
    this.errorMessage = errorMessage;
    this.successMessage = successMessage;
  }

  public executeQuery<D, V extends Record<string, any>>(
    query: string,
    variables: V,
    onComplete = this.onComplete,
  ) {
    const promise = graphQLRequest<D, V>(query, variables, this.Abort.signal);
    void promise
      .then(response => {
        this.setState("success", true);
        Toasts.toast({
          type: "success",
          message: this.parseSuccessMessage<D>(response),
        });
      })
      .catch(error => {
        if (error?.name === "AbortError") {
          return;
        }
        const message = this.parseErrorMessage(error);
        this.setState("error", message);
        Toasts.toast({
          type: "error",
          message,
        });
      })
      .finally(onComplete);
    return promise;
  }

  public abort() {
    this.Abort.abort();
    this.cancelCallback();
    this.Abort = new AbortController();
  }

  private cancelCallback() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private onComplete = () => {
    this.timer = setTimeout(() => {
      this.setState("loading", false);
    }, 2000);
  };

  private parseSuccessMessage<T>(response: T) {
    if (typeof this.successMessage === "string") {
      return this.successMessage;
    }
    let current = response;
    for (const token of this.successMessage) {
      let accessor: string | number = token;
      const int = parseInt(token);
      // @ts-ignore
      if (int == token) {
        accessor = int;
      }
      // @ts-ignore
      current = current[accessor];
    }
    return current as unknown as string;
  }

  private parseErrorMessage(error: any) {
    if (this.errorMessage === "first") {
      return Errors.parseFirst(error);
    }
    return this.errorMessage;
  }
}

interface IUIClient {
  errorMessage?: string;
  setState: ILoadingStateSetter;
  successMessage: string | string[];
}

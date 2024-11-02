import type {
  ILoadingStateKey,
  ILoadingStateSetter,
  ILoadingStateValue,
} from "@figliolia/react-hooks";
import { Toasts } from "State/Toasts";
import { Errors } from "Tools/Errors";
import type { Callback } from "Types/Generics";
import { graphQLRequest } from "./request";

export class UIClient {
  errorMessage: string;
  setState?: ILoadingStateSetter;
  successMessage: string | string[];
  private Abort = new AbortController();
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor({
    setState,
    successMessage = "",
    errorMessage = "first",
  }: IUIClient) {
    this.setState = setState;
    this.errorMessage = errorMessage;
    this.successMessage = successMessage;
  }

  public executeQuery<D, V extends Record<string, any>>(
    query: string,
    variables: V,
    onComplete?: Callback,
  ) {
    let success = false;
    this.setVisualState("loading", true);
    const promise = graphQLRequest<D, V>(query, variables, this.Abort.signal);
    void promise
      .then(res => {
        success = true;
        return this.onSuccess<D>(res);
      })
      .catch(this.onError)
      .finally(() => {
        this.onComplete(success ? onComplete : undefined);
      });
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

  private onSuccess = <T>(response: T) => {
    this.setVisualState("success", true);
    if (this.successMessage) {
      Toasts.success(this.parseSuccessMessage<T>(response));
    }
    return response;
  };

  private onError = (error: any) => {
    if (error?.name === "AbortError") {
      return;
    }
    const message = this.parseErrorMessage(error);
    this.setVisualState("error", message);
    Toasts.error(message);
  };

  private onComplete(callback?: Callback) {
    if (!this.setState) {
      return callback?.();
    }
    this.timer = setTimeout(() => {
      this.setVisualState("loading", false);
      this.setVisualState("error", false);
      this.setVisualState("success", false);
      callback?.();
    }, 2000);
  }

  private setVisualState<T extends ILoadingStateKey>(
    state: T,
    value: ILoadingStateValue<T>,
  ) {
    this.setState?.(state, value);
  }

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

  private parseErrorMessage(error: any): string {
    if (this.errorMessage === "first") {
      return Errors.parseFirst(error);
    }
    return this.errorMessage;
  }

  public static NOOPStateSetter<T extends ILoadingStateKey>(
    _state: T,
    _value: ILoadingStateValue<T>,
  ) {}
}

interface IUIClient {
  errorMessage?: string;
  setState?: ILoadingStateSetter;
  successMessage?: string | string[];
}

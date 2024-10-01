import type { MutableRefObject } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { createAccount } from "GraphQL/Mutations/createAccount.gql";
import { login } from "GraphQL/Mutations/login.gql";
import type {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  LoginMutation,
  LoginMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import type { Callback } from "Types/Generics";
import { Validator } from "./Validator";

export class Controller extends Validator {
  private Client?: UIClient;
  navigate: NavigateFunction;
  setState: ILoadingStateSetter;
  fadeOut: MutableRefObject<Callback<[Callback]> | undefined>;
  constructor(
    setState: ILoadingStateSetter,
    navigate: NavigateFunction,
    fadeOut: MutableRefObject<Callback<[Callback]> | undefined>,
  ) {
    super();
    this.fadeOut = fadeOut;
    this.setState = setState;
    this.navigate = navigate;
  }

  public static buttonText(signUp: boolean) {
    return signUp ? "Sign Up!" : "Login!";
  }

  public async onSubmit(data: FormData, signUp: boolean) {
    try {
      if (signUp) {
        await this.signUP(data);
        return;
      }
      await this.login(data);
    } catch (error) {
      // Errors have been handled by this point
    }
  }

  public async login(data: FormData) {
    const email = Controller.emailParser(data);
    await this.getClient().executeQuery<LoginMutation, LoginMutationVariables>(
      login,
      {
        email,
        password: Controller.parseForm(data, "password"),
      },
      this.navigateToApp,
    );
  }

  public async signUP(data: FormData) {
    const name = Controller.nameParser(data);
    const email = Controller.emailParser(data);
    const password = Controller.passwordParser(data);
    await this.getClient().executeQuery<
      CreateAccountMutation,
      CreateAccountMutationVariables
    >(createAccount, { name, email, password }, this.navigateToApp);
  }

  private getClient() {
    if (this.Client) {
      this.Client.abort();
    }
    this.Client = new UIClient({ setState: this.setState });
    return this.Client;
  }

  public abort() {
    if (this.Client) {
      this.Client.abort();
    }
  }

  private navigateToApp = () => {
    if (this.fadeOut.current) {
      this.fadeOut.current(() => this.navigate("/app"));
    } else {
      this.navigate("/app");
    }
  };
}

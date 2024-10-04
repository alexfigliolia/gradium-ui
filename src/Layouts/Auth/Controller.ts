import type { RefObject } from "react";
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
import { Validators } from "Tools/Validators";
import type { Callback } from "Types/Generics";

export class Controller {
  private Client?: UIClient;
  navigate: NavigateFunction;
  setState: ILoadingStateSetter;
  fadeOut: RefObject<Callback<[Callback]>>;
  constructor(
    setState: ILoadingStateSetter,
    navigate: NavigateFunction,
    fadeOut: RefObject<Callback<[Callback]>>,
  ) {
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
        await this.signUP(data, signUp);
        return;
      }
      await this.login(data, signUp);
    } catch (error) {
      // Errors have been handled by this point
    }
  }

  public async login(data: FormData, signUp: boolean) {
    const email = Validators.emailParser(data);
    await this.getClient().executeQuery<LoginMutation, LoginMutationVariables>(
      login,
      {
        email,
        password: Validators.parseForm(data, "password"),
      },
      this.navigateToApp(signUp),
    );
  }

  public async signUP(data: FormData, signUP: boolean) {
    const name = Validators.nameParser(data);
    const email = Validators.emailParser(data);
    const password = Validators.passwordParser(data);
    await this.getClient().executeQuery<
      CreateAccountMutation,
      CreateAccountMutationVariables
    >(createAccount, { name, email, password }, this.navigateToApp(signUP));
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

  private navigateToApp(signUp: boolean) {
    return () => {
      const route = signUp ? "/app/organization" : "/app";
      if (this.fadeOut.current) {
        this.fadeOut.current(() => this.navigate(route));
      } else {
        this.navigate(route);
      }
    };
  }
}

import type { RefObject } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { createAccount } from "GraphQL/Mutations/createAccount.gql";
import { login } from "GraphQL/Mutations/login.gql";
import type {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  LoggedInUser,
  LoginMutation,
  LoginMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Scope } from "State/Scope";
import { AppLoaders } from "Tools/AppLoaders";
import { GradiumRedirect } from "Tools/GradiumRedirect";
import { Validators } from "Tools/Validators";
import type { Callback } from "Types/Generics";

export class Controller {
  private Client?: UIClient;
  setState: ILoadingStateSetter;
  fadeOut: RefObject<Callback<[Callback]>>;
  constructor(
    setState: ILoadingStateSetter,
    fadeOut: RefObject<Callback<[Callback]>>,
  ) {
    this.fadeOut = fadeOut;
    this.setState = setState;
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
    const response = await this.getClient().executeQuery<
      LoginMutation,
      LoginMutationVariables
    >(
      login,
      {
        email,
        password: Validators.parseForm(data, "password"),
      },
      this.navigateToApp(signUp),
    );
    this.push(response.login);
  }

  public async signUP(data: FormData, signUP: boolean) {
    const name = Validators.nameParser(data);
    const email = Validators.emailParser(data);
    const password = Validators.passwordParser(data);
    const response = await this.getClient().executeQuery<
      CreateAccountMutation,
      CreateAccountMutationVariables
    >(createAccount, { name, email, password }, this.navigateToApp(signUP));
    this.push(response.createAccount);
  }

  private push(scope: LoggedInUser) {
    Scope.populate(scope);
    AppLoaders.Scope.populate(Scope.getState());
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
    const route = signUp ? "/app/organization" : "/app";
    return () => {
      if (this.fadeOut.current) {
        this.fadeOut.current(() => GradiumRedirect.dispatch(route));
      } else {
        GradiumRedirect.dispatch(route);
      }
    };
  }
}

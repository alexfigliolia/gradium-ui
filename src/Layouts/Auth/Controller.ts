import { createAccount } from "GraphQL/Mutations/createAccount.gql";
import { login } from "GraphQL/Mutations/login.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  LoginMutation,
  LoginMutationVariables,
} from "GraphQL/Types";
import { Toasts } from "State/Toasts";
import { Validator } from "./Validator";

export class Controller extends Validator {
  public static buttonText(signUp: boolean) {
    return signUp ? "Sign Up!" : "Login!";
  }

  public static onSubmit(data: FormData, signUp: boolean) {
    if (signUp) {
      return this.signUP(data);
    }
    return this.login(data);
  }

  public static async login(data: FormData) {
    try {
      const email = this.emailParser(data);
      const password = this.passwordParser(data);
      await graphQLRequest<LoginMutation, LoginMutationVariables>(login, {
        email,
        password,
      });
      return true;
    } catch (error) {
      if (Array.isArray(error)) {
        Toasts.toast({
          type: "error",
          message: error[0].message,
        });
      }
      return false;
    }
  }

  public static async signUP(data: FormData) {
    try {
      const name = this.nameParser(data);
      const email = this.emailParser(data);
      const password = this.passwordParser(data);
      await graphQLRequest<
        CreateAccountMutation,
        CreateAccountMutationVariables
      >(createAccount, { name, email, password });
      return true;
    } catch (error) {
      return false;
    }
  }
}

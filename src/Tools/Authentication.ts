import { logout } from "GraphQL/Mutations/logout.gql";
import { verifySession } from "GraphQL/Queries/verifySession.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  LogoutMutation,
  LogoutMutationVariables,
  VerifySessionQuery,
  VerifySessionQueryVariables,
} from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";

export class Authentication {
  public static async isAuthenticated() {
    try {
      const data = await graphQLRequest<
        VerifySessionQuery,
        VerifySessionQueryVariables
      >(verifySession, {});
      return data.verifySession;
    } catch (error) {
      return false;
    }
  }

  public static async logout() {
    try {
      await graphQLRequest<LogoutMutation, LogoutMutationVariables>(logout, {});
      BaseModel.resetAll();
    } catch (error) {
      // silence :)
    }
  }
}

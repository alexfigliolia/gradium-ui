import { verifySession } from "GraphQL/Queries/verifySession.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  VerifySessionQuery,
  VerifySessionQueryVariables,
} from "GraphQL/Types";

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
}

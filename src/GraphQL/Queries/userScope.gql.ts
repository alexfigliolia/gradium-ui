import { gql } from "graphql-request";
import { LoggedInUserFragment } from "GraphQL/Fragments/loggedInUser.gql";
import type { UserScopeQuery, UserScopeQueryVariables } from "GraphQL/Types";
import { createQueryFN } from "Tools/createQuery";

export const userScope = gql`
  ${LoggedInUserFragment}
  query userScope {
    userScope {
      ...LoggedInUserFragment
    }
  }
`;

export const userScopeOptions = createQueryFN<
  UserScopeQuery,
  UserScopeQueryVariables
>(userScope)({});

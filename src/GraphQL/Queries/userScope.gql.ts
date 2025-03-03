import { gql } from "graphql-request";
import { LoggedInUserFragment } from "GraphQL/Fragments/loggedInUser.gql";
import type { UserScopeQuery, UserScopeQueryVariables } from "GraphQL/Types";
import { createQueryOptions } from "Tools/createQueryOptions";

export const userScope = gql`
  ${LoggedInUserFragment}
  query userScope {
    userScope {
      ...LoggedInUserFragment
    }
  }
`;

export const userScopeOptions = createQueryOptions<
  UserScopeQuery,
  UserScopeQueryVariables
>(userScope)({});

import { gql } from "graphql-request";
import { LoggedInUserFragment } from "GraphQL/Fragments/loggedInUser.gql";

export const userScope = gql`
  ${LoggedInUserFragment}
  query userScope($id: Int!) {
    userScope(id: $id) {
      ...LoggedInUserFragment
    }
  }
`;

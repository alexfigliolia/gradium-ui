import { gql } from "graphql-request";
import { BasicUserFragment } from "GraphQL/Fragments/basicUser.gql";

export const updateEmail = gql`
  ${BasicUserFragment}
  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {
    updateEmail(userId: $userId, previous: $previous, next: $next) {
      ...BasicUserFragment
    }
  }
`;

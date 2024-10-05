import { gql } from "graphql-request";
import { BasicUserFragment } from "GraphQL/Fragments/basicUser.gql";

export const deleteEmail = gql`
  ${BasicUserFragment}
  mutation deleteEmail($userId: Int!, $email: String!) {
    deleteEmail(userId: $userId, email: $email) {
      ...BasicUserFragment
    }
  }
`;

import { gql } from "graphql-request";
import { BasicUserFragment } from "GraphQL/Fragments/basicUser.gql";

export const linkEmail = gql`
  ${BasicUserFragment}
  mutation linkEmail($userId: Int!, $email: String!) {
    linkEmail(userId: $userId, email: $email) {
      ...BasicUserFragment
    }
  }
`;

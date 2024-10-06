import { gql } from "graphql-request";

export const resetPassword = gql`
  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {
    resetPassword(userId: $userId, previous: $previous, next: $next)
  }
`;

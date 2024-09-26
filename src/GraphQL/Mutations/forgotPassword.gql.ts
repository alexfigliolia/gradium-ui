import { gql } from "graphql-request";

export const forgotPassword = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

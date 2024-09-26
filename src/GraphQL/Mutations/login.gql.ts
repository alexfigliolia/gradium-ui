import { gql } from "graphql-request";
import { LoggedInUserFragment } from "GraphQL/Fragments/loggedInUser.gql";

export const login = gql`
  ${LoggedInUserFragment}
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...LoggedInUserFragment
    }
  }
`;

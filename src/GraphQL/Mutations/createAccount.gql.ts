import { gql } from "graphql-request";
import { LoggedInUserFragment } from "GraphQL/Fragments/loggedInUser.gql";

export const createAccount = gql`
  ${LoggedInUserFragment}
  mutation createAccount($name: String!, $email: String!, $password: String!) {
    createAccount(name: $name, email: $email, password: $password) {
      ...LoggedInUserFragment
    }
  }
`;

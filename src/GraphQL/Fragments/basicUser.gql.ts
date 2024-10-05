import { gql } from "graphql-request";

export const BasicUserFragment = gql`
  fragment BasicUserFragment on BasicUser {
    name
    emails {
      email
    }
  }
`;

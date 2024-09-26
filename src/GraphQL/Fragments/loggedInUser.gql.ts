import { gql } from "graphql-request";

export const LoggedInUserFragment = gql`
  fragment LoggedInUserFragment on LoggedInUser {
    id
    name
    email
    affiliations {
      organizationId
      roles {
        role
      }
    }
  }
`;

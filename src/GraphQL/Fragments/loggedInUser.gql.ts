import { gql } from "graphql-request";

export const LoggedInUserFragment = gql`
  fragment LoggedInUserFragment on LoggedInUser {
    id
    name
    emails {
      email
    }
    affiliations {
      organization {
        id
        name
      }
      roles {
        role
      }
    }
  }
`;

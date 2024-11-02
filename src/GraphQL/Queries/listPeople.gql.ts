import { gql } from "graphql-request";

export const listPeople = gql`
  query listPeople($organizationId: Int!, $cursor: Int, $limit: Int) {
    listPeople(
      organizationId: $organizationId
      cursor: $cursor
      limit: $limit
    ) {
      cursor
      list {
        name
        userId
      }
    }
  }
`;

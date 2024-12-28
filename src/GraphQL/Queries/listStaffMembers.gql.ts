import { gql } from "graphql-request";

export const listStaffMembers = gql`
  query listStaffMembers($organizationId: Int!, $limit: Int, $cursor: Int) {
    listStaffMembers(
      organizationId: $organizationId
      limit: $limit
      cursor: $cursor
    ) {
      cursor
      list {
        id
        name
      }
    }
  }
`;

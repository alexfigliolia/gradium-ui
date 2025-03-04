import { gql } from "graphql-request";
import type {
  ListStaffMembersQuery,
  ListStaffMembersQueryVariables,
} from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

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

export const listStaffMembersOptions = createInfiniteQueryOptions<
  ListStaffMembersQuery,
  ListStaffMembersQueryVariables
>(listStaffMembers);

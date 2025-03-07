import { gql } from "graphql-request";
import { LeaseFragment } from "GraphQL/Fragments/leaseFragment.gql";
import type {
  FetchLeasesQuery,
  FetchLeasesQueryVariables,
} from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

export const fetchLeases = gql`
  ${LeaseFragment}
  query fetchLeases(
    $organizationId: Int!
    $limit: Int
    $cursor: Int
    $search: String
  ) {
    fetchLeases(
      organizationId: $organizationId
      limit: $limit
      cursor: $cursor
      search: $search
    ) {
      cursor
      list {
        ...LeaseFragment
      }
    }
  }
`;

export const fetchLeasesOptions = createInfiniteQueryOptions<
  FetchLeasesQuery,
  FetchLeasesQueryVariables
>(fetchLeases);

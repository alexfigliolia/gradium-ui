import { gql } from "graphql-request";
import type {
  ListSpacesForRentQuery,
  ListSpacesForRentQueryVariables,
} from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

export const listSpacesForRent = gql`
  query listSpacesForRent(
    $propertyId: Int!
    $organizationId: Int!
    $cursor: Int
    $limit: Int
  ) {
    listSpacesForRent(
      propertyId: $propertyId
      organizationId: $organizationId
      cursor: $cursor
      limit: $limit
    ) {
      cursor
      list {
        id
        name
      }
    }
  }
`;

export const listSpacesForRentOptions = createInfiniteQueryOptions<
  ListSpacesForRentQuery,
  ListSpacesForRentQueryVariables
>(listSpacesForRent);

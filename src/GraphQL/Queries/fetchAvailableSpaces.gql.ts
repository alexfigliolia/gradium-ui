import { gql } from "graphql-request";
import type {
  FetchAvailableSpacesQuery,
  FetchAvailableSpacesQueryVariables,
} from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

export const fetchAvailableSpaces = gql`
  query fetchAvailableSpaces(
    $organizationId: Int!
    $cursor: Int
    $limit: Int
    $search: String
  ) {
    fetchAvailableSpaces(
      organizationId: $organizationId
      cursor: $cursor
      limit: $limit
      search: $search
    ) {
      list {
        id
        name
        type
        beds
        baths
        size
        propertyId
        images {
          id
          url
        }
        floorPlans {
          id
          url
        }
        propertyName
        availableSince
      }
      cursor
    }
  }
`;

export const availableSpacesOptions = createInfiniteQueryOptions<
  FetchAvailableSpacesQuery,
  FetchAvailableSpacesQueryVariables
>(fetchAvailableSpaces);

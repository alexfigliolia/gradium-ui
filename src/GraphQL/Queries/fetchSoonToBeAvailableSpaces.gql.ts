import { gql } from "graphql-request";
import type {
  FetchSoonToBeAvailableSpacesQuery,
  FetchSoonToBeAvailableSpacesQueryVariables,
} from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

export const fetchSoonToBeAvailableSpaces = gql`
  query fetchSoonToBeAvailableSpaces(
    $organizationId: Int!
    $cursor: Int
    $limit: Int
  ) {
    fetchSoonToBeAvailableSpaces(
      organizationId: $organizationId
      cursor: $cursor
      limit: $limit
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
        lease {
          end
          start
          status
        }
        propertyName
        availableOn
      }
      cursor
    }
  }
`;

export const soonToBeAvailableSpaceOptions = createInfiniteQueryOptions<
  FetchSoonToBeAvailableSpacesQuery,
  FetchSoonToBeAvailableSpacesQueryVariables
>(fetchSoonToBeAvailableSpaces);

import { gql } from "graphql-request";
import type {
  IdentifySpacesQuery,
  IdentifySpacesQueryVariables,
} from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

export const identifySpaces = gql`
  query identifySpaces(
    $propertyId: Int!
    $organizationId: Int!
    $cursor: Int
    $limit: Int
  ) {
    identifySpaces(
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

export const identifySpacesOptions = createInfiniteQueryOptions<
  IdentifySpacesQuery,
  IdentifySpacesQueryVariables
>(identifySpaces);

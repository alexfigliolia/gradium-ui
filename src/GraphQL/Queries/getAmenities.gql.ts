import { gql } from "graphql-request";
import { AmenityFragment } from "GraphQL/Fragments/amenity.gql";

export const getAmenities = gql`
  ${AmenityFragment}
  query getAmenities($propertyId: Int!, $organizationId: Int!) {
    getAmenities(propertyId: $propertyId, organizationId: $organizationId) {
      ...AmenityFragment
    }
  }
`;

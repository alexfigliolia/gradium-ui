import { gql } from "graphql-request";
import { AmenityFragment } from "GraphQL/Fragments/amenity.gql";

export const deleteAmenity = gql`
  ${AmenityFragment}
  mutation deleteAmenity($organizationId: Int!, $propertyId: Int!, $id: Int!) {
    deleteAmenity(
      organizationId: $organizationId
      propertyId: $propertyId
      id: $id
    ) {
      ...AmenityFragment
    }
  }
`;

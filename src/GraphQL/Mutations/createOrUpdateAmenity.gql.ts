import { gql } from "graphql-request";
import { AmenityFragment } from "GraphQL/Fragments/amenity.gql";

export const createOrUpdateAmenity = gql`
  ${AmenityFragment}
  mutation createOrUpdateAmenity(
    $id: Int
    $propertyId: Int!
    $organizationId: Int!
    $name: String!
    $billed: BillFrequency!
    $open: String!
    $close: String!
    $size: String!
    $price: String!
  ) {
    createOrUpdateAmenity(
      id: $id
      propertyId: $propertyId
      organizationId: $organizationId
      name: $name
      billed: $billed
      open: $open
      close: $close
      size: $size
      price: $price
    ) {
      ...AmenityFragment
    }
  }
`;

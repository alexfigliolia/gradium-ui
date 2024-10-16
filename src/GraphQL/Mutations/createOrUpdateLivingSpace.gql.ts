import { gql } from "graphql-request";
import { LivingSpaceFragment } from "GraphQL/Fragments/livingSpace.gql";

export const createOrUpdateLivingSpace = gql`
  ${LivingSpaceFragment}
  mutation createOrUpdateLivingSpace(
    $id: Int
    $propertyId: Int!
    $organizationId: Int!
    $name: String!
    $type: LivingSpaceType!
    $beds: Int!
    $baths: Float!
    $footage: Float!
  ) {
    createOrUpdateLivingSpace(
      id: $id
      propertyId: $propertyId
      organizationId: $organizationId
      name: $name
      type: $type
      beds: $beds
      baths: $baths
      footage: $footage
    ) {
      ...LivingSpaceFragment
    }
  }
`;

import { gql } from "graphql-request";
import { LivingSpaceFragment } from "GraphQL/Fragments/livingSpace.gql";

export const deleteLivingSpace = gql`
  ${LivingSpaceFragment}
  mutation deleteLivingSpace(
    $organizationId: Int!
    $propertyId: Int!
    $id: Int!
  ) {
    deleteLivingSpace(
      organizationId: $organizationId
      propertyId: $propertyId
      id: $id
    ) {
      ...LivingSpaceFragment
    }
  }
`;

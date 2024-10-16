import { gql } from "graphql-request";
import { LivingSpaceFragment } from "GraphQL/Fragments/livingSpace.gql";

export const getLivingSpaces = gql`
  ${LivingSpaceFragment}
  query getLivingSpaces($propertyId: Int!, $organizationId: Int!) {
    getLivingSpaces(propertyId: $propertyId, organizationId: $organizationId) {
      ...LivingSpaceFragment
    }
  }
`;

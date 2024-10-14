import { gql } from "graphql-request";

export const modifyPropertyAddons = gql`
  mutation modifyPropertyAddons(
    $organizationId: Int!
    $propertyId: Int!
    $additions: [PropertyAddonType!]!
    $deletions: [Int!]!
  ) {
    modifyPropertyAddons(
      organizationId: $organizationId
      propertyId: $propertyId
      additions: $additions
      deletions: $deletions
    ) {
      id
      type
    }
  }
`;

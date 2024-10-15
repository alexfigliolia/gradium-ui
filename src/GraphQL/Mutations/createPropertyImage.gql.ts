import { gql } from "graphql-request";

export const createPropertyImage = gql`
  mutation createPropertyImage(
    $propertyId: Int!
    $organizationId: Int!
    $url: String!
  ) {
    createPropertyImage(
      propertyId: $propertyId
      organizationId: $organizationId
      url: $url
    ) {
      id
      url
    }
  }
`;

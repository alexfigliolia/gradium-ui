import { gql } from "graphql-request";

export const saveImage = gql`
  mutation saveImage(
    $propertyId: Int!
    $organizationId: Int!
    $entityId: Int!
    $url: String!
    $type: GradiumImageType!
  ) {
    saveImage(
      type: $type
      entityId: $entityId
      propertyId: $propertyId
      organizationId: $organizationId
      url: $url
    ) {
      id
      url
    }
  }
`;

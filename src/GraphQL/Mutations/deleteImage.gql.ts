import { gql } from "graphql-request";

export const deleteImage = gql`
  mutation deleteImage(
    $propertyId: Int!
    $organizationId: Int!
    $id: Int!
    $type: GradiumImageType!
  ) {
    deleteImage(
      id: $id
      type: $type
      propertyId: $propertyId
      organizationId: $organizationId
    ) {
      id
      url
    }
  }
`;

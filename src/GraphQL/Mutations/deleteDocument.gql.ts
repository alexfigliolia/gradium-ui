import { gql } from "graphql-request";

export const deleteDocument = gql`
  mutation deleteDocument(
    $propertyId: Int!
    $organizationId: Int!
    $id: Int!
    $type: GradiumDocumentType!
  ) {
    deleteDocument(
      id: $id
      type: $type
      propertyId: $propertyId
      organizationId: $organizationId
    ) {
      id
      url
      thumbnail
    }
  }
`;

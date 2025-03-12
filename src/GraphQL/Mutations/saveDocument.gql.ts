import { gql } from "graphql-request";

export const saveDocument = gql`
  mutation saveDocument(
    $propertyId: Int!
    $organizationId: Int!
    $entityId: Int!
    $url: String!
    $thumbnail: String!
    $type: GradiumDocumentType!
  ) {
    saveDocument(
      type: $type
      thumbnail: $thumbnail
      entityId: $entityId
      propertyId: $propertyId
      organizationId: $organizationId
      url: $url
    ) {
      id
      url
      thumbnail
    }
  }
`;

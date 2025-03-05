import { gql } from "graphql-request";

export const generateDestroySignature = gql`
  query generateDestroySignature(
    $organizationId: Int!
    $publicId: String!
    $imageType: GradiumImageType
    $documentType: GradiumDocumentType
  ) {
    generateDestroySignature(
      organizationId: $organizationId
      publicId: $publicId
      imageType: $imageType
      documentType: $documentType
    ) {
      name
      folder
      api_key
      public_id
      timestamp
      signature
      invalidate
      resource_type
    }
  }
`;

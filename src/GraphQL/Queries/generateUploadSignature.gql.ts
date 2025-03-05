import { gql } from "graphql-request";

export const generateUploadSignature = gql`
  query generateUploadSignature(
    $organizationId: Int!
    $imageType: GradiumImageType
    $documentType: GradiumDocumentType
  ) {
    generateUploadSignature(
      organizationId: $organizationId
      imageType: $imageType
      documentType: $documentType
    ) {
      api_key
      name
      folder
      timestamp
      signature
    }
  }
`;

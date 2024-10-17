import { gql } from "graphql-request";

export const generateUploadSignature = gql`
  query generateUploadSignature(
    $organizationId: Int!
    $type: GradiumImageType!
  ) {
    generateUploadSignature(organizationId: $organizationId, type: $type) {
      api_key
      name
      folder
      timestamp
      signature
    }
  }
`;

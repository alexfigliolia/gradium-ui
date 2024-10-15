import { gql } from "graphql-request";

export const generateCloudinarySignature = gql`
  query generateCloudinarySignature(
    $organizationId: Int!
    $type: PropertyImageType!
  ) {
    generateCloudinarySignature(organizationId: $organizationId, type: $type) {
      name
      folder
      api_key
      timestamp
      signature
    }
  }
`;

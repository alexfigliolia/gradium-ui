import { gql } from "graphql-request";

export const generateDestroySignature = gql`
  query generateDestroySignature(
    $organizationId: Int!
    $publicId: String!
    $type: PropertyImageType!
  ) {
    generateDestroySignature(
      organizationId: $organizationId
      publicId: $publicId
      type: $type
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

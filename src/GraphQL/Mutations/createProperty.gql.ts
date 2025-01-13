import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";

export const createProperty = gql`
  ${AdminBasicPropertyFragment}
  mutation createProperty(
    $organizationId: Int!
    $name: String!
    $address1: String!
    $address2: String!
    $city: String!
    $state: String!
    $zipCode: String!
  ) {
    createProperty(
      organizationId: $organizationId
      name: $name
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zipCode: $zipCode
    ) {
      ...AdminBasicPropertyFragment
    }
  }
`;

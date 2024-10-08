import { gql } from "graphql-request";

export const createProperty = gql`
  mutation createProperty($name: String!, $organizationId: Int!) {
    createProperty(name: $name, organizationId: $organizationId) {
      id
      name
      slug
      address1
      address2
      city
      state
      zipCode
      mapsLink
      images {
        id
        url
      }
      addons {
        id
        type
      }
    }
  }
`;

import { gql } from "graphql-request";

export const AdminBasicPropertyFragment = gql`
  fragment AdminBasicPropertyFragment on AdminBasicProperty {
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
`;

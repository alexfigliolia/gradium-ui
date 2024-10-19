import { gql } from "graphql-request";

export const AmenityFragment = gql`
  fragment AmenityFragment on Amenity {
    id
    name
    open
    price
    billed
    close
    footage
    propertyId
    images {
      id
      url
    }
    floorPlans {
      id
      url
    }
  }
`;

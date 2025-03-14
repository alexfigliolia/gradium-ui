import { gql } from "graphql-request";

export const AmenityFragment = gql`
  fragment AmenityFragment on Amenity {
    id
    name
    open
    price
    billed
    close
    capacity
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

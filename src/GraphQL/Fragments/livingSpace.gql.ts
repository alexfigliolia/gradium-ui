import { gql } from "graphql-request";

export const LivingSpaceFragment = gql`
  fragment LivingSpaceFragment on LivingSpace {
    id
    name
    type
    beds
    baths
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
import { gql } from "graphql-request";

export const AmenityReservationFragment = gql`
  fragment AmenityReservationFragment on AmenityReservation {
    id
    date
    start
    end
    amenity {
      id
      name
    }
    person {
      id
      name
    }
  }
`;

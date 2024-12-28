import { gql } from "graphql-request";
import { AmenityReservationFragment } from "GraphQL/Fragments/amenityReservation.gql";

export const fetchAmenityReservations = gql`
  ${AmenityReservationFragment}
  query fetchAmenityReservations(
    $organizationId: Int!
    $propertyId: Int!
    $date: DateTime!
    $amenityIds: [Int!]
    $reservers: [Int!]
  ) {
    fetchAmenityReservations(
      organizationId: $organizationId
      propertyId: $propertyId
      date: $date
      amenityIds: $amenityIds
      reservers: $reservers
    ) {
      ...AmenityReservationFragment
    }
  }
`;

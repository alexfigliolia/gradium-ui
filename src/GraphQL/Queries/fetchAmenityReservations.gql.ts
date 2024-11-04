import { gql } from "graphql-request";
import { AmenityReservationFragment } from "GraphQL/Fragments/amenityReservation.gql";

export const fetchAmenityReservations = gql`
  ${AmenityReservationFragment}
  query fetchAmenityReservations(
    $organizationId: Int!
    $propertyId: Int!
    $date: ISODate!
    $amenityIds: [Int!]
  ) {
    fetchAmenityReservations(
      organizationId: $organizationId
      propertyId: $propertyId
      date: $date
      amenityIds: $amenityIds
    ) {
      ...AmenityReservationFragment
    }
  }
`;

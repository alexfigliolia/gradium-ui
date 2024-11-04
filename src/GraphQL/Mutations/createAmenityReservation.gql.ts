import { gql } from "graphql-request";
import { AmenityReservationFragment } from "GraphQL/Fragments/amenityReservation.gql";

export const createAmenityReservation = gql`
  ${AmenityReservationFragment}
  mutation createAmenityReservation(
    $organizationId: Int!
    $propertyId: Int!
    $amenityId: Int!
    $personId: Int!
    $date: ISODate!
    $start: ISODate!
    $end: ISODate!
    $charge: Boolean
  ) {
    createAmenityReservation(
      organizationId: $organizationId
      propertyId: $propertyId
      amenityId: $amenityId
      personId: $personId
      date: $date
      start: $start
      end: $end
      charge: $charge
    ) {
      ...AmenityReservationFragment
    }
  }
`;

import { gql } from "graphql-request";
import { AmenityReservationFragment } from "GraphQL/Fragments/amenityReservation.gql";

export const updateAmenityReservation = gql`
  ${AmenityReservationFragment}
  mutation updateAmenityReservation(
    $id: Int!
    $organizationId: Int!
    $propertyId: Int!
    $amenityId: Int!
    $personId: Int!
    $start: DateTime!
    $end: DateTime!
    $charge: Boolean
  ) {
    updateAmenityReservation(
      id: $id
      organizationId: $organizationId
      propertyId: $propertyId
      amenityId: $amenityId
      personId: $personId
      start: $start
      end: $end
      charge: $charge
    ) {
      ...AmenityReservationFragment
    }
  }
`;

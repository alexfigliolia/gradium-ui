import { gql } from "graphql-request";

export const cancelAmenityReservation = gql`
  mutation cancelAmenityReservation(
    $organizationId: Int!
    $propertyId: Int!
    $id: Int!
  ) {
    cancelAmenityReservation(
      organizationId: $organizationId
      propertyId: $propertyId
      id: $id
    )
  }
`;

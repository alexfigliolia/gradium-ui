import { gql } from "graphql-request";
import { LeaseFragment } from "GraphQL/Fragments/leaseFragment.gql";

export const createLease = gql`
  ${LeaseFragment}
  mutation createLease(
    $organizationId: Int!
    $propertyId: Int!
    $start: DateTime!
    $end: DateTime!
    $price: Float!
    $lessees: [Lessee!]!
    $paymentFrequency: RentPaymentFrequency!
    $livingSpaceId: Int!
  ) {
    createLease(
      organizationId: $organizationId
      propertyId: $propertyId
      start: $start
      end: $end
      price: $price
      lessees: $lessees
      livingSpaceId: $livingSpaceId
      paymentFrequency: $paymentFrequency
    ) {
      ...LeaseFragment
    }
  }
`;

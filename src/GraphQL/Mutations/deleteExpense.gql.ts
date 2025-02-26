import { gql } from "graphql-request";

export const deleteExpense = gql`
  mutation deleteExpense($organizationId: Int!, $propertyId: Int, $id: Int!) {
    deleteExpense(
      organizationId: $organizationId
      propertyId: $propertyId
      id: $id
    )
  }
`;

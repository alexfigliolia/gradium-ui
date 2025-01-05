import { gql } from "graphql-request";
import { ExpenseFragment } from "GraphQL/Fragments/expense.gql";

export const updateExpense = gql`
  ${ExpenseFragment}
  mutation updateExpense(
    $id: Int!
    $organizationId: Int!
    $propertyId: Int!
    $title: String!
    $description: String!
    $cost: String!
  ) {
    updateExpense(
      id: $id
      organizationId: $organizationId
      propertyId: $propertyId
      title: $title
      description: $description
      cost: $cost
    ) {
      ...ExpenseFragment
    }
  }
`;

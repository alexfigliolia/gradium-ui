import { gql } from "graphql-request";
import { ExpenseFragment } from "GraphQL/Fragments/expense.gql";

export const createExpense = gql`
  ${ExpenseFragment}
  mutation createExpense(
    $taskId: Int!
    $organizationId: Int!
    $propertyId: Int!
    $title: String!
    $description: String!
    $cost: String!
  ) {
    createExpense(
      taskId: $taskId
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

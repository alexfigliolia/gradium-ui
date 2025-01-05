import { gql } from "graphql-request";

export const ExpenseFragment = gql`
  fragment ExpenseFragment on Expense {
    id
    cost
    createdAt
    title
    description
    createdBy {
      id
      name
    }
    attachments {
      id
      url
    }
  }
`;

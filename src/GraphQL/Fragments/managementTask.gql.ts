import { gql } from "graphql-request";
import { ExpenseFragment } from "./expense.gql";

export const ManagementTaskFragment = gql`
  ${ExpenseFragment}
  fragment ManagementTaskFragment on ManagementTask {
    id
    createdAt
    title
    description
    status
    priority
    createdBy {
      id
      name
    }
    images {
      id
      url
    }
    assignedTo {
      id
      name
    }
    expenses {
      ...ExpenseFragment
    }
  }
`;

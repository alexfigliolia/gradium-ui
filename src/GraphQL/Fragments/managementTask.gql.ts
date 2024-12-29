import { gql } from "graphql-request";

export const ManagementTaskFragment = gql`
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
      id
      cost
      createdAt
      title
      description
      attachments {
        id
        url
      }
    }
  }
`;

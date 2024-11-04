import { gql } from "graphql-request";

export const ManagementTaskFragment = gql`
  fragment ManagementTaskFragment on ManagementTask {
    id
    priority
    createdAt
    title
    description
    status
    images {
      id
      url
    }
    createdBy {
      id
      name
    }
    assignedTo {
      id
      name
    }
    expenses {
      id
      createdAt
      cost
      title
      description
      attachments {
        id
        url
      }
    }
  }
`;

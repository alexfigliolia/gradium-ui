import { gql } from "graphql-request";

export const createManagementTask = gql`
  mutation createManagementTask(
    $organizationId: Int!
    $propertyId: Int!
    $title: String!
    $description: String!
    $status: ManagementTaskStatus!
    $priority: ManagementTaskPriority!
    $images: [GradiumImageInput!]!
    $assignedToId: Int
  ) {
    createManagementTask(
      organizationId: $organizationId
      propertyId: $propertyId
      title: $title
      description: $description
      status: $status
      priority: $priority
      images: $images
      assignedToId: $assignedToId
    ) {
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
  }
`;

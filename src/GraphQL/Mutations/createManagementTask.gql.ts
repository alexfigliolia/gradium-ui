import { gql } from "graphql-request";
import { ManagementTaskFragment } from "GraphQL/Fragments/managementTask.gql";

export const createManagementTask = gql`
  ${ManagementTaskFragment}
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
      ...ManagementTaskFragment
    }
  }
`;

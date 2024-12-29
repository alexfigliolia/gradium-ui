import { gql } from "graphql-request";
import { ManagementTaskFragment } from "GraphQL/Fragments/managementTask.gql";

export const updateManagementTask = gql`
  ${ManagementTaskFragment}
  mutation updateManagementTask(
    $id: Int!
    $organizationId: Int!
    $propertyId: Int!
    $title: String!
    $description: String!
    $status: ManagementTaskStatus!
    $priority: ManagementTaskPriority!
    $assignedToId: Int
  ) {
    updateManagementTask(
      id: $id
      organizationId: $organizationId
      propertyId: $propertyId
      title: $title
      description: $description
      status: $status
      priority: $priority
      assignedToId: $assignedToId
    ) {
      ...ManagementTaskFragment
    }
  }
`;

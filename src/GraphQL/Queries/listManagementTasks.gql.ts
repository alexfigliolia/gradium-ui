import { gql } from "graphql-request";
import { ManagementTaskFragment } from "GraphQL/Fragments/managementTask.gql";

export const listManagementTasks = gql`
  ${ManagementTaskFragment}
  query listManagementTasks(
    $organizationId: Int!
    $propertyId: Int
    $priority: [ManagementTaskPriority]
    $assignedToId: [Int]
    $searchString: String
  ) {
    listManagementTasks(
      organizationId: $organizationId
      propertyId: $propertyId
      priority: $priority
      assignedToId: $assignedToId
      searchString: $searchString
    ) {
      ...ManagementTaskFragment
    }
  }
`;

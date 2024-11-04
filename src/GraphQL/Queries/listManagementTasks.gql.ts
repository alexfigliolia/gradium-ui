import { gql } from "graphql-request";
import { ManagementTaskFragment } from "GraphQL/Fragments/managementTask.gql";

export const listManagementTasks = gql`
  ${ManagementTaskFragment}
  query listManagementTasks($organizationId: Int!, $propertyId: Int) {
    listManagementTasks(
      organizationId: $organizationId
      propertyId: $propertyId
    ) {
      ...ManagementTaskFragment
    }
  }
`;

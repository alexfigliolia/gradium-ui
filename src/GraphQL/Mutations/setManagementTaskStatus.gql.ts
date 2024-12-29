import { gql } from "graphql-request";

export const setManagementTaskStatus = gql`
  mutation setManagementTaskStatus(
    $id: Int!
    $organizationId: Int!
    $status: ManagementTaskStatus!
  ) {
    setManagementTaskStatus(
      id: $id
      organizationId: $organizationId
      status: $status
    )
  }
`;

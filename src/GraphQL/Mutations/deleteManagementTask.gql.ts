import { gql } from "graphql-request";

export const deleteManagementTask = gql`
  mutation deleteManagementTask(
    $id: Int!
    $organizationId: Int!
    $propertyId: Int
  ) {
    deleteManagementTask(
      id: $id
      organizationId: $organizationId
      propertyId: $propertyId
    )
  }
`;

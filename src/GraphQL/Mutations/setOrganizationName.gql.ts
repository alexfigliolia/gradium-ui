import { gql } from "graphql-request";

export const setOrganizationName = gql`
  mutation setOrganizationName($name: String!, $organizationId: Int!) {
    setOrganizationName(name: $name, organizationId: $organizationId)
  }
`;

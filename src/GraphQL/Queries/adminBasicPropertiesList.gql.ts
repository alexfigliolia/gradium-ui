import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";
import { queryBuilder } from "GraphQL/queryBuilder";
import type {
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables,
} from "GraphQL/Types";

export const adminBasicPropertiesList = gql`
  ${AdminBasicPropertyFragment}
  query adminBasicPropertiesList($organizationId: Int!) {
    adminBasicPropertiesList(organizationId: $organizationId) {
      ...AdminBasicPropertyFragment
    }
  }
`;

export const getAdminBasicProperties = queryBuilder<
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables
>(adminBasicPropertiesList);

import { gql } from "graphql-request";
import type { ListPeopleQuery, ListPeopleQueryVariables } from "GraphQL/Types";
import { createInfiniteQueryOptions } from "Tools/createQueryOptions";

export const listPeople = gql`
  query listPeople($organizationId: Int!, $cursor: Int, $limit: Int) {
    listPeople(
      organizationId: $organizationId
      cursor: $cursor
      limit: $limit
    ) {
      cursor
      list {
        id
        name
      }
    }
  }
`;

export const listPeopleOptions = createInfiniteQueryOptions<
  ListPeopleQuery,
  ListPeopleQueryVariables
>(listPeople);

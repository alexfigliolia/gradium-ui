import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { listStaffMembers } from "GraphQL/Queries/listStaffMembers.gql";
import type {
  ListStaffMembersQuery,
  ListStaffMembersQueryVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Scope } from "State/Scope";
import type { Maybe } from "Types/Generics";

export const fetchStaff = async (
  setState: ILoadingStateSetter,
  cursor: Maybe<number>,
) => {
  const client = new UIClient({ setState });
  try {
    const response = await client.executeQuery<
      ListStaffMembersQuery,
      ListStaffMembersQueryVariables
    >(listStaffMembers, {
      cursor,
      limit: 10,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return {
      cursor: response.listStaffMembers.cursor,
      list: response.listStaffMembers.list.map(item => ({
        label: item.name,
        value: item.id.toString(),
      })),
    };
  } catch (error) {
    // silence
  }
};

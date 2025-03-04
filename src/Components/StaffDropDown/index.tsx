import { memo } from "react";
import {
  PaginatedDropDown,
  type Props as DDProps,
} from "Components/PaginatedDropDown";
import { User } from "Icons/User";
import type { IHTMLOption } from "Types/React";
import { usePaginatedStaffList } from "./usePaginatedStaffList";

function StaffDropDownComponent<
  M extends boolean | undefined,
  F extends (...args: never[]) => any,
>(props: Props<M, F>) {
  const [list, isFetching, fetchNextPage] = usePaginatedStaffList();
  return (
    <PaginatedDropDown
      list={list}
      icon={<User />}
      title="Staff List"
      loading={isFetching}
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
}

export const StaffDropDown = memo(
  StaffDropDownComponent,
) as typeof StaffDropDownComponent;

type Props<
  M extends boolean | undefined,
  F extends (...args: never[]) => any,
> = Omit<DDProps<IHTMLOption, M, F>, "icon" | "list" | "fetchNextPage">;

import { memo } from "react";
import {
  PaginatedDropDown,
  type Props as DDProps,
} from "Components/PaginatedDropDown";
import { User } from "Icons/User";
import type { IHTMLOption } from "Types/React";
import { fetchStaff } from "./fetchStaff";

function StaffDropDownComponent<M extends boolean | undefined>(
  props: Props<M>,
) {
  return (
    <PaginatedDropDown
      prefetch
      icon={<User />}
      fetch={fetchStaff}
      title="Staff List"
      {...props}
    />
  );
}

export const StaffDropDown = memo(
  StaffDropDownComponent,
) as typeof StaffDropDownComponent;

type Props<M extends boolean | undefined> = Omit<
  DDProps<IHTMLOption, M>,
  "fetch" | "icon"
>;

export { fetchStaff } from "./fetchStaff";

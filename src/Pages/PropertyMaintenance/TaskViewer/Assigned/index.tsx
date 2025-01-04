import { Fragment, memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useClickOutside, useController } from "@figliolia/react-hooks";
import { OptionSelection } from "Components/DropDown";
import { useDropDownPagination } from "Components/PaginatedDropDown";
import { fetchStaff } from "Components/StaffDropDown";
import { Devices } from "Tools/Devices";
import { HashList } from "Tools/HashedList";
import { ModalStack } from "Tools/ModalStack";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

export const Assigned = memo(function Assigned({
  assigned,
  className,
  onChange,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const classes = useClassNames("assigned-to", className);
  const toggle = useController(ModalStack.create(open, close));

  const content = useMemo(() => {
    if (assigned) {
      return (
        <Fragment>
          Assigned to: <strong>{assigned.label}</strong>
        </Fragment>
      );
    }
    return <strong>Assign Task</strong>;
  }, [assigned]);

  const { list } = useDropDownPagination(fetchStaff, true);

  const table = useMemo(() => new HashList<IHTMLOption>(list, "value"), [list]);

  const onSelect = useCallback(
    (value: string) => {
      onChange(table.get(value));
    },
    [onChange, table],
  );

  const node = useClickOutside<HTMLDivElement, false>({
    open: isOpen,
    callback: () => {
      if (!Devices.IS_MOBILE_BROWSER) {
        toggle.close();
      }
    },
  });

  return (
    <div ref={node} className={classes}>
      <button onClick={toggle.open}>{content}</button>
      <OptionSelection<IHTMLOption, false>
        options={list}
        multiple={false}
        open={isOpen}
        title="Assign To"
        onChange={onSelect}
        blurInput={() => {}}
        close={toggle.close}
        value={assigned?.value ?? ""}
      />
    </div>
  );
});

interface Props {
  className?: string;
  assigned?: IHTMLOption;
  onChange: Callback<[IHTMLOption | undefined]>;
}

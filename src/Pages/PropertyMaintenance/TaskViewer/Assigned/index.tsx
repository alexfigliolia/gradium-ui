import { Fragment, memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { OptionSelection } from "Components/DropDown";
import { usePaginatedStaffList } from "Components/StaffDropDown/usePaginatedStaffList";
import { useMousePointerOutside } from "Hooks/useMousePointerOutside";
import { useToggle } from "Hooks/useToggle";
import { HashList } from "Tools/HashedList";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

export const Assigned = memo(function Assigned({
  assigned,
  className,
  onChange,
}: Props) {
  const [isOpen, toggle] = useToggle();
  const node = useMousePointerOutside<HTMLDivElement>(isOpen, toggle.close);
  const classes = useClassNames("assigned-to", className);

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

  const [list] = usePaginatedStaffList();

  const table = useMemo(() => new HashList<IHTMLOption>(list, "value"), [list]);

  const onSelect = useCallback(
    (value: string) => {
      onChange(table.get(value));
    },
    [onChange, table],
  );

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

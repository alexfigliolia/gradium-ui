import { memo } from "react";
import { OptionSelection } from "Components/DropDown";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { useMousePointerOutside } from "Hooks/useMousePointerOutside";
import { useToggle } from "Hooks/useToggle";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { StatusIcon } from "Pages/PropertyMaintenance/StatusIcon";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

export const Status = memo(function Status({ status, onChange }: Props) {
  const [isOpen, controller] = useToggle();
  const node = useMousePointerOutside<HTMLDivElement>(isOpen, controller.close);

  return (
    <div ref={node} className="status-selector">
      <button onClick={controller.open}>
        <StatusIcon status={status} />
        {DisplayController.displayStatus(status)}
      </button>
      <OptionSelection<IHTMLOption, false>
        multiple={false}
        open={isOpen}
        title="Select a Status"
        value={status}
        onChange={onChange}
        blurInput={() => {}}
        close={controller.close}
        options={DisplayController.statusOptions}
      />
    </div>
  );
});

interface Props {
  status: ManagementTaskStatus;
  onChange: Callback<[string]>;
}

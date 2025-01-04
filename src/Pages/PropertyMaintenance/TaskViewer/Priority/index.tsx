import { memo } from "react";
import { OptionSelection } from "Components/DropDown";
import type { ManagementTaskPriority } from "GraphQL/Types";
import { useMousePointerOutside } from "Hooks/useMousePointerOutside";
import { useToggle } from "Hooks/useToggle";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { PriorityIcon } from "Pages/PropertyMaintenance/PriorityIcon";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

export const Priority = memo(function Priority({ priority, onChange }: Props) {
  const [isOpen, controller] = useToggle();
  const node = useMousePointerOutside<HTMLDivElement>(isOpen, controller.close);

  return (
    <div ref={node} className="priority-selector">
      <button onClick={controller.open}>
        <PriorityIcon fill priority={priority} />{" "}
        {DisplayController.displayPriority(priority)}
      </button>
      <OptionSelection<IHTMLOption, false>
        multiple={false}
        open={isOpen}
        title="Select a Priority"
        value={priority}
        onChange={onChange}
        blurInput={() => {}}
        close={controller.close}
        options={DisplayController.priorityOptions}
      />
    </div>
  );
});

interface Props {
  priority: ManagementTaskPriority;
  onChange: Callback<[string]>;
}

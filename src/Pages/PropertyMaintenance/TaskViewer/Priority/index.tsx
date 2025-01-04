import { memo, useCallback, useState } from "react";
import { useClickOutside, useController } from "@figliolia/react-hooks";
import { OptionSelection } from "Components/DropDown";
import type { ManagementTaskPriority } from "GraphQL/Types";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { PriorityIcon } from "Pages/PropertyMaintenance/PriorityIcon";
import { Devices } from "Tools/Devices";
import { ModalStack } from "Tools/ModalStack";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

export const Priority = memo(function Priority({ priority, onChange }: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const controller = useController(ModalStack.create(open, close));

  const node = useClickOutside<HTMLDivElement, false>({
    open: isOpen,
    callback: () => {
      if (!Devices.IS_MOBILE_BROWSER) {
        controller.close();
      }
    },
  });

  return (
    <div ref={node} className="priority-selector">
      <button onClick={controller.open}>
        <PriorityIcon fill priority={priority} />{" "}
        {DisplayController.displayPriority(priority)}
      </button>
      <OptionSelection<IHTMLOption, false>
        multiple={false}
        open={isOpen}
        title="Priorities"
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

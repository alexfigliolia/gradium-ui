import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { OptionSelection } from "Components/DropDown";
import { useMousePointerOutside } from "Hooks/useMousePointerOutside";
import { useToggle } from "Hooks/useToggle";
import type { Callback } from "Types/Generics";
import type { IHTMLOption, OptionalChildren } from "Types/React";
import "./styles.scss";

function TaskSelectorComponent<T extends IHTMLOption>({
  value,
  title,
  options,
  children,
  onChange,
  className,
}: Props<T>) {
  const [isOpen, controller] = useToggle();
  const node = useMousePointerOutside<HTMLDivElement>(isOpen, controller.close);

  const classes = useClassNames("task-selector", className);
  return (
    <div ref={node} className={classes}>
      <button onClick={controller.open}>{children}</button>
      <OptionSelection<T, false>
        multiple={false}
        open={isOpen}
        title={title}
        value={value}
        onChange={onChange}
        blurInput={() => {}}
        close={controller.close}
        options={options}
      />
    </div>
  );
}

export const TaskSelector = memo(
  TaskSelectorComponent,
) as typeof TaskSelectorComponent;

interface Props<T extends IHTMLOption> extends OptionalChildren {
  value: string;
  title: string;
  options: T[];
  className?: string;
  onChange: Callback<[string]>;
}

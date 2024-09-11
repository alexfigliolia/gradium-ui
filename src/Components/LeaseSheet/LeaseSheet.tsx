import type { FormEvent } from "react";
import { memo, useCallback, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { createUseState } from "@figliolia/react-galena";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { DateInput } from "Components/DateInput";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { Building } from "Icons/Building";
import { Clock } from "Icons/Clock";
import { Price } from "Icons/Price";
import type { LeaseCRUDModel } from "Models/LeaseCRUD";
import { selectFormValues } from "State/LeaseCRUD";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";
import { Lessee } from "./Lessee";
import "./styles.scss";

const spaces = Array.from({ length: 10 }, (_, i) => ({
  label: (202 + i).toString(),
  value: i.toString(),
}));
if (Devices.IS_MOBILE_BROWSER) {
  spaces.unshift({ label: "", value: "" });
}

export default memo(function LeaseSheet({
  open,
  close,
  title,
  model,
  subtitle,
  onSubmit,
  className,
  actionText = "Create",
}: Props) {
  const form = useRef<HTMLFormElement>(null);
  const hook = useMemo(() => createUseState(model), [model]);
  const [unit, rate, start, end, lessees] = hook(selectFormValues);

  const onSelectUnit = useCallback(
    (values: Set<string>) => {
      model.setUnit(Array.from(values)[0] || "");
    },
    [model],
  );
  const validate = useCallback(() => {
    if (!form.current) {
      return true;
    }
    return form.current.checkValidity();
  }, []);
  const classes = useClassNames("lease-sheet", className);
  return (
    <Confirmation className={classes} open={open} close={close}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <form ref={form} className="options" onSubmit={onSubmit}>
        <DropDown
          required
          label="Space"
          list={spaces}
          name="living-space"
          icon={<Building />}
          value={new Set([unit])}
          onChange={onSelectUnit}
        />
        <h3>Term</h3>
        <div className="split">
          <DateInput
            required
            value={start}
            icon={<Clock />}
            name="start-date"
            label="Start Date"
            onChange={model.setStart}
          />
          <DateInput
            required
            value={end}
            name="end-date"
            label="End Date"
            icon={<Clock />}
            pickerLocationX="right"
            onChange={model.setEnd}
          />
        </div>
        <Input
          required
          name="rate"
          type="number"
          label="Rate"
          step={0.01}
          icon={<Price />}
          autoComplete="off"
          value={rate.toString()}
          onChange={model.setRate}
          className="number-input rate-input"
        />
        <h3>Lessees</h3>
        {lessees.map((person, i) => {
          return (
            <Lessee
              key={i}
              index={i}
              {...person}
              validate={validate}
              last={i === lessees.length - 1}
            />
          );
        })}
        <ActionButton type="submit" onClick={() => {}}>
          {actionText}
        </ActionButton>
      </form>
    </Confirmation>
  );
});

interface Props {
  open: boolean;
  close: Callback;
  className?: string;
  actionText?: string;
  title: string;
  subtitle?: string;
  model: LeaseCRUDModel;
  onSubmit: Callback<[event: FormEvent<HTMLFormElement>]>;
}

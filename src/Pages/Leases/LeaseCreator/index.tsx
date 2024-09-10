import type { FormEvent } from "react";
import { memo, useCallback, useRef } from "react";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { DateInput } from "Components/DateInput";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { Building } from "Icons/Building";
import { Clock } from "Icons/Clock";
import { Price } from "Icons/Price";
import { Modals, useModals } from "State/Modals";
import { NewLease, selectFormValues, useNewLease } from "State/NewLease";
import { Devices } from "Tools/Devices";
import { Lessee } from "./Lessees";
import "./styles.scss";

const spaces = Array.from({ length: 10 }, (_, i) => ({
  label: (202 + i).toString(),
  value: i.toString(),
}));
if (Devices.IS_MOBILE_BROWSER) {
  spaces.unshift({ label: "", value: "" });
}

export const LeaseCreator = memo(function LeaseCreator() {
  const form = useRef<HTMLFormElement>(null);
  const open = useModals(state => state.newLease);
  const [unit, rate, start, end, lessees] = useNewLease(selectFormValues);

  const onSelectUnit = useCallback((values: Set<string>) => {
    NewLease.setUnit(Array.from(values)[0] || "");
  }, []);
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);
  const validate = useCallback(() => {
    if (!form.current) {
      return true;
    }
    return form.current.checkValidity();
  }, []);
  return (
    <Confirmation
      className="new-lease"
      open={open}
      close={Modals.newLease.close}>
      <h2>Create Lease</h2>
      <p>
        Leases are your contractual obligations to a specific tenant or tenants
      </p>
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
            onChange={NewLease.setStart}
          />
          <DateInput
            required
            value={end}
            name="end-date"
            label="End Date"
            icon={<Clock />}
            pickerLocationX="right"
            onChange={NewLease.setEnd}
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
          onChange={NewLease.setRate}
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
          Create
        </ActionButton>
      </form>
    </Confirmation>
  );
});

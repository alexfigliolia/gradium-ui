import { useEffect, useState } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useController, useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { DateInput } from "Components/DateInput";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { LivingSpaceDropDown } from "Components/LivingSpaceDropDown";
import { AnonymousUploader } from "Components/UploaderGrid";
import { Clock } from "Icons/Clock";
import { Price } from "Icons/Price";
import { creating, Leases, scopedUnit, useLeases } from "State/Leases";
import { DisplayController } from "../DisplayController";
import { LeaseViewer } from "../LeaseViewer";
import { Controller } from "./Controller";
import { Lessees } from "./Lessees";
import "./styles.scss";

export const CreateLease = () => {
  const open = useLeases(creating);
  const initialUnit = useLeases(scopedUnit);
  const [state, setState] = useState(Controller.initialState(initialUnit));
  const controller = useController(new Controller(setState));

  const { loading, error, success, onSubmit } = useFormState(
    (_: FormData, setState: ILoadingStateSetter) => {
      const operation = controller.saveLease(state);
      void operation(setState);
    },
  );

  useEffect(() => {
    controller.setUnit(initialUnit);
  }, [initialUnit, controller]);

  return (
    <LeaseViewer
      open={open}
      className="create-lease"
      close={Leases.newLease.close}>
      <h2>New Lease</h2>
      <p>
        Creating leases will notify intended lessees signature and payment
        requirements
      </p>
      <form onSubmit={onSubmit}>
        <h3>Living Space</h3>
        <div className="split">
          <LivingSpaceDropDown
            required
            value={state.unit}
            multiple={false}
            onChange={controller.setUnit}
          />
          <Input
            required
            type="number"
            label="Rate"
            step={0.01}
            name="price"
            value={state.price}
            icon={<Price />}
            inputMode="decimal"
            autoComplete="off"
            onChange={controller.onChange}
            className="price-input"
          />
        </div>
        <DropDown
          required
          multiple={false}
          name="frequency"
          value={state.frequency}
          icon={<Clock />}
          label="Paid Each"
          title="Payment Frequency"
          onChange={controller.setFrequency}
          list={DisplayController.frequencyOptions}
        />
        <h3>Term</h3>
        <div className="split enforce">
          <DateInput
            required
            value={state.start}
            icon={<Clock />}
            name="start-date"
            label="Start Date"
            onChange={controller.setStart}
          />
          <DateInput
            required
            value={state.end}
            name="end-date"
            label="End Date"
            icon={<Clock />}
            onChange={controller.setEnd}
            pickerLocationX="right"
          />
        </div>
        <h3>Lessees</h3>
        <Lessees
          lessees={state.lessees}
          add={controller.addLessee}
          onDelete={controller.deleteLessee}
          onChange={controller.onChangeLessee}
        />
        <h3>Upload Documents</h3>
        <AnonymousUploader type="document" ref={controller.uploader} />
        <ActionButton loading={loading} error={!!error} success={success}>
          Create
        </ActionButton>
      </form>
    </LeaseViewer>
  );
};

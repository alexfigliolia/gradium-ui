import { useEffect, useState } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useController, useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { DateInput } from "Components/DateInput";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { LivingSpaceDropDown } from "Components/LivingSpaceDropDown";
import { createLease } from "GraphQL/Mutations/createLease.gql";
import type {
  CreateLeaseMutation,
  CreateLeaseMutationVariables,
  RentPaymentFrequency,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Clock } from "Icons/Clock";
import { Price } from "Icons/Price";
import { creating, Leases, scopedUnit, useLeases } from "State/Leases";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Dates } from "Tools/Dates";
import { DisplayController } from "../DisplayController";
import { Emitter } from "../EventEmitter";
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
      const { lessees, price, end, start, frequency, unit } = state;
      const client = new UIClient({
        setState,
        successMessage: `Your lease has been created. ${controller.compileNames(lessees)} been notified and invited to your organization as residents`,
      });
      void client.executeQuery<
        CreateLeaseMutation,
        CreateLeaseMutationVariables
      >(
        createLease,
        {
          lessees,
          price: parseFloat(price),
          livingSpaceId: parseInt(unit),
          propertyId: Properties.getState().current,
          paymentFrequency: frequency as RentPaymentFrequency,
          organizationId: Scope.getState().currentOrganizationId,
          end: Dates.setTime(Dates.fromISODateString(end)).toISOString(),
          start: Dates.setTime(Dates.fromISODateString(start)).toISOString(),
        },
        () => {
          controller.resetState();
          Leases.newLease.close();
          Emitter.emit("refetch", undefined);
        },
      );
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
        <ActionButton loading={loading} error={!!error} success={success}>
          Create
        </ActionButton>
      </form>
    </LeaseViewer>
  );
};

import type { ChangeEvent } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import {
  useController,
  useFormState,
  useTimeout,
} from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { PeopleDropDown } from "Components/PeopleDropDown";
import { RadioGroup } from "Components/RadioGroup";
import { TimeInput } from "Components/TimeInput";
import { UIClient } from "GraphQL/UIClient";
import { useEditableValue } from "Hooks/useEditableValue";
import { BasketballCourtFilled } from "Icons/BasketballCourt";
import { Clock } from "Icons/Clock";
import { Amenities, selectAmenities, useAmenities } from "State/Amenities";
import { AmenitySchedule } from "State/AmenitySchedule";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Dates } from "Tools/Dates";
import { Numbers } from "Tools/Numbers";
import { PropertyOptions } from "Tools/PropertyOptions";
import type { Callback } from "Types/Generics";
import { CancelButton } from "./CancelButton";
import { Controller } from "./Controller";
import "./styles.scss";

function ConfigureReservationComponent<
  QD extends Record<string, any>,
  QV extends Record<string, any>,
>({
  id,
  open,
  close,
  title,
  subtitle,
  successMessage,
  configureMutation,
  defaultEnd = "",
  defaultStart = "",
  defaultAmenity = "",
  defaultReserver = "",
  cancellable = false,
}: Props<QD, QV>) {
  const timeout = useTimeout();
  const amenities = useAmenities(selectAmenities);
  const list = useMemo(() => Controller.toHTML(amenities), [amenities]);

  const initialAmenity = useCallback(() => {
    return defaultAmenity ? defaultAmenity : Controller.getState(list);
  }, [defaultAmenity, list]);

  const initialState = useMemo(
    () => ({
      charge: "yes",
      end: defaultEnd,
      start: defaultStart,
      reserver: defaultReserver,
      amenityId: initialAmenity(),
    }),
    [defaultStart, defaultEnd, defaultReserver, initialAmenity],
  );

  const [state, setState] = useEditableValue(initialState);

  const controller = useController(new Controller(setState));

  const [name, price, billed] = useMemo(
    () => Controller.getMeta(state.amenityId),
    [state.amenityId],
  );

  const cost = useMemo(
    () => Controller.computeCost(price, billed, state.start, state.end),
    [price, billed, state.start, state.end],
  );

  const onChargeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      controller.set("charge", e.target.value);
    },
    [controller],
  );

  const getFormData = useCallback(() => {
    const { start, end, charge, reserver, amenityId } = state;
    const { currentDate } = AmenitySchedule.getState();
    const base = Dates.setTime(new Date(currentDate));
    return {
      date: base.toISOString(),
      charge: charge === "no" ? false : true,
      end: Dates.timeToDate(end, new Date(base)),
      start: Dates.timeToDate(start, new Date(base)),
      personId: Controller.toIdentifier(reserver),
      amenityId: Controller.toIdentifier(amenityId),
      organizationId: Scope.getState().currentOrganizationId,
      propertyId: Properties.getState().current,
    };
  }, [state]);

  const resetForm = useCallback(
    (delay = 400) => {
      if (cancellable) {
        return;
      }
      timeout.execute(() => {
        setState({
          end: "",
          start: "",
          charge: "yes",
          reserver: "",
          amenityId: initialAmenity(),
        });
      }, delay);
    },
    [initialAmenity, timeout, setState, cancellable],
  );

  const closeAndReset = useCallback(() => {
    close();
    resetForm();
  }, [resetForm, close]);

  const { loading, error, success, onSubmit } = useFormState((_, setState) => {
    const client = new UIClient({ setState, successMessage });
    const { mutation, variables, onSuccess } = configureMutation(getFormData());
    void client
      .executeQuery<QD, QV>(mutation, variables, closeAndReset)
      .then(onSuccess)
      .catch(() => {});
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm, controller]);

  return (
    <Confirmation open={open} close={close} className="reservation-configurer">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <form onSubmit={onSubmit}>
        <DropDown
          required
          list={list}
          name="amenity"
          label="Amenity"
          multiple={false}
          title="Amenities"
          value={state.amenityId}
          onChange={controller.setAmenity}
          icon={<BasketballCourtFilled />}
        />
        <div className="input-split">
          <TimeInput
            required
            icon={<Clock />}
            label="Start"
            value={state.start}
            onChange={controller.setStart}
          />
          <TimeInput
            required
            icon={<Clock />}
            label="End"
            value={state.end}
            onChange={controller.setEnd}
          />
        </div>
        <PeopleDropDown
          required
          multiple={false}
          label="Resident"
          value={state.reserver}
          onChange={controller.setReserver}
        />
        {parseFloat(
          Amenities.getById(parseInt(state.amenityId || "-1"))?.price,
        ) !== 0 && (
          <RadioGroup
            value={state.charge}
            onChange={onChargeChange}
            options={PropertyOptions.YES_NO}
            label="Create a charge for this reservation?"
          />
        )}
        {!!cost && state.charge === "yes" && !!state.reserver && (
          <div className="cost">
            <div>
              <h3>Balance:</h3>
              <p>{Numbers.formatCurrency(cost)}</p>
            </div>
            <p>
              (Reserving the {name} costs{" "}
              <span>{Numbers.formatCurrency(price)}</span> per {billed})
            </p>
          </div>
        )}
        <div className="submit-actions">
          {cancellable && typeof id === "number" && (
            <div>
              <CancelButton id={id} closeAndReset={closeAndReset} />
            </div>
          )}
          <div>
            <ActionButton loading={loading} error={!!error} success={success}>
              {cancellable ? "Update" : "Confirm"}
            </ActionButton>
          </div>
        </div>
      </form>
    </Confirmation>
  );
}

export const ConfigureReservation = memo(
  ConfigureReservationComponent,
) as typeof ConfigureReservationComponent;

interface Props<
  QD extends Record<string, any>,
  QV extends Record<string, any>,
> {
  id?: number;
  open: boolean;
  close: Callback;
  title: string;
  subtitle?: string;
  defaultEnd?: string;
  defaultStart?: string;
  cancellable?: boolean;
  defaultReserver?: string;
  defaultAmenity?: string;
  successMessage: string;
  configureMutation: Callback<[CRFormData], IReservationMutation<QD, QV>>;
}

export interface IReservationMutation<
  QD extends Record<string, any>,
  QV extends Record<string, any>,
> {
  variables: QV;
  mutation: string;
  onSuccess?: Callback<[QD]>;
}

export interface CRFormData {
  cancellable?: boolean;
  amenityId: number;
  personId: number;
  start: string;
  end: string;
  charge: boolean;
  date: string;
  propertyId: number;
  organizationId: number;
}

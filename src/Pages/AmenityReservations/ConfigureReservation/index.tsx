import type { ChangeEvent, ForwardedRef, RefObject } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  useController,
  useFormState,
  useTimeout,
} from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation, useEnabledClickOutside } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { PaginatedDropDown } from "Components/PaginatedDropDown";
import { RadioGroup } from "Components/RadioGroup";
import { TimeInput } from "Components/TimeInput";
import { UIClient } from "GraphQL/UIClient";
import { useEditableValue } from "Hooks/useEditableValue";
import { BasketballCourtFilled } from "Icons/BasketballCourt";
import { Clock } from "Icons/Clock";
import { User } from "Icons/User";
import { selectAmenities, useAmenities } from "State/Amenities";
import { AmenitySchedule } from "State/AmenitySchedule";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Dates } from "Tools/Dates";
import { Numbers } from "Tools/Numbers";
import { PropertyOptions } from "Tools/PropertyOptions";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import { DeleteButton } from "./DeleteButton";
import "./styles.scss";

function ConfigureReservationComponent<
  QD extends Record<string, any>,
  QV extends Record<string, any>,
>(
  {
    id,
    open,
    close,
    title,
    subtitle,
    deletable,
    successMessage,
    configureMutation,
    defaultEnd = "",
    defaultStart = "",
    defaultAmenity = "",
    defaultReserver = "",
  }: Props<QD, QV>,
  ref: ForwardedRef<Callback>,
) {
  const timeout = useTimeout();
  const amenities = useAmenities(selectAmenities);
  const list = useMemo(() => Controller.toHTML(amenities), [amenities]);

  const initialAmenity = useCallback(() => {
    return defaultAmenity ? defaultAmenity : Controller.getState(list);
  }, [defaultAmenity, list]);

  const initialState = useMemo(
    () => ({
      end: defaultEnd,
      start: defaultStart,
      charge: "yes",
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

  const [canClickOutside, enable, disable] = useEnabledClickOutside();

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
    return {
      end,
      start,
      charge: charge === "no" ? false : true,
      personId: Controller.toIdentifier(reserver),
      amenityId: Controller.toIdentifier(amenityId),
      organizationId: Scope.getState().currentOrganizationId,
      propertyId: Properties.getState().current,
      date: Dates.toDayPreciseISOString(AmenitySchedule.getState().currentDate),
    };
  }, [state]);

  const resetForm = useCallback(() => {
    timeout.execute(() => {
      setState({
        end: "",
        start: "",
        charge: "yes",
        reserver: "",
        amenityId: initialAmenity(),
      });
    }, 500);
  }, [initialAmenity, timeout, setState]);

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

  useImperativeHandle(ref, () => resetForm, [resetForm]);

  console.log(state.reserver);

  return (
    <Confirmation
      open={open}
      close={close}
      clickOutside={canClickOutside}
      className="reservation-configurer slim">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <form onSubmit={onSubmit}>
        <DropDown
          required
          list={list}
          name="amenity"
          label="Amenity"
          multiple={false}
          value={state.amenityId}
          onOpen={disable}
          onClose={enable}
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
        <PaginatedDropDown
          required
          prefetch
          name="user"
          multiple={false}
          label="Resident"
          icon={<User />}
          value={state.reserver}
          onOpen={disable}
          onClose={enable}
          fetch={Controller.fetchPeople}
          onChange={controller.setReserver}
        />
        <RadioGroup
          value={state.charge}
          onChange={onChargeChange}
          options={PropertyOptions.YES_NO}
          label="Create a charge for this reservation?"
        />
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
          {deletable && typeof id === "number" && (
            <DeleteButton id={id} closeAndReset={closeAndReset} />
          )}
          <ActionButton loading={loading} error={!!error} success={success}>
            Confirm
          </ActionButton>
        </div>
      </form>
    </Confirmation>
  );
}

export const ConfigureReservation = memo(
  forwardRef(ConfigureReservationComponent),
) as unknown as typeof ConfigureReservationComponent;

interface Props<
  QD extends Record<string, any>,
  QV extends Record<string, any>,
> {
  id?: number;
  open: boolean;
  close: Callback;
  title: string;
  deletable?: boolean;
  subtitle?: string;
  defaultEnd?: string;
  defaultStart?: string;
  defaultReserver?: string;
  defaultAmenity?: string;
  ref?: RefObject<Callback>;
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
  deletable?: boolean;
  amenityId: number;
  personId: number;
  start: string;
  end: string;
  charge: boolean;
  date: string;
  propertyId: number;
  organizationId: number;
}

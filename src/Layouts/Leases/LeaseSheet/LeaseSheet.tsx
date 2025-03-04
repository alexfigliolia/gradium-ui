import type { FormEvent } from "react";
import { memo, useCallback, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { createUseState } from "@figliolia/react-galena";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { DateInput } from "Components/DateInput";
import { Input } from "Components/Input";
import { PaginatedDropDown } from "Components/PaginatedDropDown";
import { identifySpacesOptions } from "GraphQL/Queries/identifySpaces.gql";
import { Building } from "Icons/Building";
import { Clock } from "Icons/Clock";
import { Price } from "Icons/Price";
import type { LeaseCRUDModel } from "Models/LeaseCRUD";
import { selectFormValues } from "State/LeaseCRUD";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Callback } from "Types/Generics";
import { Lessee } from "./Lessee";
import "./styles.scss";

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

  const validate = useCallback(() => {
    if (!form.current) {
      return true;
    }
    return form.current.checkValidity();
  }, []);

  const classes = useClassNames("lease-sheet", className);

  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    identifySpacesOptions(
      {
        limit: 10,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: data => data.identifySpaces.cursor,
        getPreviousPageParam: data => data.identifySpaces.cursor,
      },
    ),
  );

  const spaces = useMemo(
    () =>
      data?.pages?.flatMap?.(p =>
        p.identifySpaces.list.map(item => ({
          label: item.name,
          value: item.id.toString(),
        })),
      ) ?? [],
    [data?.pages],
  );

  return (
    <Confirmation className={classes} open={open} close={close}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <form ref={form} className="options" onSubmit={onSubmit}>
        <PaginatedDropDown
          value={unit}
          label="Space"
          list={spaces}
          multiple={false}
          loading={isFetching}
          name="living-space"
          icon={<Building />}
          title="Living Spaces"
          onChange={model.setUnit}
          fetchNextPage={fetchNextPage}
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
          inputMode="decimal"
          icon={<Price />}
          autoComplete="off"
          value={rate.toString()}
          onChange={model.setRate}
          className="rate-input"
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

export interface Props {
  open: boolean;
  close: Callback;
  className?: string;
  actionText?: string;
  title: string;
  subtitle?: string;
  model: LeaseCRUDModel;
  onSubmit: Callback<[event: FormEvent<HTMLFormElement>]>;
}

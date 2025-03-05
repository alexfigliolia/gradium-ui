import type { ChangeEvent } from "react";
import { Fragment, memo, useMemo } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import type { GradiumPerson } from "GraphQL/Types";
import { Add } from "Icons/Add";
import { Validators } from "Tools/Validators";
import type { Callback } from "Types/Generics";
import { Lessee } from "./Lessee";

export const Lessees = memo(function Lessees({
  add,
  lessees,
  onDelete,
  onChange,
}: Props) {
  const valid = useMemo(
    () =>
      lessees.some(
        l =>
          !!Validators.validateName(l.name) ||
          !!Validators.validateEmail(l.email),
      ),
    [lessees],
  );
  return (
    <Fragment>
      {!lessees.length && (
        <p className="warning">At lease one lessee is required</p>
      )}
      {lessees.map((lessee, i) => (
        <Lessee
          key={i}
          index={i}
          lessee={lessee}
          onChange={onChange}
          onDelete={onDelete}
        />
      ))}
      <GradientBorderButton
        type="button"
        onClick={add}
        disabled={valid}
        className="add-lessee">
        Add <Add />
      </GradientBorderButton>
    </Fragment>
  );
});

interface Props {
  add: Callback;
  lessees: Omit<GradiumPerson, "id">[];
  onDelete: (index: number) => () => void;
  onChange: (index: number) => (e: ChangeEvent<HTMLInputElement>) => void;
}

import type { ChangeEvent } from "react";
import { Fragment, memo, useCallback } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Input } from "Components/Input";
import { Add } from "Icons/Add";
import { At } from "Icons/At";
import { Trash } from "Icons/Trash";
import { User } from "Icons/User";
import type { ILessee } from "Models/NewLease";
import { NewLease } from "State/NewLease";
import type { Callback } from "Types/Generics";

export const Lessee = memo(function Lessees({
  name,
  email,
  index,
  last,
  validate,
}: Props) {
  const setName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      NewLease.updateLessee(index, { name: e.target.value, email });
    },
    [email, index],
  );
  const setEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      NewLease.updateLessee(index, { name, email: e.target.value });
    },
    [name, index],
  );

  const add = useCallback(() => {
    if (validate()) {
      NewLease.addLessee();
    }
  }, [validate]);

  const deleteEntry = useCallback(() => {
    NewLease.deleteLessee(index);
  }, [index]);

  return (
    <Fragment>
      <div className="split">
        <Input
          required
          type="text"
          label="Name"
          icon={<User />}
          autoComplete="off"
          value={name}
          onChange={setName}
        />
        <Input
          required
          type="email"
          label="Email"
          icon={<At />}
          autoComplete="off"
          value={email}
          onChange={setEmail}
        />
        {index !== 0 && (
          <button
            type="button"
            className="delete-lessee"
            aria-label="Delete Lessee"
            onClick={deleteEntry}>
            <Trash />
          </button>
        )}
      </div>
      {last && (
        <GradientBorderButton
          onClick={add}
          disabled={!name.length || !email.length}>
          Add <Add aria-hidden />
        </GradientBorderButton>
      )}
    </Fragment>
  );
});

interface Props extends ILessee {
  index: number;
  last: boolean;
  validate: Callback<[], boolean>;
}

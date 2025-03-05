import type { ChangeEvent } from "react";
import { memo, useMemo } from "react";
import { Input } from "Components/Input";
import type { GradiumPerson } from "GraphQL/Types";
import { At } from "Icons/At";
import { Trash } from "Icons/Trash";
import { User } from "Icons/User";

export const Lessee = memo(function Lessee({
  index,
  lessee,
  onChange,
  onDelete,
}: Props) {
  const update = useMemo(() => onChange(index), [onChange, index]);
  const deleteLessee = useMemo(() => onDelete(index), [onDelete, index]);
  return (
    <div className="split">
      <Input
        required
        type="text"
        label="Name"
        name="name"
        value={lessee.name}
        icon={<User />}
        autoComplete="off"
        onChange={update}
      />
      <Input
        required
        type="email"
        label="Email"
        name="email"
        inputMode="email"
        value={lessee.email}
        icon={<At />}
        autoComplete="off"
        onChange={update}
      />
      <button
        type="button"
        aria-label="Delete"
        onClick={deleteLessee}
        className="delete-lessee">
        <Trash />
      </button>
    </div>
  );
});

interface Props {
  index: number;
  lessee: Omit<GradiumPerson, "id">;
  onDelete: (index: number) => () => void;
  onChange: (index: number) => (e: ChangeEvent<HTMLInputElement>) => void;
}

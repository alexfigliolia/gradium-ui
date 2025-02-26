import { Trash } from "Icons/Trash";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const DeleteButton = ({ text, onClick }: Props) => {
  return (
    <button className="delete-maintenance-item" onClick={onClick}>
      <Trash />
      {text}
    </button>
  );
};

interface Props {
  text: string;
  onClick: Callback;
}

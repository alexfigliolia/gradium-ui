import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { TriangeLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import "./styles.scss";

export const AuthButton = memo(function AuthButton({ label, ...rest }: Props) {
  const classes = useClassNames("auth-button", rest);
  return (
    <button type="submit" className={classes}>
      {label}
      <TriangeLoader />
      <Check />
      <Error />
    </button>
  );
});

interface Props {
  label: string;
  error?: boolean;
  loading?: boolean;
  success?: boolean;
}

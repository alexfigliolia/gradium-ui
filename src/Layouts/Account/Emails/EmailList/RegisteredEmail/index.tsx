import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController, useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Input } from "Components/Input";
import { At } from "Icons/At";
import { selectTotalEmails, useScope } from "State/Scope";
import { Controller } from "./Controller";
import "./styles.scss";

export const RegisteredEmail = memo(function RegisteredEmail({ email }: Props) {
  const [update, setUpdate] = useState(email);
  const totalEmails = useScope(selectTotalEmails);

  const controller = useController(new Controller());
  controller.register(email);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUpdate(e.target.value);
  }, []);

  const { loading, error, success, onSubmit } = useFormState(
    controller.onSubmit,
  );

  const saveDisabled = useMemo(
    () => email === update && !loading,
    [email, update, loading],
  );

  const classes = useClassNames({ disabled: saveDisabled });

  return (
    <form className="registered-email" onSubmit={onSubmit}>
      <Input
        required
        type="email"
        label="Email"
        icon={<At />}
        name="email"
        inputMode="email"
        autoComplete="off"
        value={update}
        onChange={onChange}
      />
      <div>
        <GradientBorderButton
          type="button"
          disabled={totalEmails < 2}
          onClick={controller.deleteEmail}>
          Delete
        </GradientBorderButton>
        <ActionButton
          className={classes}
          loading={loading}
          error={!!error}
          success={success}
          tabIndex={saveDisabled ? -1 : undefined}>
          Save
        </ActionButton>
      </div>
    </form>
  );
});

interface Props {
  email: string;
}

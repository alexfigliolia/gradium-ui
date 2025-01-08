import { Fragment, memo } from "react";
import { Input } from "Components/Input";
import { At } from "Icons/At";
import { LockStroked } from "Icons/Lock";
import { Account } from "State/Account";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Login(_: Propless) {
    return (
      <Fragment>
        <Input
          required
          icon={<At />}
          type="email"
          label="Email"
          name="email"
          inputMode="email"
          autoComplete="email"
        />
        <Input
          required
          icon={<LockStroked />}
          type="password"
          label="Password"
          name="password"
          autoComplete="current-password"
        />
        <button
          type="button"
          className="forgot-password"
          onClick={Account.forgotPassword.open}>
          Forgot Password
        </button>
      </Fragment>
    );
  },
  () => true,
);

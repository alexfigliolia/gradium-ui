import { Fragment, memo } from "react";
import { Input } from "Components/Input";
import { At } from "Icons/At";
import { Lock } from "Icons/Lock";
import { Modals } from "State/Modals";
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
          autoComplete="email"
        />
        <Input
          required
          icon={<Lock />}
          type="password"
          label="Password"
          name="password"
          autoComplete="current-password"
        />
        <button
          type="button"
          className="forgot-password"
          onClick={Modals.forgotPassword.open}>
          Forgot Password
        </button>
      </Fragment>
    );
  },
  () => true,
);

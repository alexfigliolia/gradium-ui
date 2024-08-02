import { Fragment, memo } from "react";
import { Input } from "Components/Input";
import { GradientAt } from "Icons/GradientAt";
import { GradientLock } from "Icons/GradientLock";
import type { Propless } from "Types/React";

export default memo(
  function Login(_: Propless) {
    return (
      <Fragment>
        <Input
          required
          icon={<GradientAt id="gradientAt" />}
          type="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
        <Input
          required
          icon={<GradientLock id="gradientLock" />}
          type="password"
          label="Password"
          name="password"
          autoComplete="current-password"
        />
      </Fragment>
    );
  },
  () => true,
);

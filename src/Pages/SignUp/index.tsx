import { Fragment, memo } from "react";
import { Input } from "Components/Input";
import { GradientAt } from "Icons/GradientAt";
import { GradientLock } from "Icons/GradientLock";
import { GradientUser } from "Icons/GradientUser";
import type { Propless } from "Types/React";

export default memo(
  function SignUp(_: Propless) {
    return (
      <Fragment>
        <Input
          required
          icon={<GradientUser id="gradientUser" />}
          type="text"
          label="Name"
          name="name"
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
      </Fragment>
    );
  },
  () => true,
);

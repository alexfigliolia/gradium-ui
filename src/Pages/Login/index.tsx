import { Fragment, memo } from "react";
import { Input } from "Components/Input";
import { At } from "Icons/At";
import { Lock } from "Icons/Lock";
import type { Propless } from "Types/React";

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
      </Fragment>
    );
  },
  () => true,
);

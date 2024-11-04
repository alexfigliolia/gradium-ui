import { Fragment, memo } from "react";
import { Input } from "Components/Input";
import { At } from "Icons/At";
import { LockStroked } from "Icons/Lock";
import { User } from "Icons/User";
import type { Propless } from "Types/React";

export default memo(
  function SignUp(_: Propless) {
    return (
      <Fragment>
        <Input
          required
          icon={<User />}
          type="text"
          label="Name"
          name="name"
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
      </Fragment>
    );
  },
  () => true,
);

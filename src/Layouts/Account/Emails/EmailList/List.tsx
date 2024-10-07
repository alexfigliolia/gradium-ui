import { memo } from "react";
import { selectEmails, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { RegisteredEmail } from "./RegisteredEmail";

export const List = memo(
  function List(_: Propless) {
    const emails = useScope(selectEmails);
    return (
      <div className="email-list">
        {emails.map(({ email }) => {
          return <RegisteredEmail key={email} email={email} />;
        })}
      </div>
    );
  },
  () => true,
);

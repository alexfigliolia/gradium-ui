import { memo, useEffect, useRef } from "react";
import { useTimeout } from "@figliolia/react-hooks";
import { selectEmails, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { RegisteredEmail } from "./RegisteredEmail";
import "./styles.scss";

export const EmailList = memo(
  function EmailList(_: Propless) {
    const timeout = useTimeout();
    const emails = useScope(selectEmails);
    const length = useRef(emails.length);
    const scroller = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (emails.length > length.current) {
        timeout.execute(() => {
          scroller.current?.scrollTo?.({
            left: scroller.current.scrollWidth ?? 0,
            behavior: "smooth",
          });
        }, 200);
      }
      length.current = emails.length;
    }, [emails.length, timeout]);

    return (
      <div ref={scroller} className="email-list">
        {emails.map(({ email }) => (
          <div key={email}>
            <RegisteredEmail email={email} />
          </div>
        ))}
      </div>
    );
  },
  () => true,
);

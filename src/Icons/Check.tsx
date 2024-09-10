import { memo } from "react";
import type { OptionalChildren } from "Types/React";

export const Check = memo(function Check({ children }: OptionalChildren) {
  return (
    <svg
      className="check-icon"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden={true}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 5L8 15l-5-4"
      />
      {children}
    </svg>
  );
});

import { memo } from "react";
import { getToasts, useToasts } from "State/Toasts";
import type { Propless } from "Types/React";
import { Toast } from "./Toast";
import "./styles.scss";

export const Toaster = memo(
  function Toaster(_: Propless) {
    const toasts = useToasts(getToasts);
    return (
      <div className="toaster">
        {toasts.mapReverse(toast => {
          return <Toast key={toast.id} {...toast} />;
        })}
      </div>
    );
  },
  () => true,
);

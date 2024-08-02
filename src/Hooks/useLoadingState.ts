import { useCallback, useState } from "react";

export type IStateKey = "error" | "loading" | "success";
export type IStateValue<T extends IStateKey> = T extends "error"
  ? boolean | string
  : boolean;

export type IStateSetter<T extends IStateKey = IStateKey> = (
  state: T,
  value: IStateValue<T>,
) => void;

export const useLoadingState = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const setState = useCallback(
    <T extends IStateKey>(state: T, value: IStateValue<T>) => {
      switch (state) {
        case "error":
          return setError(value);
        case "loading":
          return setLoading(value as boolean);
        case "success":
          return setSuccess(value as boolean);
      }
    },
    [],
  );
  const resetState = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setError(false);
  }, []);
  return { loading, success, error, setState, resetState };
};

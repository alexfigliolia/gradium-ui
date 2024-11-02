import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export const useEditableValue = <T>(
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue];
};

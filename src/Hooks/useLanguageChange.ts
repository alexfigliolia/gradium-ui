import { useEffect } from "react";
import { LanguageHandler } from "Tools/LanguageHandler";
import type { Callback } from "Types/Generics";
import { useStableCallback } from "./useStableCallback";

export const useLanguageChange = (callback: Callback) => {
  const onChange = useStableCallback(callback);
  useEffect(() => {
    const subscription = LanguageHandler.subscribe(onChange.current);
    return () => {
      LanguageHandler.unsubscribe(subscription);
    };
  }, [onChange]);
};

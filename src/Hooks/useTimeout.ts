import { useEffect, useRef } from "react";
import { Timeout } from "Generics/Timeout";

export const useTimeout = () => {
  const timeout = useRef(new Timeout());

  useEffect(() => {
    const { current } = timeout;
    return () => {
      current.clear();
    };
  }, []);
  return timeout.current;
};

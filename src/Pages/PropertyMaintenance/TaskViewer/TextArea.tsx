import type { TextareaHTMLAttributes } from "react";
import { memo, useCallback, useEffect, useRef } from "react";
import { SizeObserver } from "@figliolia/size-observer";

export const TextArea = memo(function TextArea({
  value,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const node = useRef<HTMLTextAreaElement>(null);

  const onChange = useCallback(() => {
    if (!node.current) {
      return;
    }
    node.current.style.height = "5px";
    node.current.style.height = `${node.current.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    onChange();
  }, [value, onChange]);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new SizeObserver(node.current, {
      onChange,
      width: true,
      height: true,
    });
    return () => {
      observer.destroy();
    };
  }, [onChange]);

  return <textarea ref={node} {...rest} value={value} />;
});

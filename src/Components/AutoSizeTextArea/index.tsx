import type { TextareaHTMLAttributes } from "react";
import { memo, useCallback, useEffect, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { SizeObserver } from "@figliolia/size-observer";

export const AutoSizeTextArea = memo(function AutoSizeTextArea({
  value,
  className,
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

  const classes = useClassNames("auto-sizing-textarea", className);

  return <textarea ref={node} {...rest} className={classes} value={value} />;
});

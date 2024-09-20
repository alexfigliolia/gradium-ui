import type { CSSProperties, HTMLAttributes } from "react";
import { memo, useMemo } from "react";
import type { Callback } from "Types/Generics";

export const SplitText = memo(function SplitText({
  Tag,
  text,
  splitter = "",
  styleFn = (_1, _2) => undefined,
  ...rest
}: Props) {
  const tokens = useMemo(() => text.split(splitter), [text, splitter]);
  return (
    <Tag aria-label={text} {...rest}>
      {tokens.map((token, i) => {
        return (
          <span aria-hidden key={i} style={styleFn(i, token)}>
            {token}
          </span>
        );
      })}
    </Tag>
  );
});

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  splitter?: string;
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  styleFn?: Callback<[number, string], CSSProperties | undefined>;
}

import { memo } from "react";

export const ImageLink = memo(function ImageLink({ url }: Props) {
  return (
    <div className="image-link">
      <a href={url} target="_blank" rel="noreferrer">
        <img src={url} alt="task attachment" />
      </a>
    </div>
  );
});

interface Props {
  url: string;
}

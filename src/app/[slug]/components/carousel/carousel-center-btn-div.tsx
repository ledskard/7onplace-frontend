import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type CenterButtonDivProps = ComponentProps<"div">;

export const CenterButtonDiv = ({
  className,
  ...props
}: CenterButtonDivProps) => {
  return (
    <div
      className={twMerge(
        "absolute z-[19] container-button-swiper px-4",
        className,
      )}
      {...props}
    />
  );
};

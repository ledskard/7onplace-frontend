import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AdvertExternalLinkProps = ComponentProps<"a">;

export const AdvertExternalLink = ({
  className,
  ...props
}: AdvertExternalLinkProps) => {
  return <a className={twMerge(className)} {...props} />;
};

import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";

type ModelSocialMediaProps = ComponentProps<"a"> & {
  icon: ElementType;
  flags: string[] | any;
  social?: "tiktok" | "instagram" | "twitter";
};

export const ModelDetailsSocialMedia = ({
  className,
  icon,
  href,
  flags,
  social,
  ...props
}: ModelSocialMediaProps) => {
  const Icon = icon;

  const isPro =
    flags && flags.map((flag: any) => flag.includes("enable_social_media"));
  if (href === "#" || href === null || !href || !isPro) {
    return (
      <div>
        <Icon
          className={`w-7 h-7 text-gray-600 ${
            social === "tiktok" && "h-5 w-5"
          }`}
        />
      </div>
    );
  }

  return (
    <div>
      <a {...props} href={href} target="_blank">
        <Icon
          className={twMerge(
            "text-red-main/80 w-7 h-7 cursor-pointer",
            social === "tiktok" && "w-5 h-5",
            className
          )}
        />
      </a>
    </div>
  );
};

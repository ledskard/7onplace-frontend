import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";

type ModelSocialMediaProps = ComponentProps<"a"> & {
  icon: ElementType;
  social?: "tiktok" | "instagram" | "twitter";
};

export const ModelDetailsSocialMedia = ({
  className,
  icon,
  href,
  social,
  ...props
}: ModelSocialMediaProps) => {
  console.log(href);
  const Icon = icon;
  if (href === "#" || href === null || !href) {
    return (
      <div>
        <Icon
          className={`w-7 h-7 text-gray-600 ${
            social === "tiktok" && "h-6 w-6"
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

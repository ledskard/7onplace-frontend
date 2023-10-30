"use client";
import { Eye } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type ViewrsContainer = ComponentProps<"div">;

export const ViewrsContainer = ({ className, ...props }: ViewrsContainer) => {
  function formatValue(value: number) {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + " Bi";
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + " M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + " K";
    } else {
      return value;
    }
  }

  function generateRandomValue() {
    const randomValue = Math.floor(Math.random() * (20000 - 19000) + 1) + 19000;

    return randomValue;
  }

  const [value, setValue] = useState(19454);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(generateRandomValue());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={twMerge(
        "max-w-fit flex gap-2 items-center justify-center",
        className
      )}
      {...props}
    >
      <Eye className="text-red-main w-8 h-8" />
      <p>{formatValue(value)}</p>
      <p>Visualizadores</p>
    </div>
  );
};

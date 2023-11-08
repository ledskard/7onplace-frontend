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

  
  const [value, setValue] = useState(15000);
  
  function generateRandomValue(currentValue: any) {
    const min = Math.max(currentValue - 1000, 12000);
    const max = Math.min(currentValue + 1000, 20000);
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue;
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => {
        const newValue = generateRandomValue(prevValue);
        return newValue;
      });
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

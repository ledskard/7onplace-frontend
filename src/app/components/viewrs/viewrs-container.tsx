"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { useView } from '@/hooks/use-view';
import { Eye } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ViewrsContainer = ComponentProps<"div">;

export const ViewrsContainer = ({ className, ...props }: ViewrsContainer) => {
  const { numberView } = useView()

  return (
    <div
      className={twMerge(
        "max-w-fit flex gap-2 items-center justify-center",
        className
      )}
      {...props}
    >
      <Eye className="text-red-main w-8 h-8" />
      {numberView ? numberView :  <Skeleton className='h-6 w-11'  />}
      <p>Visualizadores</p>
    </div>
  );
};


import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AdvertRootProps = ComponentProps<"div">;

const word =
  "A<br/>N<br/>U<br/>N<br/>C<br/>I<br/>E<br/> <br/>A<br/>Q<br/>U<br/>I<br/>";

export const AdvertRoot = ({ className, ...props }: AdvertRootProps) => {
  return (
    <div
      className={twMerge(
        "tablet:sticky tablet:h-[85vh] bottom-4 bg-gray-400  absolute mx-auto w-10/12 tablet:max-w-[180px] text-center flex items-center justify-center text-black font-medium tablet:p-0 py-2 rounded md:rounded-md min-h-[10vh] cursor-pointer left-[8%]",
        className
      )}
      {...props}
    >
      <div className="tablet:block hidden text-2xl font-bold">
        <h1 dangerouslySetInnerHTML={{ __html: word }}></h1>
      </div>
      <div className="tablet:hidden block font-semibold text-2xl md:text-3xl">
        ANUNCIE AQUI
      </div>
    </div>
  );
};

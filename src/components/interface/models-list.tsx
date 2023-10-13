import Link from "next/link";
import { Card } from "./card-models";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string;
  query: string;
};

export async function ModelsList({
  modelType,
  className,
  query,
  ...props
}: ModelsListType) {
  const model: ModelsFilterProps[] = await getModelsByFilter(modelType);

  return (
    <section
      className={twMerge(
        "grid lg:grid-cols-3 gap-4 grid-cols-2 w-full mx-auto items-center justify-center z-0",
        className
      )}
      {...props}
    >
      {model.length > 0 &&
        model
          .filter((mod) =>
            query ? mod.username.toLowerCase().includes(query) : mod
          )
          .map((model) => {
            return (
              <Card.Root key={model.id}>
                <Link
                  href={`model/${model.id}`}
                  className="z-20 absolute inset-0"
                  key={model.id}
                />
                <Card.Img
                  src={model.images[0]?.url ?? "/default-profile.jpg"}
                  alt={model.username}
                />
                <Card.ContentDiv>
                  <Card.Img
                    className="w-[30px] h-[30px] object-cover aspect-square object-center md:w-[45px] top-[-19%] md:h-[45px] rounded-full shadow-md shadow-gray-500 absolute"
                    src={model.profileImage?.url ?? "/default-profile.jpg"}
                    alt={model.username}
                  />
                  <Card.Name>{model.username}</Card.Name>
                  <Card.Fav favorites={model.likes} />
                </Card.ContentDiv>
              </Card.Root>
            );
          })}
    </section>
  );
}

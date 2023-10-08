import Link from "next/link";
import { Card } from "./card-models";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string;
};

export async function ModelsList({
  modelType,
  className,
  ...props
}: ModelsListType) {
  const model: ModelsFilterProps[] = await getModelsByFilter(modelType);

  return (
    <section
      className={twMerge(
        "grid md:grid-cols-3 gap-4 grid-cols-2 w-full mx-auto items-center justify-center",
        className
      )}
      {...props}
    >
      {model.length > 0 &&
        model.map((model) => (
          <Link href={`model/${model.id}`} key={model.id}>
            <Card.Root key={model.id}>
              <Card.Img src={model.images[0].url} alt={model.username} />
              <Card.ContentDiv>
                <Card.Img
                  className="w-[30px] h-[30px] object-cover aspect-square object-center md:w-[45px] top-[-19%] md:h-[45px] rounded-full shadow-md shadow-gray-500 absolute"
                  src={model.images[0].url}
                  alt={model.username}
                />
                <Card.Name>{model.username}</Card.Name>
                <Card.Fav favorites={model.likes} />
              </Card.ContentDiv>
            </Card.Root>
          </Link>
        ))}
    </section>
  );
}

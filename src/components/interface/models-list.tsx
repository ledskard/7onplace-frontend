import Link from "next/link";
import { Card } from "./card-models";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";
import dbLocal from "../../../dblocal.json";

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
  // const model: ModelsFilterProps[] = await getModelsByFilter(modelType);
  const model = dbLocal;

  return (
    <section
      className={twMerge(
        "grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full mx-auto items-center justify-center z-0",
        className
      )}
      {...props}
    >
      {model.length > 0 &&
        model
          .filter((mod) =>
            query ? mod.username.toLowerCase().includes(query) : mod
          )
          .sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((model) => {
            return (
              <Card.Root key={model.id}>
                <Card.Delete modelId={model.id} />
                <Link
                  href={`model/${model.id}`}
                  className="z-20 absolute inset-0"
                  key={model.id}
                />
                <Card.Img
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                  src={model.images[0]?.url ?? "/default-profile.jpg"}
                  alt={model.username}
                />
                <Card.ContentDiv>
                  <Card.Img
                    className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] object-cover aspect-square object-center md:min-w-[45px] top-[-28%] md:min-h-[45px] sm:min-w-[45px] sm:min-h-[45px] rounded-full shadow-md shadow-gray-500 absolute"
                    src={model.profileImage?.url ?? "/default-profile.jpg"}
                    alt={model.username}
                  />
                  <Card.Name>{model.username}</Card.Name>
                  <Card.Fav modelId={model.id} favorites={model.likes} />
                </Card.ContentDiv>
              </Card.Root>
            );
          })}
    </section>
  );
}

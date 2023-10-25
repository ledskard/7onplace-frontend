import Link from "next/link";
import { Card } from "./card-models";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";
import dbLocal from "../../../dblocal.json";
import Image from 'next/image';

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
  // const model = dbLocal;


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
                {/* <Link
                  href={`model/${model.id}`}
                  className="z-20 absolute inset-0"
                  key={model.id}
                /> */}
                <div className='border relative flex-1 overflow-hidden bg-blue-400 max-h-[500px] h-full'>
                  <Card.Img
                    src={model.images[0]?.url ?? "/default-profile.jpg"}
                    alt={model.username}
                  />
                </div>
                <Card.ContentDiv>
                  <Image
                    className="rounded-full w-14 h-14 object-cover object-center absolute top-0 -translate-y-1/2"
                    src={model.profileImage?.url ?? "/default-profile.jpg"}
                    alt={model.username}
                    width={56}
                    height={56}
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

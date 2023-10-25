import Link from "next/link";
import { Card } from "./card-models";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";
import dbLocal from "../../../dblocal.json";
import { Adverts } from "@/app/components/advert";
import Image from "next/image";

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

  const modelsWithAds: React.ReactNode[] = [];
  const addsImg = dbLocal.filter((mod) => {
    return mod.id === "1" || mod.id === "2" || mod.id === "3";
  });

  model
    .filter((mod) => (query ? mod.username.toLowerCase().includes(query) : mod))
    .sort((a, b) => b.likes - a.likes)
    .forEach((model, index) => {
      modelsWithAds.push(
        <>
          <div key={model.id}>
            <Card.Root>
              <Card.Actions>
                <Card.Delete modelId={model.id} />
                <Card.Edit modelId={model.id} />
              </Card.Actions>
              <Link
                href={`model/${model.id}`}
                className="z-20 absolute inset-0"
                key={model.id}
              />
              <div className="relative flex-1 overflow-hidden max-h-[500px] h-full object-fill object-top">
                <Card.Img
                  src={model.images[0]?.url ?? "/default-profile.jpg"}
                  alt={model.username}
                />
              </div>
              <Card.ContentDiv>
                <Image
                  className="rounded-full sm:w-14 sm:h-14 h-9 w-9 object-cover object-center absolute top-0 -translate-y-1/2"
                  src={model.profileImage?.url ?? "/default-profile.jpg"}
                  alt={model.username}
                  width={56}
                  height={56}
                />
                <Card.Name>{model.username}</Card.Name>
                <Card.Fav modelId={model.id} favorites={model.likes} />
              </Card.ContentDiv>
            </Card.Root>
          </div>
          {(index + 1) % 6 === 0 && (
            <div
              key={`ad-${index}`}
              className="text-center text-white min-h-[100px] md:min-h-[200px] p-4 col-span-2 xl:col-span-3 relative rounded overflow-hidden"
            >
              <Image
                className="object-cover object-center"
                fill
                src={addsImg[index].profileImage?.url ?? "/default-profile.jpg"}
                alt={model.username}
              />
              {/* <div className="text-lg font-bold">ANUNCIE AQUI</div> */}
            </div>
          )}
        </>
      );
    });

  return (
    <section
      className={twMerge(
        "grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full mx-auto items-center justify-center z-0",
        className
      )}
      {...props}
    >
      {modelsWithAds}
    </section>
  );
}

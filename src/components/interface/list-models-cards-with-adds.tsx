import { ModelsFilterProps } from "@/types/model/models-filter-props";
import Image from "next/image";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./card-models";
import Link from "next/link";

type ListModelsCardsWithAddsProps = ComponentProps<"section"> & {
  models: Array<ModelsFilterProps>;
  cardsPerAdd?: number;
  query: string;
};

export const ListModelsCardsWithAdds = ({
  className,
  cardsPerAdd = 6,
  query,
  models,
  ...props
}: ListModelsCardsWithAddsProps) => {
  const addsImg = models.filter((mod) => {
    return mod;
  });

  return (
    <section
      className={twMerge(
        "grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full mx-auto items-center justify-center z-0",
        className
      )}
      {...props}
    >
      {models.map((model, index) => {
        return (
          <React.Fragment key={model.id}>
            <CardModel model={model} />
            {index % cardsPerAdd === cardsPerAdd - 1 &&
              index !== models.length - 1 && (
                <div
                  key={`ad-${index}`}
                  className="text-center text-white min-h-[100px] md:min-h-[200px] p-4 col-span-2 xl:col-span-3 relative rounded overflow-hidden"
                >
                  <Image
                    className="object-cover object-center"
                    fill
                    src={
                      addsImg[index].profileImage?.url ?? "/default-profile.jpg"
                    }
                    alt={model.username}
                  />
                  <div className="text-lg font-bold">ANUNCIE AQUI</div>
                </div>
              )}
          </React.Fragment>
        );
      })}
    </section>
  );
};

const CardModel = ({ model }: { model: ModelsFilterProps }) => {
  return (
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
        <div className="relative flex-1 overflow-hidden max-h-[500px] h-full">
          <Card.Img
            src={model.images[0]?.url ?? "/default-profile.jpg"}
            alt={model.username}
            className="object-cover object-top hover:scale-90"
          />
        </div>
        <Card.ContentDiv>
          <Image
            className="rounded-full sm:w-14 sm:h-14 h-9 w-9 object-cover object-top absolute top-0 -translate-y-1/2 shadow-md shadow-slate-500"
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
  );
};

import { ModelsFilterProps } from "@/types/model/models-filter-props";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./card-models";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
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
  let adCount = 0;

  return (
    <section
      className={twMerge(
        "grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full mx-auto items-center justify-center z-0",
        className
      )}
      {...props}
    >
      {models.map((model, index) => {
        if (index > 0 && index % cardsPerAdd === 0) {
          adCount++;
          return (
            <div
              key={`ad-${adCount}`}
              className="text-center text-white min-h-[100px] sm:min-h-[300px] p-4 col-span-2 xl:col-span-3 relative rounded overflow-hidden"
            >
              <a
                href="https://wa.me//48991013165?text=Gostaria%20de%20anunciar%20no%20marketplace%20da%207%20On%20Sexy"
                target="_blank"
              >
                <Image
                  className="aspect-[12/9] object-fill object-center"
                  fill
                  src={adCount === 6 ? "/ad-7onsexy.png" : "/default-ads.png"}
                  alt={model.username}
                />
              </a>
            </div>
          );
        }

        return (
          <React.Fragment key={model.id}>
            <CardModel model={model} />
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
        {model &&
          model.featureFlags &&
          model.featureFlags.length > 0 &&
          model.featureFlags.map((flag) => {
            if (flag.name === "enable_star") {
              return (
                
                <AiFillStar
                  key={flag.id}
                  className="md:w-8 md:h- h-8 w-8 text-yellow-500 self-start absolute top-3 left-3 z-[10]"
                />
              );
            }
          })}
        <Card.Actions>
          <Card.Delete modelId={model.id} />
          <Card.Edit model={model} />
        </Card.Actions>
        <Link
          href={`model/${model.id}`}
          className="z-20 absolute inset-0"
          key={model.id}
          prefetch={false}
          aria-label={model.username}
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

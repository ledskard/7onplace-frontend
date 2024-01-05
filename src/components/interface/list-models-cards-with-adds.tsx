import { ModelsFilterProps } from "@/types/model/models-filter-props";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./card-models";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { modelAddsConfig } from "@/config/model-add.config";

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
  let clicleAds: number = -1;

  return (
    <section
      className={twMerge(
        "grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full mx-auto items-center justify-center z-0",
        className
      )}
      {...props}
    >
      {models.map((model, index) => {
        const isVisibleAdds =
          index % cardsPerAdd === cardsPerAdd - 1 &&
          index !== models.length - 1;

        if (isVisibleAdds) {
          clicleAds = clicleAds + 1;
        }

        return (
          <React.Fragment key={model.id}>
            <CardModel model={model} />
            {isVisibleAdds && <CardModelAdds cicle={clicleAds} />}
          </React.Fragment>
        );
      })}
    </section>
  );
};
const CardModel = ({ model }: { model: ModelsFilterProps }) => {
  const username = model.username;
  const cleanUsername = username.replace(/\s+/g, "");
  const url = `/${cleanUsername}`;
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
          href={`/${cleanUsername}`}
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
            className="rounded-full sm:w-20 sm:h-20 h-9 w-9 object-cover object-top absolute top-0 -translate-y-1/2 shadow-md shadow-slate-500"
            src={model.profileImage?.url ?? "/default-profile.jpg"}
            alt={model.username}
            width={56}
            height={56}
          />
          <Card.Name className="sm:pt-3">{model.username}</Card.Name>
          <Card.Fav modelName={model.username} favorites={model.likes} />
        </Card.ContentDiv>
      </Card.Root>
    </div>
  );
};

type CardModelAddsProps = {
  cicle: number;
};

const CardModelAdds = ({ cicle }: CardModelAddsProps) => {
  const imagesAds = modelAddsConfig;
  const imagesAdsCicle = imagesAds.ads[cicle];

  const isExistsImage = imagesAdsCicle
    ? imagesAdsCicle
    : modelAddsConfig.default;

  return (
    <div className="text-center text-white min-h-[100px] sm:min-h-[300px] p-4 col-span-2 xl:col-span-3 relative rounded overflow-hidden">
      <a href={isExistsImage.href} target="_blank">
        <Image
          className="aspect-[16/7] object-fill object-center"
          fill
          src={isExistsImage.image}
          alt={isExistsImage.alt}
        />
      </a>
    </div>
  );
};

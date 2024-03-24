import Image from "next/image";
import Link from "next/link";
import React, { ComponentProps } from "react";
import { AiFillStar } from "react-icons/ai";

import { modelAddsConfig } from "@/config/model-add.config";
import { ModelsProps } from "@/types/model/models-filter-props";
import { twMerge } from "tailwind-merge";

import { Card } from "./card-models";

type ListModelsCardsWithAddsProps = ComponentProps<"section"> & {
  models: ModelsProps[];
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

  // if (!models || models?.length > 0) {
  //   return null;
  // }

  return (
    <section
      className={twMerge(
        "grid gap-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full mx-auto items-center justify-center z-0",
        className,
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

const CardModel = ({ model }: { model: ModelsProps }) => {
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
          <Card.Delete modelId={model.username} />
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
            src={
              model?.coverImage?.url ??
              model.images?.[0]?.url ??
              "/default-profile.jpg"
            }
            alt={model.username}
            className="object-cover object-top hover:scale-90"
          />
        </div>
        <Card.ContentDiv>
          <Image
            className="rounded-full sm:w-20 sm:h-20 h-12 w-12 object-cover object-top absolute top-0 -translate-y-1/2 shadow-md shadow-slate-500"
            src={model.profileImage?.url ?? "/default-profile.jpg"}
            alt={model.username}
            width={56}
            height={56}
          />
          <Card.Name className="sm:pt-3 pt-2.5">{model.username}</Card.Name>
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
    <div className="text-center text-white min-h-[80px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[260px] p-4 col-span-2 xl:col-span-3 relative rounded overflow-hidden">
      <a href={isExistsImage.href} target="_blank" rel="noreferrer">
        <Image
          className="aspect-video object-fill object-center"
          fill
          src={isExistsImage.image}
          alt={isExistsImage.alt}
        />
      </a>
    </div>
  );
};

import Link from "next/link";
import { Card } from "./card-models";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string;
};

const dataModels = [
  {
    id: 1,
    username: "katia",
    location: "brasil",
    description: "puta virtual",
    likes: 2,
    telegramVip: "https://localhost/saop",
    telegramFree: "https://localhost/saop",
    images: [
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
    ],
  },
  {
    id: 2,
    username: "Cunha",
    location: "Brazil",
    description: "putinha da maconha virtual",
    likes: 2,
    telegramVip: "https://localhost/saop",
    telegramFree: "https://localhost/saop",
    images: [
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
    ],
  },
  {
    id: 3,
    username: "Pablo",
    location: "Brazil",
    description: "putinha do site virtual",
    likes: 2,
    telegramVip: "https://localhost/saop",
    telegramFree: "https://localhost/saop",
    images: [
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
    ],
  },
];

export async function ModelsList({
  modelType,
  className,
  ...props
}: ModelsListType) {
  // const modelsByFilter = await fetch(`/${type}`)

  return (
    <section
      className={twMerge(
        "grid md:grid-cols-3 gap-4 grid-cols-2 w-full mx-auto items-center justify-center",
        className
      )}
      {...props}
    >
      {dataModels.length > 0 &&
        dataModels.map((model) => (
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

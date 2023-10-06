import { Card } from "./card-models";
import testmodels from '../../../testmodels.json'
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string
}

const dataModels = {
  "id": 3,
  "username": "Pablo",
  "location": "Brazil",
  "description": "putinha do site virtual",
  "likes": 2,
  "telegramVip": "https://localhost/saop",
  "telegramFree": "https://localhost/saop",
  "type": "mulheres",
  "images": [
    {
      "id": 1,
      "url": "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
      "name": "imagem"
    },
    {
      "id": 1,
      "url": "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
      "name": "imagem"
    }
  ]
}
console.log(dataModels)
export async function ModelsList({modelType, className, ...props}: ModelsListType) {

  // const modelsByFilter = await fetch(`/${type}`)

  return (
    // <section className={twMerge("md:grid-cols-3 gap-4 grid-cols-2 w-full items-center justify-center", className)} {...props}>
    <div className={twMerge("md:grid-cols-3 gap-4 grid-cols-2 w-full items-center justify-center", className)}>
        <Card.Root key={dataModels.id}>
          <Card.Img src={dataModels.images[0].url} alt={dataModels.username} />
          <Card.Name>{dataModels.username}</Card.Name>
          <Card.Fav favorites={dataModels.likes} />
        </Card.Root>  
    </div>  
    // </section>
  );
}

import { Button } from "@/components/ui/button";
import { CarouselRoot } from "./components/carousel/carousel-root";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";
import { incrementLike } from "@/utils/increment-like-to-model";
import { getDataById } from "@/utils/get-model-by-id";

export default async function Model({ params }: { params: { slug: string } }) {
  const dataModel = await getDataById(params.slug);

  await incrementLike(params.slug);

  return (
    <main className="w-10/12 max-w-5xl mx-auto py-10">
      <CarouselRoot model={dataModel} />
      <FlexDiv col>
        <AboutModel.Heading>sobre:</AboutModel.Heading>
        <AboutModel.Description>{dataModel.description}</AboutModel.Description>
        <a href={dataModel.telegramVip} target="_blank">
          <Button>telegram vip</Button>
        </a>
        <a href={dataModel.telegramFree} target="_blank">
          <Button>canal free</Button>
        </a>
      </FlexDiv>
    </main>
  );
}

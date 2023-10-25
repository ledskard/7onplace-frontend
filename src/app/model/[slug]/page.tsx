import { Button } from "@/components/ui/button";
import { CarouselRoot } from "./components/carousel/carousel-root";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";
import { incrementLike } from "@/utils/increment-like-to-model";
import { getDataById } from "@/utils/get-model-by-id";

export default async function Model({ params }: { params: { slug: string } }) {
  const [dataModel] = await Promise.all([
    getDataById(params.slug),
    incrementLike(params.slug),
  ]);
  console.log(dataModel);
  return (
    <main className="w-10/12 max-w-xl mx-auto min-h-[94vh] m-auto flex items-center justify-center sm:py-4">
      <div className="w-full md:my-4 my-10">
        <CarouselRoot model={dataModel} />
        <FlexDiv col>
          <AboutModel.Heading>sobre:</AboutModel.Heading>
          <AboutModel.Description>
            {dataModel.description}
          </AboutModel.Description>
          <a href={dataModel.telegramVip} target="_blank">
            <Button>telegram vip</Button>
          </a>
          <a href={dataModel.telegramFree} target="_blank">
            <Button>canal free</Button>
          </a>
        </FlexDiv>
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { CarouselRoot } from "./components/carousel/carousel-root";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";
import { incrementLike } from "@/utils/increment-like-to-model";
import { getDataById } from "@/utils/get-model-by-id";
import { ReturnToHomeButton } from "./components/return-to-home-button";
import { CarouselContentProps } from "@/types/model/carousel-content-props";

export default async function Model({ params }: { params: { slug: string } }) {
  const [dataModel] = await Promise.all([
    getDataById(params.slug),
    incrementLike(params.slug),
  ]);

  return (
    <main className="w-10/12 max-w-xl mx-auto m-auto flex flex-col items-center justify-center sm:py-4">
      <ReturnToHomeButton />
      <div className="w-full md:my-4 my-10">
        <CarouselRoot model={dataModel} />
        <FlexDiv col>
          {/* {dataModel.model.isPremium && (
            <Button>+</Button>
          )} */}
          <AboutModel.Description>
            {/* {dataModel.description} */}
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

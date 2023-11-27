import { Button } from "@/components/ui/button";
import { CarouselRoot } from "./components/carousel/carousel-root";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";
import { incrementLike } from "@/utils/increment-like-to-model";
import { getDataById } from "@/utils/get-model-by-id";
import { ReturnToHomeButton } from "./components/return-to-home-button";
import { CarouselContentProps } from "@/types/model/carousel-content-props";
import { getServerSession } from "next-auth";
import { ModelDetails } from "./components/model-details";
import { Flags } from "@/types/model/models-filter-props";

export type ModelsButtons = {
  url: string;
  title: string;
};

export default async function Model({ params }: { params: { slug: string } }) {
  const findDataModel = getDataById(params.slug);
  const findSession = getServerSession();
  const [dataModel, session] = await Promise.all([findDataModel, findSession]);

  return (
    <main className="w-10/12 max-w-xl mx-auto m-auto flex flex-col items-center justify-center sm:py-4">
      <ReturnToHomeButton className="sm:flex hidden absolute sm:h-auto text-red-main sm:top-16 left-7 xl:left-20 sm:left-10 items-center border-red-main mb-4" />
      <div className="w-full md:my-4 my-10">
        <CarouselRoot model={dataModel} />
        <FlexDiv col>
          {session &&
            dataModel.featureFlags &&
            dataModel.featureFlags.length > 0 &&
            dataModel.featureFlags.map((flag: Flags) => {
              if (flag.name === "enable_create_button")
                return (
                  <ModelDetails.AddNewButtonModal
                    key={flag.name}
                    model={dataModel}
                  />
                );
            })}
          <a href={dataModel.telegramVip} target="_blank" className="mt-4">
            <Button>telegram vip</Button>
          </a>
          <a href={dataModel.telegramFree} target="_blank">
            <Button>canal free</Button>
          </a>
          {dataModel.buttons &&
            dataModel.buttons.length > 0 &&
            dataModel.buttons.map((but: ModelsButtons) => {
              if (
                but.url !== null &&
                but.title !== null &&
                but.title !== "" &&
                but.url !== ""
              )
                return (
                  <a key={but.title} href={but.url} target="_blank">
                    <Button>{but.title}</Button>
                  </a>
                );
            })}
        </FlexDiv>
      </div>
    </main>
  );
}
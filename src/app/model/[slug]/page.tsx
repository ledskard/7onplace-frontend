import { Button } from "@/components/ui/button";
import { CarouselContent } from "./components/carousel/carousel-content";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";

export default function Model({ params }: { params: { slug: string } }) {
  // console.log(params.slug)
  const dataModel = {
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
  };

  return (
    <main className="w-10/12 max-w-7xl mx-auto py-10">
      <CarouselContent model={dataModel} />
      <FlexDiv col>
        <AboutModel.Heading>sobre:</AboutModel.Heading>
        <AboutModel.Description>{dataModel.description}</AboutModel.Description>
        <Button>
          <a href={dataModel.telegramVip} target="_blank">
            telegram vip
          </a>
        </Button>
        <Button>
          <a href={dataModel.telegramFree} target="_blank">
            canal free
          </a>
        </Button>
      </FlexDiv>
    </main>
  );
}

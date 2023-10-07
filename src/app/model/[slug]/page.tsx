import { Button } from "@/components/ui/button";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";
import { CarouselRoot } from "./components/carousel/carousel-root";

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
      <CarouselRoot model={dataModel} />
      <FlexDiv col>
        <AboutModel.Heading>sobre:</AboutModel.Heading>
        <AboutModel.Description>{dataModel.description}</AboutModel.Description>

        <Button href={dataModel.telegramVip}>telegram vip</Button>

        <Button href={dataModel.telegramFree}>canal free</Button>
      </FlexDiv>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { CarouselRoot } from "./components/carousel/carousel-root";
import { AboutModel } from "./components/about-model";
import { FlexDiv } from "@/components/interface/flex-div";
import { randomInt } from "crypto";

export default function Model({ params }: { params: { slug: string } }) {
  // console.log(params.slug)
  const dataModel = {
    id: 1,
    username: "katia fernanda pereira silva mendes",
    location: "brasil duhsd dssaasas saassa sdajghvsadjhgasdh",
    description:
      "puta virtual dhsdahuasd dasasdgasdi dsgkhjsdahasddhashjadha as adgajhsgahjd ashjdhs dhad gahjsghjag dihasdhashjd ahd  haguhgahd ahsd hashd jahd hjasgdahjdashjd asd jas dad jhgas jhad fjhas dhjahuaj a ja fdjgha hjdf ajdfajsa fdhj asdjhfadjhfd ahjd fjha djha djha dhja hjdj fhafadjfdhjsajhajhasfjhdashdasjh  jahhjdgasfdhdfagshj dhsdahuasd dasasdgasdi dsgkhjsdahasddhashjadha as adgajhsgahjd ashjdhs dhad gahjsghjag dihasdhashjd ahd  haguhgahd ahsd hashd jahd hjasgdahjdashjd asd jas dad jhgas jhad fjhas dhjahuaj a ja fdjgha hjdf ajdfajsa fdhj asdjhfadjhfd ahjd fjha djha djha dhja hjdj fhafadjfdhjsajhajhasfjhdashdasjh  jahhjdgasfdhdfagshj",
    likes: randomInt(100000000),
    telegramVip: "https://localhost/saop",
    telegramFree: "https://localhost/saop",
    images: [
      {
        id: 1,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 2,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 3,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 4,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
      {
        id: 5,
        url: "https://xbio.s3.us-east-1.amazonaws.com/1694470269400_sensualwonaperifl.jfif",
        name: "imagem",
      },
    ],
  };

  return (
    <main className="w-10/12 max-w-5xl mx-auto py-10">
      <CarouselRoot model={dataModel} />
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

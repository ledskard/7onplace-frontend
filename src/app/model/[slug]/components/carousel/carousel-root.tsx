"use client";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useRef } from "react";
import { Card } from "@/components/interface/card-models";
import Image from "next/image";
import { BsArrowLeftShort, BsArrowRightShort, BsTiktok } from "react-icons/bs";
import { Carousel } from "./index";
import { PerfilImage } from "@/components/interface/perfil-image";
import { FlexDiv } from "@/components/interface/flex-div";
import { ModelDetails } from "../model-details";
import { CarouselContentProps } from "@/types/model/carousel-content-props";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export const CarouselRoot = ({ model }: CarouselContentProps) => {
  const swiperRef = useRef<any>();

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <section className="mx-auto rounded-md">
      <Swiper
        onSwiper={(e) => (swiperRef.current = e)}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="rounded-md relative cursor-grab"
      >
        {model &&
          model.images.length > 0 &&
          model.images.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image.url}
                alt={image.name}
                height={600}
                width={1280}
                quality={100}
                className="sm:max-h-auto max-h-[450px] object-center object-contain rounded-md"
              />
            </SwiperSlide>
          ))}

        <Carousel.CenterButtonDiv>
          <Carousel.BorderButton>
            <Carousel.SlideButton onClick={prevSlide}>
              <BsArrowLeftShort />
            </Carousel.SlideButton>
          </Carousel.BorderButton>

          <Carousel.BorderButton>
            <Carousel.SlideButton onClick={nextSlide}>
              <BsArrowRightShort />
            </Carousel.SlideButton>
          </Carousel.BorderButton>
        </Carousel.CenterButtonDiv>
      </Swiper>

      <FlexDiv className="px-4 pt-3 pb-8">
        <FlexDiv col className="flex-1">
          <FlexDiv>
            <PerfilImage src={model.profileImage.url} alt={model.username} />
            <Card.Name>{model.username}</Card.Name>
          </FlexDiv>
          <FlexDiv>
            <ModelDetails.SocialMedia
              target="_blank"
              href={
                model.instagram === null ||
                (model.twitter && model.instagram.length <= 6)
                  ? "#"
                  : model.instagram
              }
              className={cn(
                (model.instagram === null ||
                  (model.twitter && model.instagram.length <= 6)) &&
                  "text-gray-600 cursor-default"
              )}
            >
              <Instagram />
            </ModelDetails.SocialMedia>
            <ModelDetails.SocialMedia
              target="_blank"
              href={
                model.twitter === null ||
                (model.twitter && model.twitter.length <= 6)
                  ? "#"
                  : model.twitter
              }
              className={cn(
                (model.twitter === null ||
                  (model.twitter && model.twitter.length <= 6)) &&
                  "text-gray-600 cursor-default"
              )}
            >
              <Twitter />
            </ModelDetails.SocialMedia>
            <ModelDetails.SocialMedia
              target="_blank"
              href={
                model.tiktok === null ||
                (model.twitter && model.tiktok.length <= 6)
                  ? "#"
                  : model.tiktok
              }
              className={cn(
                (model.tiktok === null ||
                  (model.twitter && model.tiktok.length <= 6)) &&
                  "text-gray-600 cursor-default"
              )}
            >
              <BsTiktok />
            </ModelDetails.SocialMedia>
          </FlexDiv>
        </FlexDiv>
        {/* <Card.Fav
          modelId={model.id}
          className="self-start leading-10"
          favorites={model.likes}
        /> */}
      </FlexDiv>
    </section>
  );
};

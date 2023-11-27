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
import { Instagram, Twitter } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

export const CarouselRoot = ({ model }: CarouselContentProps) => {
  const swiperRef = useRef<any>();

  const flags =
    model &&
    model.featureFlags &&
    model.featureFlags.length > 0 &&
    model.featureFlags.map((flag) => flag.name);

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

      <FlexDiv className="px-4">
        <FlexDiv col className="flex-1">
          <FlexDiv>
            <PerfilImage src={model.profileImage.url} alt={model.username} />
            <Card.Name>{model.username}</Card.Name>
          </FlexDiv>
          <FlexDiv>
            <ModelDetails.SocialMedia
              href={model.instagram ?? "#"}
              icon={Instagram}
              flags={flags}
            />

            <ModelDetails.SocialMedia
              href={model.twitter ?? "#"}
              icon={Twitter}
              flags={flags}
            />

            <ModelDetails.SocialMedia
              href={model.tiktok ?? "#"}
              icon={BsTiktok}
              social={"tiktok"}
              flags={flags}
            />
            <div className="ml-auto"> {/* Ajustado aqui: adicionado 'ml-auto' class para mover a div para a direita */}
              <Card.Fav modelId={model.id} favorites={model.likes} />
            </div>

          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </section>
  );
};
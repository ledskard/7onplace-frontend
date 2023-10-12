"use client";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { Card } from "@/components/interface/card-models";
import Image from "next/image";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Carousel } from "./index";
import { PerfilImage } from "@/components/interface/perfil-image";
import { FlexDiv } from "@/components/interface/flex-div";
import { ModelDetails } from "../model-details";
import { CarouselContentProps } from "@/types/model/carousel-content-props";
import { GridCol } from "@/components/interface/grid-col";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

export const CarouselRoot = ({ model }: CarouselContentProps) => {
  const swiperRef = useRef<any>();

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  console.log(model);

  return (
    <section className="mx-auto border-black border rounded-md shadow-md shadow-gray-400 mb-6 max-w-xl m-auto">
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
        className="rounded-md relative btn-swiper cursor-grab sm:max-h-none max-h-[200px]"
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
                className="sm:max-h-auto max-h-[350px] object-cover object-center"
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
        <FlexDiv col className="flex-1 max-w-[70%] sm:max-w-none">
          <FlexDiv>
            <PerfilImage src={model.profileImage.url} alt={model.username} />
            <Card.Name>{model.username}</Card.Name>
          </FlexDiv>
          <FlexDiv>
            <span>
              <MdLocationOn className="text-black md:text-3xl text-2xl" />
            </span>
            <ModelDetails.Location>{model.location}</ModelDetails.Location>
          </FlexDiv>
        </FlexDiv>
        <Card.Fav className="self-start leading-10" favorites={model.likes} />
      </FlexDiv>
    </section>
  );
};

"use client";
import Image from "next/image";
import { useRef } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import { Carousel } from "@/app/[slug]/components/carousel";

import { ModelsProps } from "@/types/model/models-filter-props";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Card } from "@/components/interface/card-models";

import Link from "next/link";

type MostViewedModelsSliderProps = {
  models: ModelsProps[];
};

export const MostViewedModelsSlider = ({
  models,
}: MostViewedModelsSliderProps) => {
  const swiperRef = useRef<any>();

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  if (models.length === 0) {
    return null;
  }

  return (
    <section className="relative xl:mt-16 sm:my-6 my-10 max-w-[1920px]">
      <Swiper
        onSwiper={(e) => (swiperRef.current = e)}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          100: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        rewind={true}
        className="mySwiper2 !gap-10 !mt-6 sm:!mt-0 !pt-12 relative rounded-md !cursor-grab lg:max-w-[70%]"
      >
        <h1 className="mb-4 text-2xl absolute top-0 pl-3">
          Destaques da semana
        </h1>
        {models &&
          models.map.length > 0 &&
          models.map((model) => {
            const username = model.username;
            const cleanUsername = username.replace(/\s+/g, "");

            return (
              <SwiperSlide
                key={model.id}
                className="!pb-2 sm:!pb-4 !ml-0 !space-x-0 max-w-full w-full !mx-5 items-center justify-center flex flex-col"
              >
                <div className="px-3 sm:max-h-auto sm:max-h-[250px] sm:min-h-[250px] relative min-h-[200px] max-h-[200px] mb-4 object-center object-contain rounded-lg">
                  <Card.Root className="sm:max-h-auto sm:max-h-[250px] sm:min-h-[250px] relative min-h-[200px] max-h-[200px] mb-4 object-center object-contain rounded-lg">
                    <Card.Actions>
                      <Card.Delete modelId={model.username} />
                      <Card.Edit model={model} />
                    </Card.Actions>
                    <Link
                      href={`/${cleanUsername}`}
                      className="z-20 absolute inset-0"
                      key={model.id}
                      prefetch={false}
                      aria-label={model.username}
                    />
                    <div className="relative flex-1 overflow-hidden max-h-[500px] h-full">
                      <Card.Img
                        src={
                          model?.coverImage?.url ??
                          model.images?.[0]?.url ??
                          "/default-profile.jpg"
                        }
                        alt={model.username}
                        className="object-cover object-top hover:scale-90"
                      />
                    </div>
                    <div className="flex gap-3 h-auto p-1">
                      <Image
                        className="rounded-full sm:w-14 sm:h-14 h-12 w-12 object-cover object-top shadow-md shadow-slate-500"
                        src={model.profileImage?.url ?? "/default-profile.jpg"}
                        alt={model.username}
                        width={56}
                        height={56}
                      />
                      <div className="space-y-1">
                        <Card.Name>{model.username}</Card.Name>
                        <Card.Fav
                          modelName={model.username}
                          favorites={model.likes}
                        />
                      </div>
                    </div>
                  </Card.Root>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Carousel.CenterButtonDiv className="xl:px-32 absolute">
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
    </section>
  );
};

"use client";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Card } from "@/components/interface/card-models";

type CarouselContentProps = {
  model: {
    id: number;
    username: string;
    location: string;
    description: string;
    likes: number;
    telegramVip: string;
    telegramFree: string;
    images: {
      id: number;
      url: string;
      name: string;
    }[];
  };
};

export const CarouselContent = ({ model }: CarouselContentProps) => {
  const swiperRef = useRef<any>();

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <section className="mx-auto max-w-7xl border-black border rounded-md shadow-md shadow-gray-400 mb-6 max-h-">
      <Swiper
        onSwiper={(e) => (swiperRef.current = e)}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        // navigation={{
        //   enabled: true,
        // }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // effect="fade"
        className="rounded-md relative cursor-grab"
      >
        {model.images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.url}
              alt={image.name}
              height={600}
              width={1280}
              quality={100}
              className="max-h-[600px] object-cover object-center"
            />
          </SwiperSlide>
        ))}
        {/* <Button className="absolute" onClick={nextSlide}>
            Next
          </Button> */}
      </Swiper>
      <div className="flex justify-between w-full items-center my-4 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={model.images[0].url}
              width={400}
              height={400}
              quality={100}
              className="rounded-full w-[40px] h-[40px] aspect-square shadow-md shadow-gray-500 object-cover object-center"
              alt={model.username}
            />
            <Card.Name>{model.username}</Card.Name>
          </div>
          <div className="flex gap-2 items-center">
            <MdLocationOn className="text-black md:text-3xl text-xl" />
            <p className="rounded-[30px] capitalize bg-gray-300 text-zinc-950 px-6 py-2">
              {model.location}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Card.Fav favorites={model.likes} />
        </div>
      </div>
    </section>
  );
};

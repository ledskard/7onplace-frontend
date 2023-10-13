import { ModelImage } from "./models-filter-props";

export type CarouselContentProps = {
  model: {
    id: number;
    username: string;
    location: string;
    description: string;
    likes: number;
    telegramVip: string;
    telegramFree: string;
    images: ModelImage[];
    profileImage: ModelImage;
  };
};

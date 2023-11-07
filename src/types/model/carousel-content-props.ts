import { Flags, ModelImage } from "./models-filter-props";

export type CarouselContentProps = {
  model: {
    id: string;
    username: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    description: string;
    likes: number;
    telegramVip: string;
    telegramFree: string;
    images: ModelImage[];
    profileImage: ModelImage;
    buttons: Array<{
      id: string;
      url: string;
      title: string;
    }>;
    featureFlags: Array<Flags>;
  };
};

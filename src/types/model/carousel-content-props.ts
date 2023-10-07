export type CarouselContentProps = {
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
export type ModelImage = {
  url: string;
  id: string;
  name: string;
};

export type ModelsFilterProps = {
  username: string;
  id: string;
  location: string;
  description: string;
  likes: number;
  telegramVip: string;
  telegramFree: string;
  images: ModelImage[];
};

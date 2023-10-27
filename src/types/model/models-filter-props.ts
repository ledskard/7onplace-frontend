export type ModelImage = {
  id: string;
  url: string;
  name: string;
};

export type ModelsFilterProps = {
  username: string;
  id: string;
  location: string;
  description: string;
  likes: number;
  type: string;
  instagram: string;
  telegramVip: string;
  telegramFree: string;
  images: ModelImage[];
  profileImage: ModelImage;
};

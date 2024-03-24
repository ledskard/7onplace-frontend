export type ModelImage = {
  id: string;
  url: string;
  name: string;
};

export type Flags = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
};

export type ModelsProps = {
  username: string;
  email: string;
  id: string;
  location: string;
  description: string;
  likes: number;
  type: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  telegramVip: string;
  telegramFree: string;
  images: ModelImage[];
  profileImage: ModelImage;
  coverImage: ModelImage;
  buttons: Array<{
    id: string;
    url: string;
    title: string;
  }>;
  featureFlags: Array<Flags>;
};

export type ModelsFilterProps = {
  data: Array<ModelsProps>;
  totalPages: number;
};

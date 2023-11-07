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

export type ModelsFilterProps = {
  username: string;
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
  buttons: Array<{
    id: string;
    url: string;
    title: string;
  }>;
  featureFlags: Array<Flags>;
};

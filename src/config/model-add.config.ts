type ModelAddsProps = {
  image: string;
  href: string;
  alt: string;
};

type ModelAddsConfigProps = {
  default: ModelAddsProps;
  ads: Array<ModelAddsProps>;
};

export const modelAddsConfig: ModelAddsConfigProps = {
  default: {
    image: "/anuncio-7onplace.png",
    href: "https://wa.me//48991013165?text=Gostaria%20de%20anunciar%20no%20marketplace%20da%207%20On%20Sexy",
    alt: "image default",
  },
  ads: [
    {
      image: "/template-ads.png",
      href: "https://t.me/addlist/_I2jv0vzoTVjYzFh",
      alt: "ad 7onsexy",
    },
  ],
};

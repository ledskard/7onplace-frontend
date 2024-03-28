type ModelAddsProps = {
  image: string,
  href: string
  alt: string
}

type ModelAddsConfigProps = {
  default: ModelAddsProps
  ads: Array<ModelAddsProps>
}


export const modelAddsConfig: ModelAddsConfigProps = {
  default: {
    image: '/anuncio-7onplace.png',
    href: 'https://wa.me//48991013165?text=Gostaria%20de%20anunciar%20no%20marketplace%20da%207%20On%20Sexy',
    alt: 'image default',
  },
  ads: [
    {
      image: '/template-ads.png',
<<<<<<< HEAD
      href: 'https://t.me/addlist/In7adwzKX1U4MzUx',
=======
      href: 'https://t.me/addlist/rKDJy03gt4szYzMx',
>>>>>>> 8d0ced849782c66f802c63cbe6d238bfa2288df4
      alt: 'ad 7onsexy',
    }
  ]
}
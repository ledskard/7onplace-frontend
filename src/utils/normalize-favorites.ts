export const normalizeFavorites = (favorites: number) => {
  if (favorites > 1000000000) {
    return `${Math.ceil(favorites / 1000000000)}Bi`;
  }
  if (favorites > 1000000) {
    return `${Math.ceil(favorites / 1000000)}M`;
  }
  if (favorites > 1000) {
    return `${Math.ceil(favorites / 1000)}K`;
  }
  return `${favorites}`;
};

export const getDataById = async (slug: string) => {
  const res = await fetch(
    `https://api.bioup.ai/models/${slug}`,
    { next: { revalidate: 1 } }
  );
  
  return await res.json();
};

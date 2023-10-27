export const getDataById = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
    { next: { revalidate: 1 } }
  );

  return await res.json();
};

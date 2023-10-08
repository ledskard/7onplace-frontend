export const getDataById = async (slug: string) => {
  const res = await fetch(
    `http://ec2-54-161-22-227.compute-1.amazonaws.com:8080/models/${slug}`,
    { next: { revalidate: 1 } }
  );
  return await res.json();
};

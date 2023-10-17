export const getDataById = async (slug: string) => {
  const res = await fetch(
    `https://alb7onsexy-1208292946.us-east-1.elb.amazonaws.com/models/${slug}`,
    { next: { revalidate: 1 } }
  );
  return await res.json();
};

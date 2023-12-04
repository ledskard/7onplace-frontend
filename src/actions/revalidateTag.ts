"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateTagAPI(tag: string) {
  revalidateTag(tag);
}

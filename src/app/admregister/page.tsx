import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ReturnToHomeButton } from "../[slug]/components/return-to-home-button";

import { FormRegisterContainer } from "./form-register-container";

export default async function AdmRegister() {
  const session = await getServerSession();
  if (!session) redirect("/admlogin");

  return (
    <>
      <ReturnToHomeButton className="sm:flex hidden absolute sm:h-auto text-red-main sm:top-16 left-7 xl:left-20 sm:left-10 items-center border-red-main mb-4" />
      <FormRegisterContainer />
    </>
  );
}

import { getServerSession } from "next-auth";
import { FormRegisterContainer } from "./form-register-container";
import { redirect, useRouter } from "next/navigation";

export default async function AdmRegister() {
  // const session = await getServerSession();
  // if (!session) redirect("/admlogin");

  return <FormRegisterContainer />;
}

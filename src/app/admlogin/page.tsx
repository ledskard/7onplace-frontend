import { getServerSession } from "next-auth";
import { FormLoginContainer } from "./components/form-login-container";
import { redirect } from "next/navigation";

export default async function AdmLogin() {
  const session = await getServerSession();
  if (session) return redirect("/admregister");

  return <FormLoginContainer />;
}

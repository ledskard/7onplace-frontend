import Image from "next/image";

export const FormLogo = () => {
  return (
    <Image
      src={"/form-login-logo.png"}
      alt="Form Logo"
      width={900}
      height={900}
      className="max-w-3xl pb-16 sm:w-5/12 w-4/12 sm:max-w-xl"
    />
  );
};

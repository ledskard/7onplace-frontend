import Image from "next/image";
import { imgLoading } from "../card-models/card-model-base64-img-loading";

export const FormLogo = () => {
  return (
    <Image
      src={"/form-login-logo.png"}
      alt="Form Logo"
      width={900}
      height={900}
      placeholder="blur"
      // blurDataURL={imgLoading}
      className="max-w-3xl pb-16 sm:w-5/12 w-4/12 sm:max-w-xl"
    />
  );
};

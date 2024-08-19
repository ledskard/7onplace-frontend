import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { imgLoading } from "../card-models/card-model-base64-img-loading";

type LogoProps = ComponentProps<typeof Link>;

export const Logo = ({ className, href }: LogoProps) => {
  return (
    <Link href={href} className={className}>
      <Image src={"/7onplace-logo.png"} height={64} width={80} alt="7OnSexy" />
    </Link>
  );

};

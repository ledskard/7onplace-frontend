import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type LogoProps = ComponentProps<typeof Link>;

export const Logo = ({ className, href }: LogoProps) => {
  return (
    <Link href={href} className={className}>
      <Image src={"/favicon.ico"} height={64} width={47} alt="7OnSexy" />
    </Link>
  );
};

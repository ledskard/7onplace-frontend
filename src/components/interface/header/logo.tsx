import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={"/favicon.ico"} height={64} width={47} alt="7OnSexy"/>
    </Link>
  )
}
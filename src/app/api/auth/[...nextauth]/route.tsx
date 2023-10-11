// import { authOptions } from "@/lib/auth-options";
import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth";

// if (process.env.NEXTAUTH_SECRET?.length !== 32) {
//   throw new Error("NEXTAUTH URL must be 32 characters")
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

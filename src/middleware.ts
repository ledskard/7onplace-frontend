
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken'

let pathname;

export async function middleware(request: NextRequest) {
    
    pathname = request.nextUrl.pathname;
    const referrer = request.headers.get('referer')
    const response = NextResponse.next();
    referrer !== null ? 
    response.cookies.set('referrer', '7onplace') : response.cookies.set('referrer', 'another_site')
  
    const session = await getToken({
      req: request,
    });


    if (session?.token) {
      const tokenPayload = jwt.decode(session?.token) as {
        exp: number
      }

      if (typeof tokenPayload === "string" || !tokenPayload) return session

      const tokenIsExpired = new Date() < new Date(tokenPayload.exp)

      if (!tokenIsExpired) {

        response.cookies.delete('next-auth.session-token')
        response.cookies.delete('next-auth.callback-url')
        response.cookies.delete('next-auth.csrf-token')
      }
    }

    return response
  }

  export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };
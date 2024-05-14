
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';


export async function middleware(request: NextRequest) {
    
    const referrer = request.headers.get('referer')
    const response = NextResponse.next();
    referrer !== null ? 
    response.cookies.set('referrer', '7onplace') : response.cookies.set('referrer', 'another_site')
    return response
  }

  
  export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };
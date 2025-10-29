import {NextResponse} from "next/server";
import {cookieOptions} from "@/lib/auth-proxy";

export async function POST() {
  const response = NextResponse.json({message: 'Logged out'});

  response.cookies.set('refresh-token', '', {
    ...cookieOptions,
    maxAge: 0,
  });

  return response;
}

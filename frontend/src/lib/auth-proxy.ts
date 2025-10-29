import {NextResponse} from 'next/server';
import {cookies} from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL;
const REFRESH_COOKIE_NAME = 'refresh-token';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax';
  path: string;
  maxAge: number;
}

export const cookieOptions:CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
};

export function setRefreshCookie(nextResponse: NextResponse, apiRes: Response) {
  const cookieHeader = apiRes.headers.get('set-cookie');

  if (cookieHeader) {
    const parts = cookieHeader.split(';');
    const tokenPart = parts[0].trim();
    const [tokenName, tokenValue] = tokenPart.split('=');

    if (tokenName === REFRESH_COOKIE_NAME) {
      nextResponse.cookies.set(tokenName, tokenValue, cookieOptions);
    }
  }
}

export async function proxyBackend(endpoint: string, fetchOptions: Partial<RequestInit> = {}): Promise<NextResponse> {
  try {
    const apiRes = await fetch(`${BACKEND_URL}${endpoint}`, fetchOptions);
    const data = await apiRes.json();
    const response = NextResponse.json(data, {status: apiRes.status});

    if (apiRes.ok && (endpoint.includes('/auth/login') || endpoint.includes('/auth/register'))) {
      setRefreshCookie(response, apiRes);
    }

    return response;
  } catch (error) {
    console.error(`Backend proxy error for ${endpoint}:`, error);
    return NextResponse.json(
      {error: 'Server error or backend is unreachable'},
      {status: 500}
    );
  }
}

// export async function serverAuthCheck() {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get('refresh-token');
//
//   if (!refreshToken) {
//     throw new Error('No refresh token found (serverAuthCheck)');
//   }
//
//   const fetchOptions: Partial<RequestInit> = {
//     method: 'POST',
//     headers: {
//       'Cookie': `refresh-token=${refreshToken.value}`,
//     },
//     cache: 'no-store'
//   };
//
//   try {
//     const apiRes = await fetch(`${BACKEND_URL}/auth/refresh`, fetchOptions);
//
//     if (!apiRes.ok) {
//       throw new Error(`Auth failed on Java backend: ${apiRes.status}`);
//     }
//     return await apiRes.json();
//
//   } catch (error) {
//     throw new Error('Server error or backend is unreachable');
//   }
// }
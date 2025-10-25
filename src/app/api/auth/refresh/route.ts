import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {proxyBackend} from "@/lib/auth-proxy";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const fetchOptions: Partial<RequestInit> = {
    method: 'POST',
    headers: {
      'Cookie': `refresh-token=${refreshToken.value}`,
    },
  };

  try {
    return proxyBackend('/auth/refresh', fetchOptions);
  } catch {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

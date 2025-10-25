import {proxyBackend} from "@/lib/auth-proxy";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
  const {username, password} = await req.json();
  return proxyBackend('/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
}

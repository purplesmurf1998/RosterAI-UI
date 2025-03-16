import { NextRequest, NextResponse } from "next/server";
import { getSession, withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  console.log("******** REACHED MIDDLEWARE **********");
  console.log(req.nextUrl.pathname);
  if (!req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const session = await getSession(req, res);

  console.log(session);

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/login", process.env.AUTH0_BASE_URL))
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", session.user.sid);

  return NextResponse.next({ request: { headers: requestHeaders } });
})
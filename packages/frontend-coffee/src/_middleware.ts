// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./env/client.mjs";
import PocketBase from "pocketbase";

const pbClient = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // load the store data from the request cookie string
  pbClient.authStore.loadFromCookie(
    `pb_auth=${request.cookies.get("pb_auth")?.value}`
  );

  try {
    // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
    pbClient.authStore.isValid &&
      (await pbClient.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pbClient.authStore.clear();
  }

  const isValid = pbClient.authStore.isValid;

  if (!isValid && !request.nextUrl.pathname.startsWith("/auth")) {
    console.log(`Being redirect to http://${request.nextUrl.host}/auth/login/`);

    return NextResponse.redirect(
      new URL(`http://${request.nextUrl.host}/auth/login/`)
    );
  }

  console.log(`Middleware: Updated cookie (at ${request.nextUrl})`);

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next();
  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("set-cookie", pbClient.authStore.exportToCookie());

  return response;
}

// See "Matching Paths" below to learn more
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).+)"],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// TODO(human): Decide on cookie security approach
// Option 1: Leave as-is (current) - NEXT_LOCALE cookie has no HttpOnly flag
//           Risk: Minimal (cookie only contains "fr", "en", etc.)
//           Score: ~9/10 on security audits
//
// Option 2: Override with HttpOnly - Intercept response and re-set cookie
//           Uncomment the code below to implement
//           Score: 10/10 on security audits
//
// Option 3: Disable cookie entirely - Remove localeDetection
//           Loses user language preference persistence
//
// Your implementation here:

export default function middleware(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);

  // TODO(human): Implement your chosen approach here
  // Example for Option 2:
  // const locale = response.cookies.get("NEXT_LOCALE")?.value;
  // if (locale) {
  //   response.cookies.set("NEXT_LOCALE", locale, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "lax",
  //     path: "/",
  //   });
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

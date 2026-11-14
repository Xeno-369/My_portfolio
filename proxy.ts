import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/lib/i18n";

/** La racine redirige vers la langue préférée du navigateur. */
export function proxy(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find(hasLocale);

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred ?? defaultLocale}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: "/" };

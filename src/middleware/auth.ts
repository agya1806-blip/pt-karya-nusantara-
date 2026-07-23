import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const publicPaths = [
  "/",
  "/about",
  "/services",
  "/process",
  "/portfolio",
  "/gallery",
  "/team",
  "/blog",
  "/faq",
  "/pricing",
  "/contact",
  "/career",
  "/privacy-policy",
  "/terms-of-service",
  "/search",
  "/sitemap.xml",
  "/robots.txt",
];

const authPaths = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

const adminPaths = [
  "/admin",
  "/dashboard",
];

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

  if (!isAdminPath && !isAuthPath) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isAuthPath && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdminPath && !session) {
    const redirectUrl = new URL("/admin/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

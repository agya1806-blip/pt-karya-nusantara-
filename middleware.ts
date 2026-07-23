import { type NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|og-image.jpg|logo.png|sitemap.xml|robots.txt).*)",
  ],
};

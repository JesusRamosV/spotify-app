export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/search/:path*",
    "/track/:path*",
    "/album/:path*",
    "/artist/:path*",
  ],
};

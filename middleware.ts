import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
      publicRoutes: ["/api/:path*", "/e8cc7cb1-8fb3-46d2-8230-1514f2a88cec"],
});

export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

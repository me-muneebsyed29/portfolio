import { NextResponse, type NextRequest } from "next/server";

/**
 * Host-based routing: the B2C site lives on its own subdomain but shares this
 * codebase. Requests to b2c.muneebsyed29.com are rewritten onto the /b2c route
 * tree, so the subdomain serves it from `/` without a redirect.
 *
 * In local dev the /b2c path stays directly reachable (localhost:3000/b2c);
 * canonical tags in app/b2c/layout.tsx point search engines at the subdomain.
 */
const SUBDOMAINS: { hosts: string[]; prefix: string }[] = [
  { hosts: ["b2c.muneebsyed29.com", "b2c.localhost:3000"], prefix: "/b2c" },
];

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  const match = SUBDOMAINS.find((entry) => entry.hosts.includes(host));
  if (match) {
    const url = request.nextUrl.clone();
    // Guard against double-prefixing if a request already targets the tree.
    if (!url.pathname.startsWith(match.prefix)) {
      url.pathname = `${match.prefix}${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, the metadata files, and anything with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};

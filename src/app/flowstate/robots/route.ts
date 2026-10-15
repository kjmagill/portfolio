export const dynamic = "force-static";
export function GET() { return new Response("User-agent: *\nAllow: /\nSitemap: https://flowstatelabs.kjmagill.com/sitemap.xml\n", { headers: { "Content-Type": "text/plain" } }); }

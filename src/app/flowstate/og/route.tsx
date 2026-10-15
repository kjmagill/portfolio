// Preserve existing shared image URLs while serving the new static artwork.
export function GET() {
  return Response.redirect("https://flowstatelabs.kjmagill.com/flowstate/og-flowstate-v2.jpg", 308);
}

// Preserve existing shared image URLs while serving the new static artwork.
export function GET() {
  return Response.redirect("https://flowstatelabs.kjmagill.com/flowstate/og-flowstate-v7.jpg", 308);
}

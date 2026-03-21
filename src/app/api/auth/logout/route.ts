export const runtime = "edge";

export function POST() {
  return Response.json(
    {
      error: "Logout is coming soon.",
      code: "AUTH_NOT_AVAILABLE",
    },
    { status: 501 }
  );
}

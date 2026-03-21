export const runtime = "edge";

export function POST() {
  return Response.json(
    {
      error: "Login is coming soon. Your data is saved locally in your browser.",
      code: "AUTH_NOT_AVAILABLE",
    },
    { status: 501 }
  );
}

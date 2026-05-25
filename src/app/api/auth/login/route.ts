import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json({ error: "Email and password are required" }, { status: 400 });
  }

  if (email === "admin@medisolution.com" && password === "admin123") {
    return Response.json({
      user: { id: "1", name: "Admin", email, role: "admin" },
      token: "demo-jwt-token",
    });
  }

  return Response.json({ error: "Invalid credentials" }, { status: 401 });
}

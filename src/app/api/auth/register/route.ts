import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  return Response.json({
    user: {
      id: Date.now().toString(),
      name,
      email,
      role: "user",
    },
    token: "demo-jwt-token",
    message: "Account created successfully",
  });
}

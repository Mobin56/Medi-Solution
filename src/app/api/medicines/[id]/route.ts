import { NextRequest } from "next/server";
import { getMedicineById } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const medicine = getMedicineById(id);

  if (!medicine) {
    return Response.json({ error: "Medicine not found" }, { status: 404 });
  }

  return Response.json(medicine);
}

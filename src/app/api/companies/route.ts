import { companies } from "@/lib/data";

export async function GET() {
  return Response.json({ companies, total: companies.length });
}

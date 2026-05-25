import { NextRequest } from "next/server";
import { medicines, searchMedicines } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  let results = medicines;

  if (query) {
    results = searchMedicines(query);
  }

  if (category) {
    results = results.filter(
      (m) => m.category.toLowerCase() === category.toLowerCase()
    );
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return Response.json({
    medicines: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

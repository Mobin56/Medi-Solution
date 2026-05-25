import { NextRequest } from "next/server";
import { searchMedicines, trendingSearches } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return Response.json({
      medicines: [],
      suggestions: trendingSearches,
      total: 0,
    });
  }

  const results = searchMedicines(query);

  return Response.json({
    medicines: results.slice(0, 10),
    total: results.length,
    query,
  });
}

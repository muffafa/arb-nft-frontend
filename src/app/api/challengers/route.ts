import { connectToDatabase } from "@/utils/database";
import Challenger from "@/models/challenger";
import { NextResponse, NextRequest } from 'next/server';

const ITEM_PER_PAGE = 3;

export async function GET(request: NextRequest) {
  //  return new Response(JSON.stringify({ name: 'John Doe' }));
  // CONNECT TO DATABASE
  await connectToDatabase();

  const queryParam = request.nextUrl.searchParams.get("page");
  const page = Number(queryParam || 1);

  try {
    const totalChallengers = await Challenger.find().countDocuments();

    const challengers = await Challenger.find({})
      .sort({ blockNumber: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);

    const totalPageNumber = Math.ceil(totalChallengers / ITEM_PER_PAGE);

    return new Response(
      JSON.stringify({
        challengers: challengers,
        pagination: { page, totalPageNumber },
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

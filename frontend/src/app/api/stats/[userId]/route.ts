import { NextRequest, NextResponse } from "next/server";
import {getRecentlyGamesById, getUserStatsById} from "@/lib/data";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  const id = Number(userId);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const stats = await getUserStatsById(id);
    const recentlyGames = await getRecentlyGamesById(id);

    if (!stats) {
      return NextResponse.json({ error: "Stats not found" }, { status: 404 });
    }

    if (!recentlyGames) {
      return NextResponse.json({ error: "Recently Games not found" }, { status: 404 });
    }

    return NextResponse.json({stats, recentlyGames});
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

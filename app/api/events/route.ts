import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all events
export async function GET(_request: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        venue: true,
        bannerImage: true,
        capacity: true,
        registrationCount: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import prisma from "@/lib/prisma";

// GET admin dashboard data
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

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
        date: "desc",
      },
    });

    const totalRegistrations = events.reduce(
      (sum, event) => sum + event.registrationCount,
      0
    );

    return NextResponse.json({
      events,
      totalRegistrations,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

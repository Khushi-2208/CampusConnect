import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import prisma from "@/lib/prisma";

// POST register for event
export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const eventId = parseInt(params.id);
    const userId = parseInt(session.user.id);

    // Check if event exists and has capacity
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (event.registrationCount >= event.capacity) {
      return NextResponse.json(
        { error: "Event is full" },
        { status: 400 }
      );
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "Already registered for this event" },
        { status: 400 }
      );
    }

    // Create registration and update event count
    await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          eventId,
          userId,
        },
      }),
      prisma.event.update({
        where: { id: eventId },
        data: {
          registrationCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Successfully registered for event" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 }
    );
  }
}

// DELETE unregister from event
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const eventId = parseInt(params.id);
    const userId = parseInt(session.user.id);

    // Check if registration exists
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Not registered for this event" },
        { status: 404 }
      );
    }

    // Delete registration and update event count
    await prisma.$transaction([
      prisma.eventRegistration.delete({
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      }),
      prisma.event.update({
        where: { id: eventId },
        data: {
          registrationCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Successfully unregistered from event" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unregistering from event:", error);
    return NextResponse.json(
      { error: "Failed to unregister from event" },
      { status: 500 }
    );
  }
}

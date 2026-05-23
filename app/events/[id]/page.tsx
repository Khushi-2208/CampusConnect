"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string;
  bannerImage?: string;
  capacity: number;
  registrationCount: number;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  const eventId = params.id as string;

  useEffect(() => {
    fetchEvent();
    if (session) {
      checkRegistration();
    }
  }, [eventId, session]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) throw new Error("Event not found");
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      toast.error("Failed to load event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/registration`);
      if (response.ok) {
        const data = await response.json();
        setIsRegistered(data.isRegistered);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    try {
      setRegistering(true);
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      setIsRegistered(true);
      setEvent((prev) =>
        prev
          ? { ...prev, registrationCount: prev.registrationCount + 1 }
          : null
      );
      toast.success("Successfully registered for event!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to register"
      );
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    try {
      setRegistering(true);
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to unregister");
      }

      setIsRegistered(false);
      setEvent((prev) =>
        prev
          ? { ...prev, registrationCount: prev.registrationCount - 1 }
          : null
      );
      toast.success("Successfully unregistered from event!");
    } catch (error) {
      toast.error("Failed to unregister");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Event not found
          </h1>
          <Link href="/events">
            <Button>Back to events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const spotsLeft = event.capacity - event.registrationCount;
  const isFull = spotsLeft <= 0;
  const eventHasStarted = new Date(event.date) < new Date();

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/events" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>

        {/* Banner Image */}
        {event.bannerImage && (
          <div className="mb-8 rounded-lg overflow-hidden h-96 bg-gray-200 dark:bg-gray-800">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {event.title}
            </h1>

            {/* Event Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Date & Time</p>
                  <p>{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Venue</p>
                  <p>{event.venue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Registrations</p>
                  <p>
                    {event.registrationCount}/{event.capacity}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sticky top-20">
              {/* Status */}
              <div className="mb-6">
                {isFull ? (
                  <div className="inline-block px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold w-full text-center">
                    Event Full
                  </div>
                ) : spotsLeft <= 5 ? (
                  <div className="inline-block px-4 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-semibold w-full text-center">
                    {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left!
                  </div>
                ) : (
                  <div className="inline-block px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold w-full text-center">
                    {spotsLeft} spots available
                  </div>
                )}
              </div>

              {/* Registration Button */}
              {isRegistered ? (
                <Button
                  onClick={handleUnregister}
                  disabled={registering}
                  loading={registering}
                  variant="danger"
                  size="lg"
                  className="w-full mb-4"
                >
                  Unregister
                </Button>
              ) : (
                <Button
                  onClick={handleRegister}
                  disabled={registering || isFull || eventHasStarted}
                  loading={registering}
                  size="lg"
                  className="w-full mb-4"
                >
                  {eventHasStarted
                    ? "Event Started"
                    : isFull
                    ? "Event Full"
                    : "Register Now"}
                </Button>
              )}

              {isRegistered && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ✓ You are registered for this event
                  </p>
                </div>
              )}

              {!session && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    Sign in to register for this event
                  </p>
                  <Link href="/auth/signin" className="block">
                    <Button size="md" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import { Calendar, Users, Bookmark } from "lucide-react";
import { toast } from "sonner";

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

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRegistered: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchRegisteredEvents();
    }
  }, [session]);

  const fetchRegisteredEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/registrations");
      if (!response.ok) throw new Error("Failed to fetch registrations");
      const data = await response.json();
      setRegisteredEvents(data.events);
      setStats({
        totalRegistered: data.events.length,
        upcomingEvents: data.events.filter(
          (e: Event) => new Date(e.date) > new Date()
        ).length,
      });
    } catch (error) {
      toast.error("Failed to load registrations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner />;
  }

  const upcomingEvents = registeredEvents.filter(
    (e) => new Date(e.date) > new Date()
  );
  const pastEvents = registeredEvents.filter(
    (e) => new Date(e.date) <= new Date()
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {session?.user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your event registrations and stay updated
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            title="Events Registered"
            value={stats.totalRegistered}
            icon={<Users className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={<Calendar className="w-6 h-6" />}
            color="purple"
          />
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <Link href="/events">
              <Button variant="outline">Browse more</Button>
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} date={new Date(event.date)} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-12 text-center">
              <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No upcoming events registered yet
              </p>
              <Link href="/events">
                <Button>Explore events</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} {...event} date={new Date(event.date)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

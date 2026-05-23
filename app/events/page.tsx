"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import EventCard from "@/components/EventCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";
import { Search, Filter } from "lucide-react";
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

export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error("Failed to load events");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const eventDate = new Date(event.date);
    const isUpcoming = eventDate > new Date();

    if (upcomingOnly) {
      return matchesSearch && isUpcoming;
    }
    return matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Campus Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover and register for amazing events happening on campus
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => setUpcomingOnly(!upcomingOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  upcomingOnly
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {upcomingOnly ? "Upcoming Events" : "All Events"}
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} date={new Date(event.date)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {events.length === 0
                ? "No events available yet."
                : "No events match your search."}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                size="md"
                onClick={() => setSearchTerm("")}
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        )}

        {/* Info Box */}
        {!session && (
          <div className="mt-12 p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-900 dark:text-blue-100">
              Sign in to register for events and manage your registrations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

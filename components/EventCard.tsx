import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: Date;
  venue: string;
  bannerImage?: string;
  capacity: number;
  registrationCount: number;
}

export default function EventCard({
  id,
  title,
  description,
  date,
  venue,
  bannerImage,
  capacity,
  registrationCount,
}: EventCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const spotsLeft = capacity - registrationCount;
  const isAlmostFull = spotsLeft <= 5;
  const isFull = spotsLeft <= 0;

  return (
    <Link href={`/events/${id}`}>
      <div className="group h-full rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 hover:dark:shadow-xl transition-shadow duration-300">
        {/* Image */}
        {bannerImage && (
          <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img
              src={bannerImage}
              alt={title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {venue}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {registrationCount}/{capacity} registered
            </div>
          </div>

          {/* Spots Left Indicator */}
          {isFull ? (
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
              Full
            </div>
          ) : isAlmostFull ? (
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
              {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
            </div>
          ) : (
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              {spotsLeft} spots available
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

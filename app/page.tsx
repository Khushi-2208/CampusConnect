"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sparkles, Calendar, Users, Trophy } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20" />

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Welcome to CampusConnect</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Discover College Events
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Made Simple
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Find and register for exciting campus events in one place. Never miss out on student life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {session ? (
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Events
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Browse Events
                </Link>
              </>
            )}
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Events Per Year</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">100%</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Free to Join</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose CampusConnect?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Everything you need to make the most of your college experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Easy Discovery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse all upcoming college events with detailed descriptions and schedules.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Quick Registration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Register for events with just one click and manage all registrations in your dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Never Miss Out
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get notifications for new events and important updates about registered events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Explore?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Join thousands of students discovering amazing campus events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Events
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </Link>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

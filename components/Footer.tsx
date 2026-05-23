export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              🎓 CampusConnect
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Discover and register for exciting college events in one place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  All Events
                </a>
              </li>
              <li>
                <a href="/auth/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              &copy; 2024 CampusConnect. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Twitter</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-4 text-center">
        <div className="inline-flex">
          <div className="w-12 h-12 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}

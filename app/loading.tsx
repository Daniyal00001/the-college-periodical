export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-blue-500/30 animate-ping"></div>

        {/* Main Spinning Ring */}
        <div className="h-20 w-20 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>

        {/* Inner Core */}
        <div className="absolute h-6 w-6 bg-blue-600 rounded-full shadow-[0_0_25px_#2563eb] animate-pulse"></div>
      </div>

      <p className="absolute bottom-12 text-gray-700 dark:text-gray-300 font-medium tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}

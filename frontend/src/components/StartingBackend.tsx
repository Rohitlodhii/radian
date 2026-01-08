const StartingBackend = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6 border border-gray-100">
        <div className="space-y-4">
          {/* Animated loader with different style */}
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-r-transparent animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Starting Backend</h1>
            <p className="text-gray-600">
              Initializing backend service...
            </p>
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default StartingBackend;


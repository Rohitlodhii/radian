const CheckingBackend = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6 border border-gray-100">
        <div className="space-y-4">
          {/* Animated loader */}
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Checking Backend</h1>
            <p className="text-gray-600">
              Verifying backend service availability...
            </p>
          </div>
        </div>

        {/* Pulsing dots indicator */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CheckingBackend;


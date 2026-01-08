const BackendNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6 border border-gray-100">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
            Backend Missing
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Backend not found</h1>
          <p className="text-gray-600">
            We couldn&apos;t reach the backend service. Please reinstall the package
            or let us know so we can help.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.open('https://radiantts.vercel.app', '_blank')}
            className="w-full sm:w-auto px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Redownload package
          </button>
          <button 
            onClick={() => window.open('https://radiantts.vercel.app', '_blank')}
            className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
          >
            Report an issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackendNotFound;

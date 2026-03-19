'use client'

export default function HealthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Y2Save is Running!
          </h1>
          <p className="text-gray-600 mb-6">
            The application deployed successfully on Vercel.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="font-mono text-sm text-blue-900">
              Environment Check:
              <br />
              ✅ Frontend: Deployed
              <br />
              ⏸️ Backend: <span className="text-gray-600">Connect to start downloading</span>
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Home
            </a>
            <a
              href="/history"
              className="block w-full bg-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              View History
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Y2Save • Version 1.0.0<br />
              Deployed on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

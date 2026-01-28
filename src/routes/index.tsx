import { Link, createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: Index,
})
function Index () {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Inno SPA</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="space-y-3">
              <Link 
                to="/profile" 
                className="block w-full text-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                Profile
              </Link>
              <Link 
                to="/chat" 
                className="block w-full text-center bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                WebSocket Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

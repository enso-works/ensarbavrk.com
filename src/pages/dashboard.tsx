import { useAuth } from "@/lib/AuthContext"
import { PrivateRoute } from "@/templates/PrivateRoute"

export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <PrivateRoute>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4">Welcome, {user?.email}</h2>
            <p>This is your protected dashboard page.</p>
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
} 
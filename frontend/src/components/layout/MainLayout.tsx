import type { ReactNode } from 'react'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ExpenseTracker
          </h1>
          <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
            />
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {children}
      </main>
    </div>
  )
}

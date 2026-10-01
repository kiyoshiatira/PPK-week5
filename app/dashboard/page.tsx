import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './logout-button'
import ThemeToggle from './theme-toggle'
import SummaryCards from './summary-cards'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Keuangan</h1>
        <div className="flex gap-2">
          <ThemeToggle currentTheme={theme} />
          <LogoutButton />
        </div>
      </div>

      <SummaryCards />

      <div className="flex gap-3">
        <Link
          href="/dashboard/transactions"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kelola Transaksi
        </Link>
        <Link
          href="/dashboard/budgets"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Kelola Budget
        </Link>
      </div>
    </div>
  )
}
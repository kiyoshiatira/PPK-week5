import BudgetList from './BudgetList'
import Link from 'next/link'

export default function BudgetsPage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Riwayat Budget Bulanan</h1>
          <p className="text-sm text-gray-500">
            Daftar anggaran pengeluaran yang telah Anda tetapkan per bulan.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/budget"
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
          >
            + Set Budget
          </Link>
          <Link
            href="/dashboard"
            className="border px-3 py-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <BudgetList />
    </div>
  )
}

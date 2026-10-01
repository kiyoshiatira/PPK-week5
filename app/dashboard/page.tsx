import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './logout-button'
import ThemeToggle from './theme-toggle'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('type, amount')
    .eq('user_id', user?.id)

  if (error) {
    return <p className="text-red-600 text-sm p-6">Gagal memuat data: {error.message}</p>
  }

  const totalIncome =
    transactions
      ?.filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0) ?? 0

  const totalExpense =
    transactions
      ?.filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0) ?? 0

  const balance = totalIncome - totalExpense

  const formatRupiah = (value: number) =>
    `Rp${value.toLocaleString('id-ID')}`

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Saldo</p>
          <p
            className={`text-2xl font-bold ${
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {formatRupiah(balance)}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Pemasukan</p>
          <p className="text-2xl font-bold text-green-600">
            {formatRupiah(totalIncome)}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-red-600">
            {formatRupiah(totalExpense)}
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/transactions"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Kelola Transaksi
      </Link>
    </div>
  )
}
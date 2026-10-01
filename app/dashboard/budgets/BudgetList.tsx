import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteBudgetButton from './DeleteBudgetButton'

export default async function BudgetList() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <p className="text-gray-500 text-sm">Silakan login terlebih dahulu.</p>
  }

  const { data: budgets, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', user.id)
    .order('month', { ascending: false })

  if (error) {
    return <p className="text-red-600 text-sm">Gagal memuat riwayat budget: {error.message}</p>
  }

  if (!budgets || budgets.length === 0) {
    return <p className="text-gray-500 text-sm">Belum ada budget yang ditetapkan.</p>
  }

  const formatMonth = (monthStr: string) => {
    // monthStr bisa 'YYYY-MM-DD' atau 'YYYY-MM'
    const [year, month] = monthStr.split('-')
    const date = new Date(Number(year), Number(month) - 1, 1)
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  }

  const formatRupiah = (amount: number) =>
    `Rp${Number(amount).toLocaleString('id-ID')}`

  return (
    <ul className="divide-y border rounded-lg">
      {budgets.map((b) => (
        <li key={b.id} className="flex justify-between items-center p-4">
          <div>
            <p className="font-semibold text-base">{formatMonth(b.month)}</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {formatRupiah(b.amount)}
            </p>
          </div>
          <div className="flex gap-3 items-center shrink-0">
            <Link
              href={`/dashboard/budgets/${b.id}/edit`}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <DeleteBudgetButton budgetId={b.id} />
          </div>
        </li>
      ))}
    </ul>
  )
}

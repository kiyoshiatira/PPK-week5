import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import DeleteTransactionButton from './DeleteTransactionButton'

export default async function TransactionList() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false })
    .order('created_at', { ascending: false }) // tie-breaker kalau tanggal sama

  if (error) {
    return <p className="text-red-600 text-sm">Gagal memuat transaksi: {error.message}</p>
  }

  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500 text-sm">Belum ada transaksi.</p>
  }

  return (
    <ul className="divide-y border rounded">
      {transactions.map((t) => (
        <li key={t.id} className="flex justify-between items-center p-3">
          <div>
            <p className="font-medium">
              <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                {t.type === 'income' ? '+ ' : '- '}
                Rp{Number(t.amount).toLocaleString('id-ID')}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              {new Date(t.transaction_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              {t.description ? ` — ${t.description}` : ''}
            </p>
          </div>
          <div className="flex gap-3 items-center shrink-0">
            <Link
              href={`/dashboard/transactions/${t.id}/edit`}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <DeleteTransactionButton transactionId={t.id} />
          </div>
        </li>
      ))}
    </ul>
  )
}
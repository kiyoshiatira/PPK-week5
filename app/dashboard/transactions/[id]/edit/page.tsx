import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import EditTransactionForm from '../../EditTransactionForm'
import { notFound } from 'next/navigation'

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: transaction } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single()

  if (!transaction) notFound()

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Transaksi</h1>
      <EditTransactionForm transaction={transaction} />
    </div>
  )
}
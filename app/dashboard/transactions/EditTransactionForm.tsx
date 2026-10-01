'use client'

import { useActionState } from 'react'
import { updateTransaction } from './actions'

const initialState = { error: null, success: false }

type Transaction = {
  id: string
  type: 'income' | 'expense'
  amount: number
  transaction_date: string
  description: string | null
}

export default function EditTransactionForm({ transaction }: { transaction: Transaction }) {
  const updateWithId = updateTransaction.bind(null, transaction.id)
  const [state, formAction, pending] = useActionState(updateWithId, initialState)

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Jenis</label>
        <select name="type" defaultValue={transaction.type} required className="border rounded w-full p-2">
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Jumlah</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          min="0.01"
          defaultValue={transaction.amount}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tanggal</label>
        <input
          type="date"
          name="transaction_date"
          defaultValue={transaction.transaction_date}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          name="description"
          defaultValue={transaction.description ?? ''}
          className="border rounded w-full p-2"
          rows={2}
        />
      </div>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      {state?.success && <p className="text-green-600 text-sm">Transaksi berhasil diperbarui</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
      </button>
    </form>
  )
}
'use client'

import { useActionState } from 'react'
import { createTransaction } from './actions'

const initialState = { error: null, success: false }

export default function TransactionForm() {
  const [state, formAction, pending] = useActionState(createTransaction, initialState)

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Jenis</label>
        <select name="type" required className="border rounded w-full p-2">
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Jumlah</label>
        <input type="number" name="amount" step="0.01" min="0.01" required className="border rounded w-full p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Tanggal</label>
        <input
          type="date"
          name="transaction_date"
          required
          defaultValue={new Date().toISOString().split('T')[0]}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea name="description" className="border rounded w-full p-2" rows={2} />
      </div>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      {state?.success && <p className="text-green-600 text-sm">Transaksi berhasil ditambahkan</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {pending ? 'Menyimpan...' : 'Tambah Transaksi'}
      </button>
    </form>
  )
}
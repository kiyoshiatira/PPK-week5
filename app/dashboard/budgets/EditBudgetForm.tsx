'use client'

import { useActionState } from 'react'
import { updateBudget } from './actions'
import Link from 'next/link'

type ActionState = {
  error: string | null
  success: boolean
}

const initialState: ActionState = { error: null, success: false }

type Budget = {
  id: string
  month: string
  amount: number
}

export default function EditBudgetForm({ budget }: { budget: Budget }) {
  const updateWithId = updateBudget.bind(null, budget.id)
  const [state, formAction, pending] = useActionState(updateWithId, initialState)

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Bulan (Periode)</label>
        <input
          type="month"
          name="month"
          defaultValue={budget.month ? budget.month.slice(0, 7) : ''}
          required
          className="border rounded w-full p-2"
        />
        <p className="text-xs text-gray-500 mt-1">Pilih bulan dan tahun anggaran</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nominal Anggaran (Rp)</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          min="0"
          defaultValue={budget.amount}
          required
          className="border rounded w-full p-2"
        />
      </div>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      {state?.success && (
        <p className="text-green-600 text-sm">Budget berhasil diperbarui!</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700"
        >
          {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        <Link
          href="/dashboard/budgets"
          className="text-sm text-gray-600 hover:underline"
        >
          Kembali
        </Link>
      </div>
    </form>
  )
}

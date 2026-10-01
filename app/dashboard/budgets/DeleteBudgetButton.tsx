'use client'

import { useState, useTransition } from 'react'
import { deleteBudget } from './actions'

export default function DeleteBudgetButton({ budgetId }: { budgetId: string }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      const result = await deleteBudget(budgetId)
      if (result?.error) {
        setError(result.error)
        setConfirming(false)
      }
    })
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">Yakin hapus?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm bg-red-600 text-white px-2 py-1 rounded disabled:opacity-50 hover:bg-red-700"
        >
          {isPending ? 'Menghapus...' : 'Ya, Hapus'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="text-sm border px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Batal
        </button>
        {error && <span className="text-red-600 text-xs">{error}</span>}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-sm text-red-600 hover:underline"
    >
      Hapus
    </button>
  )
}

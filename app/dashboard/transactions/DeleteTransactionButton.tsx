'use client'

import { useState, useTransition } from 'react'
import { deleteTransaction } from './actions'

export default function DeleteTransactionButton({ transactionId }: { transactionId: string }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      const result = await deleteTransaction(transactionId)
      if (result?.error) {
        setError(result.error)
        setConfirming(false)
      }
    })
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Yakin hapus?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm bg-red-600 text-white px-2 py-1 rounded disabled:opacity-50"
        >
          {isPending ? 'Menghapus...' : 'Ya, Hapus'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="text-sm border px-2 py-1 rounded"
        >
          Batal
        </button>
        {error && <span className="text-red-600 text-xs">{error}</span>}
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm text-red-600 hover:underline"
    >
      Hapus
    </button>
  )
}
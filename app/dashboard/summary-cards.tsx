'use client'

import useSWR from 'swr'

type Summary = {
  totalIncome: number
  totalExpense: number
  balance: number
}

const fetcher = async (url: string): Promise<Summary> => {
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? 'Gagal memuat data')
  }
  return res.json()
}

const formatRupiah = (value: number) => `Rp${value.toLocaleString('id-ID')}`

export default function SummaryCards() {
  const { data, error, isLoading } = useSWR<Summary>(
    '/api/dashboard/summary',
    fetcher
  )

  if (error) {
    return (
      <p className="text-red-600 text-sm">Gagal memuat data: {error.message}</p>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="h-4 w-20 bg-gray-300 rounded mb-3" />
            <div className="h-7 w-28 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    )
  }

  const { totalIncome, totalExpense, balance } = data

  return (
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
  )
}
'use client'

import useSWR from 'swr'
import Link from 'next/link'

type Usage =
  | { month: string; hasBudget: false; spent: number }
  | {
      month: string
      hasBudget: true
      budget: number
      spent: number
      remaining: number
      percentage: number
      status: 'safe' | 'warning' | 'over'
    }

const fetcher = async (url: string): Promise<Usage> => {
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Gagal memuat data (HTTP ${res.status})`)
  }
  return res.json()
}

const formatRupiah = (value: number) => `Rp${value.toLocaleString('id-ID')}`

const styles = {
  safe: { bar: 'bg-green-600', text: 'text-green-600' },
  warning: { bar: 'bg-yellow-500', text: 'text-yellow-500' },
  over: { bar: 'bg-red-600', text: 'text-red-600' },
}

export default function BudgetUsage() {
  const { data, error, isLoading } = useSWR<Usage>('/api/budget/usage', fetcher)

  if (error) {
    return (
      <p className="text-red-600 text-sm">
        Gagal memuat budget: {error.message}
      </p>
    )
  }

  if (isLoading || !data) {
    return <div className="border rounded-lg p-4 animate-pulse h-28" />
  }

  if (!data.hasBudget) {
    return (
      <div className="border rounded-lg p-4 space-y-2">
        <h2 className="font-semibold">Budget Bulan Ini</h2>
        <p className="text-sm text-gray-500">
          Belum ada budget untuk bulan ini. Pengeluaran bulan ini:{' '}
          {formatRupiah(data.spent)}.
        </p>
        <Link href="/dashboard/budgets" className="text-blue-500 text-sm underline">
          Atur budget
        </Link>
      </div>
    )
  }

  const { budget, spent, remaining, percentage, status } = data
  const s = styles[status]

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Budget Bulan Ini</h2>
        <span className={`text-sm font-semibold ${s.text}`}>{percentage}%</span>
      </div>

      <div className="h-3 w-full rounded bg-gray-300 overflow-hidden">
        <div
          className={`h-full ${s.bar}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>Terpakai: {formatRupiah(spent)}</span>
        <span>Budget: {formatRupiah(budget)}</span>
      </div>

      {status === 'over' && (
        <p className="text-sm text-red-600 font-semibold">
          ⚠ Pengeluaran melebihi budget sebesar {formatRupiah(spent - budget)}.
        </p>
      )}
      {status === 'warning' && (
        <p className="text-sm text-yellow-500 font-semibold">
          Pengeluaran sudah mencapai {percentage}% dari budget. Sisa{' '}
          {formatRupiah(remaining)}.
        </p>
      )}
      {status === 'safe' && (
        <p className="text-sm text-gray-500">Sisa budget: {formatRupiah(remaining)}</p>
      )}
    </div>
  )
}
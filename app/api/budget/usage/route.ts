import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

const pad = (n: number) => String(n).padStart(2, '0')

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() // 0-11
  const start = `${year}-${pad(month + 1)}-01`
  const next =
    month === 11 ? `${year + 1}-01-01` : `${year}-${pad(month + 2)}-01`
  const monthLabel = `${year}-${pad(month + 1)}`

  const { data: budget, error: budgetError } = await supabase
    .from('budgets')
    .select('amount')
    .eq('user_id', user.id)
    .gte('month', start)
    .lt('month', next)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (budgetError) {
    return NextResponse.json({ error: budgetError.message }, { status: 500 })
  }

  const { data: expenses, error: expenseError } = await supabase
    .from('transactions')
    .select('amount')
    .eq('user_id', user.id)
    .eq('type', 'expense')
    .gte('transaction_date', start)
    .lt('transaction_date', next)

  if (expenseError) {
    return NextResponse.json({ error: expenseError.message }, { status: 500 })
  }

  const spent = (expenses ?? []).reduce((sum, t) => sum + Number(t.amount), 0)

  if (!budget) {
    return NextResponse.json({ month: monthLabel, hasBudget: false, spent })
  }

  const amount = Number(budget.amount)
  const percentage = amount > 0 ? (spent / amount) * 100 : spent > 0 ? 100 : 0
  const status = spent > amount ? 'over' : percentage >= 80 ? 'warning' : 'safe'

  return NextResponse.json({
    month: monthLabel,
    hasBudget: true,
    budget: amount,
    spent,
    remaining: amount - spent,
    percentage: Math.round(percentage * 10) / 10,
    status,
  })
}
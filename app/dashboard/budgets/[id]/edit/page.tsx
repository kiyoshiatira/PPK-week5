import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import EditBudgetForm from '../../EditBudgetForm'
import { notFound } from 'next/navigation'

export default async function EditBudgetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  const { data: budget, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id) // validasi kepemilikan
    .single()

  if (error || !budget) {
    notFound()
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Budget Bulanan</h1>
      <EditBudgetForm budget={budget} />
    </div>
  )
}

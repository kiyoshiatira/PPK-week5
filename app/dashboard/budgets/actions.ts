'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const budgetSchema = z.object({
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Format bulan harus YYYY-MM'),
  amount: z.coerce.number().min(0, 'Jumlah budget minimal 0'),
})

export type ActionState = {
  error: string | null
  success: boolean
}

export async function updateBudget(
  budgetId: string,
  prevState: ActionState | null | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Anda harus login terlebih dahulu', success: false }
  }

  const parsed = budgetSchema.safeParse({
    month: formData.get('month'),
    amount: formData.get('amount'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false }
  }

  // Validasi kepemilikan eksplisit sebelum update
  const { data: existing, error: fetchError } = await supabase
    .from('budgets')
    .select('id, user_id, month')
    .eq('id', budgetId)
    .single()

  if (fetchError || !existing) {
    return { error: 'Budget tidak ditemukan', success: false }
  }

  if (existing.user_id !== user.id) {
    return { error: 'Anda tidak memiliki akses untuk mengubah budget ini', success: false }
  }

  const monthDate = parsed.data.month.length === 7 ? `${parsed.data.month}-01` : parsed.data.month
  const existingMonthStr = existing.month ? existing.month.slice(0, 7) : ''

  // Cek duplikasi jika bulan diubah ke bulan lain yang sudah ada budgetnya
  if (existingMonthStr !== parsed.data.month) {
    const { data: duplicate } = await supabase
      .from('budgets')
      .select('id')
      .eq('user_id', user.id)
      .eq('month', monthDate)
      .neq('id', budgetId)
      .maybeSingle()

    if (duplicate) {
      return { error: `Budget untuk bulan ${parsed.data.month} sudah ada`, success: false }
    }
  }

  const { error } = await supabase
    .from('budgets')
    .update({
      month: monthDate,
      amount: parsed.data.amount,
      updated_at: new Date().toISOString(),
    })
    .eq('id', budgetId)
    .eq('user_id', user.id) // defense in depth

  if (error) {
    return { error: 'Gagal memperbarui budget: ' + error.message, success: false }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/budgets')
  return { error: null, success: true }
}

export async function deleteBudget(budgetId: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Anda harus login terlebih dahulu' }
  }

  // Validasi kepemilikan eksplisit sebelum hapus
  const { data: existing, error: fetchError } = await supabase
    .from('budgets')
    .select('user_id')
    .eq('id', budgetId)
    .single()

  if (fetchError || !existing) {
    return { error: 'Budget tidak ditemukan' }
  }

  if (existing.user_id !== user.id) {
    return { error: 'Anda tidak memiliki akses untuk menghapus budget ini' }
  }

  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', budgetId)
    .eq('user_id', user.id) // defense in depth

  if (error) {
    return { error: 'Gagal menghapus budget: ' + error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/budgets')
  return { success: true }
}

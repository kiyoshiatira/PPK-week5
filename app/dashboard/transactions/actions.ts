'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.coerce.number().positive('Jumlah harus lebih dari 0'),
  transaction_date: z.string().min(1, 'Tanggal wajib diisi'),
  description: z.string().max(255).optional(),
})

export async function createTransaction(prevState: any, formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Anda harus login terlebih dahulu' }
  }

  const parsed = transactionSchema.safeParse({
    type: formData.get('type'),
    amount: formData.get('amount'),
    transaction_date: formData.get('transaction_date'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { error } = await supabase.from('transactions').insert({
    user_id: user.id,
    type: parsed.data.type,
    amount: parsed.data.amount,
    transaction_date: parsed.data.transaction_date,
    description: parsed.data.description || null,
  })

  if (error) {
    return { error: 'Gagal menyimpan transaksi: ' + error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateTransaction(
  transactionId: string,
  prevState: any,
  formData: FormData
) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Anda harus login terlebih dahulu' }
  }

  const parsed = transactionSchema.safeParse({
    type: formData.get('type'),
    amount: formData.get('amount'),
    transaction_date: formData.get('transaction_date'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  // Validasi kepemilikan eksplisit sebelum update
  const { data: existing, error: fetchError } = await supabase
    .from('transactions')
    .select('user_id')
    .eq('id', transactionId)
    .single()

  if (fetchError || !existing) {
    return { error: 'Transaksi tidak ditemukan' }
  }

  if (existing.user_id !== user.id) {
    return { error: 'Anda tidak memiliki akses untuk mengubah transaksi ini' }
  }

  const { error } = await supabase
    .from('transactions')
    .update({
      type: parsed.data.type,
      amount: parsed.data.amount,
      transaction_date: parsed.data.transaction_date,
      description: parsed.data.description || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', transactionId)
    .eq('user_id', user.id) // defense in depth, selain RLS

  if (error) {
    return { error: 'Gagal memperbarui transaksi: ' + error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteTransaction(transactionId: string) {
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
    .from('transactions')
    .select('user_id')
    .eq('id', transactionId)
    .single()

  if (fetchError || !existing) {
    return { error: 'Transaksi tidak ditemukan' }
  }

  if (existing.user_id !== user.id) {
    return { error: 'Anda tidak memiliki akses untuk menghapus transaksi ini' }
  }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId)
    .eq('user_id', user.id) // defense in depth, selain RLS

  if (error) {
    return { error: 'Gagal menghapus transaksi: ' + error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
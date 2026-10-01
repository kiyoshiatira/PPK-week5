'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)


    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (signUpError) {
      setError(
        signUpError.message.includes('already registered')
          ? 'Email sudah terdaftar, coba login.'
          : signUpError.message
      )
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
      })
    }

    router.push('/login')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Daftar Akun</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Nama lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
      <button type="submit" disabled={loading}>{loading ? 'Mendaftarkan...' : 'Daftar'}</button>
    </form>
  )
}
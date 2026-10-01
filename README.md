# DUITku

Aplikasi web Expense Tracker sederhana yang membantu mahasiswa mengelola keuangan pribadi — mencatat pemasukan dan pengeluaran, melihat riwayat transaksi, serta memantau kondisi keuangan melalui saldo, total pemasukan, dan total pengeluaran.

## Deskripsi Proyek

DUITku dirancang khusus untuk mahasiswa yang ingin mengelola keuangan pribadinya secara sederhana melalui aplikasi web. Setiap pengguna membuat akun dan login untuk mencatat transaksi keuangannya sendiri. Data transaksi terhubung langsung dengan pengguna yang sedang login, sehingga setiap pengguna hanya dapat mengakses dan mengelola datanya sendiri. Aplikasi mempertahankan sesi login pengguna selama masih aktif, dan menggunakan cookies untuk menyimpan minimal satu preferensi tampilan pengguna.

**Tim Proyek**
- Project Manager: Thariq
- Programmer: Kiyoshi Akila Tira
- Programmer: Revanska Muhammad Athallah

## User Story

1. Sebagai mahasiswa, saya ingin membuat akun dan masuk ke dalam aplikasi, sehingga saya bisa mencatat pemasukan dan pengeluaran saya sendiri.
2. Sebagai pengguna, saya ingin data transaksi saya terhubung dengan akun saya, sehingga hanya saya yang dapat mengakses dan mengelola data milik saya sendiri.
3. Sebagai pengguna, saya ingin sesi login saya tetap dipertahankan selama masih berlaku, sehingga saya tidak perlu login ulang setiap kali membuka aplikasi.
4. Sebagai pengguna, saya ingin aplikasi menyimpan minimal satu preferensi saya menggunakan cookies, sehingga pengalaman menggunakan aplikasi lebih personal.
5. Sebagai pengguna, saya ingin menambahkan, mengubah, menghapus, dan melihat transaksi keuangan saya melalui dashboard, sehingga saya bisa mengelola catatan keuangan saya dengan mudah.
6. Sebagai pengguna, saya ingin melihat riwayat transaksi saya, sehingga saya bisa memantau arus kas saya.
7. Sebagai pengguna, saya ingin melihat kondisi keuangan saya melalui saldo, total pemasukan, dan total pengeluaran, sehingga saya mengetahui kondisi keuangan saya dengan cepat.

## Software Requirement Specification (SRS)

### Kiyoshi Akila Tira

| SRS | Kebutuhan | User Story |
|---|---|---|
| SRS 1 | Registrasi akun | Sebagai mahasiswa, saya ingin membuat akun, sehingga saya bisa mulai menggunakan aplikasi dengan identitas saya sendiri. |
| SRS 2 | Login aman | Sebagai mahasiswa, saya ingin login dengan aman, sehingga data keuangan pribadi saya tidak bisa diakses orang lain. |
| SRS 3 | Manajemen sesi | Sebagai pengguna, saya ingin sesi login saya tetap dipertahankan selama saya aktif, sehingga saya tidak perlu login ulang setiap kali membuka aplikasi. |
| SRS 4 | Isolasi data pengguna | Sebagai pengguna, saya ingin data transaksi saya hanya bisa diakses oleh akun saya sendiri, sehingga privasi keuangan saya terjaga. |
| SRS 5 | Preferensi via cookies | Sebagai pengguna, saya ingin aplikasi mengingat preferensi tampilan saya lewat cookies, sehingga saya tidak perlu mengatur ulang setiap kali membuka aplikasi. |

### Revanska Muhammad Athallah

| SRS | Kebutuhan | User Story |
|---|---|---|
| SRS 6 | Tambah transaksi | Sebagai pengguna, saya ingin menambahkan catatan pemasukan atau pengeluaran, sehingga data transaksi saya selalu up-to-date. |
| SRS 7 | Edit transaksi | Sebagai pengguna, saya ingin mengubah catatan transaksi yang sudah ada, sehingga data transaksi saya tetap akurat. |
| SRS 8 | Hapus transaksi | Sebagai pengguna, saya ingin menghapus catatan transaksi, sehingga data transaksi saya tidak menumpuk dengan entri yang salah. |
| SRS 9 | Riwayat transaksi | Sebagai pengguna, saya ingin melihat riwayat transaksi saya, sehingga saya bisa memantau arus kas saya. |
| SRS 10 | Dashboard ringkasan keuangan | Sebagai pengguna, saya ingin melihat ringkasan keuangan di dashboard (saldo, total pemasukan, total pengeluaran), sehingga saya mengetahui kondisi keuangan saya dengan cepat. |

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: PostgreSQL (via Supabase)
- **Autentikasi**: Supabase Auth

## Cara Install

### Prasyarat

- Node.js (v18 atau lebih baru)
- npm / yarn / pnpm
- PostgreSQL (lokal atau melalui Supabase)
- Akun [Supabase](https://supabase.com) (jika menggunakan Supabase sebagai penyedia database & auth)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/<username>/PPK-week-5
   cd PPK-week-5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi environment variables**

   Buat file `.env.local` di root proyek, lalu isi dengan kredensial berikut:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   ```

4. **Setup database**

   Jalankan skrip SQL untuk membuat tabel (`profiles`, `transactions`) dan mengaktifkan Row Level Security di Supabase SQL Editor, atau melalui migrasi jika menggunakan ORM.

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production

```bash
npm run build
npm start
```

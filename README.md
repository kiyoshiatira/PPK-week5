# DUITku

Aplikasi web Expense Tracker sederhana yang membantu mahasiswa mengelola keuangan pribadi — mencatat pemasukan dan pengeluaran, melihat riwayat transaksi, serta memantau kondisi keuangan melalui saldo, total pemasukan, dan total pengeluaran.

## Deskripsi Proyek

DUITku dirancang khusus untuk mahasiswa yang ingin mengelola keuangan pribadinya secara sederhana melalui aplikasi web. Setiap pengguna membuat akun dan login untuk mencatat transaksi keuangannya sendiri. Data transaksi terhubung langsung dengan pengguna yang sedang login, sehingga setiap pengguna hanya dapat mengakses dan mengelola datanya sendiri. Aplikasi mempertahankan sesi login pengguna selama masih aktif, dan menggunakan cookies untuk menyimpan minimal satu preferensi tampilan pengguna.

**Tim Proyek**
- Project Manager: Kiyoshi AKila Tira
- Programmer 1:  Aprilia Abel Cleodora
- Programmer 2: Arsy Thariq Munawar
- Programmer 3: Revanska Muhammad Athallah

## User Story
## User Story — Budget Bulanan

Sebagai pengembang, saya ingin memastikan dashboard, manajemen transaksi, dan filter sudah melakukan update data tanpa reload halaman penuh, sehingga fitur budget bulanan dapat dibangun di atas pola interaksi yang konsisten dan responsif.

Sebagai pengguna, saya ingin menetapkan nominal anggaran pengeluaran untuk bulan tertentu, sehingga saya memiliki batas acuan dalam mengelola pengeluaran bulanan saya.

Sebagai pengguna, saya ingin dapat mengubah atau menghapus anggaran bulanan yang telah saya buat, sehingga saya dapat menyesuaikan anggaran apabila ada perubahan rencana keuangan.

Sebagai pengguna, saya ingin melihat daftar anggaran bulanan yang pernah saya buat, sehingga saya dapat meninjau kebiasaan pengelolaan anggaran saya dari bulan ke bulan.


Sebagai pengguna, saya ingin melihat perbandingan antara total pengeluaran bulan ini dengan anggaran yang telah saya tetapkan, sehingga saya dapat mengetahui apakah pengeluaran saya masih sesuai batas atau sudah melampauinya.
## Software Requirement Specification (SRS)
## SRS-C: Budget Bulanan

| ID | Fitur | Deskripsi | Penanggung Jawab |
|---|---|---|---|
| SRS-C0 | Verifikasi implementasi AJAX | Memeriksa bahwa dashboard, manajemen transaksi, dan filter sudah melakukan update data tanpa reload halaman penuh (client-side fetch). Menjadi prasyarat sebelum SRS-C1–C4 dikerjakan | Anggota 3 |
| SRS-C1 | Set budget bulanan | Form input nominal budget per bulan. Satu user hanya dapat memiliki satu budget aktif per bulan (validasi duplikasi) | Anggota 1 |
| SRS-C2 | Edit & hapus budget | Update dan hapus budget milik sendiri, dengan validasi kepemilikan data | Anggota 2 |
| SRS-C3 | Riwayat budget bulanan | Menampilkan daftar budget yang pernah dibuat, dikelompokkan per bulan | Anggota 2 |
| SRS-C4 | Pantau penggunaan budget | Menghitung total pengeluaran (expense) pada bulan berjalan dan membandingkannya dengan nominal budget yang ditetapkan, lengkap dengan indikator peringatan jika pengeluaran melebihi budget | Anggota 3 |

## Pembagian Kerja

**Aprillia Abel Cleodora — SRS-C1**
Mengimplementasikan form input budget bulanan beserta validasi agar satu user tidak dapat membuat lebih dari satu budget pada bulan yang sama.

**Arsy Thariq Munawar — SRS-C2, SRS-C3**
Mengimplementasikan fitur edit dan hapus budget (dengan validasi kepemilikan), serta halaman riwayat budget yang menampilkan data budget per bulan.

**Revanska Muhammad Athallah — SRS-C0, SRS-C4**
Memverifikasi implementasi AJAX pada dashboard, manajemen transaksi, dan filter sebagai prasyarat, kemudian mengimplementasikan logika perhitungan total pengeluaran bulan berjalan dan integrasinya ke dashboard dalam bentuk indikator/progress penggunaan budget terhadap batas yang ditetapkan.

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

import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function TransactionsPage() {
  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold mb-4">Tambah Transaksi</h1>
        <TransactionForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Riwayat Transaksi</h2>
        <TransactionList />
      </div>
    </div>
  )
}
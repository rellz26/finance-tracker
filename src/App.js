import { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('pemasukan');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = () => {
    if (!name || !amount) return;
    const newTransaction = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      type,
    };
    setTransactions([newTransaction, ...transactions]);
    setName('');
    setAmount('');
  };

  const totalPemasukan = transactions
    .filter((t) => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = transactions
    .filter((t) => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Keuangan Pribadi</h1>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-800 p-4 rounded">
          <h3 className="text-lg font-semibold">Pemasukan</h3>
          <p className="text-2xl font-bold">Rp{totalPemasukan.toLocaleString()}</p>
        </div>
        <div className="bg-red-800 p-4 rounded">
          <h3 className="text-lg font-semibold">Pengeluaran</h3>
          <p className="text-2xl font-bold">Rp{totalPengeluaran.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold">Saldo Tersisa</h3>
          <p className="text-2xl font-bold">Rp{saldo.toLocaleString()}</p>
        </div>
      </div>

      {/* Form Input */}
      <div className="mb-4 space-y-2">
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Nama transaksi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="number"
          placeholder="Jumlah"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="pemasukan">Pemasukan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>
        <button
          onClick={handleAdd}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          Tambah Transaksi
        </button>
      </div>

      {/* Riwayat */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Riwayat Transaksi</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className={`p-3 rounded ${tx.type === 'pemasukan' ? 'bg-green-700' : 'bg-red-700'}`}
          >
            <div className="flex justify-between">
              <span>{tx.name}</span>
              <span>
                {tx.type === 'pengeluaran' ? '-' : '+'} Rp{tx.amount.toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

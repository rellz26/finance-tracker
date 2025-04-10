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

  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  const totalPemasukan = transactions
    .filter((t) => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = transactions
    .filter((t) => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 py-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-wide mb-2">💰 Keuangan Pribadi</h1>
          <p className="text-gray-400">Kelola pemasukan & pengeluaranmu dengan mudah</p>
        </header>

        {/* Ringkasan */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-700/80 backdrop-blur p-5 rounded-2xl shadow-md">
            <h3 className="text-sm font-medium uppercase text-green-100">Pemasukan</h3>
            <p className="text-2xl font-bold">Rp{totalPemasukan.toLocaleString()}</p>
          </div>
          <div className="bg-red-700/80 backdrop-blur p-5 rounded-2xl shadow-md">
            <h3 className="text-sm font-medium uppercase text-red-100">Pengeluaran</h3>
            <p className="text-2xl font-bold">Rp{totalPengeluaran.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700/80 backdrop-blur p-5 rounded-2xl shadow-md">
            <h3 className="text-sm font-medium uppercase text-gray-300">Saldo</h3>
            <p className="text-2xl font-bold">Rp{saldo.toLocaleString()}</p>
          </div>
        </section>

        {/* Form Input */}
        <section className="space-y-3 bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Tambah Transaksi</h2>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Nama transaksi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="number"
            placeholder="Jumlah"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
          <button
            onClick={handleAdd}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold text-white transition"
          >
            ➕ Tambah Transaksi
          </button>
        </section>

        {/* Riwayat Transaksi */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Riwayat Transaksi</h2>
          <ul className="space-y-3">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md transition-all ${
                  tx.type === 'pemasukan' ? 'bg-green-800/70' : 'bg-red-800/70'
                }`}
              >
                <div>
                  <p className="font-medium text-lg">{tx.name}</p>
                  <p className="text-sm text-gray-200">
                    {tx.type === 'pengeluaran' ? '-' : '+'} Rp{tx.amount.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="text-sm text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;

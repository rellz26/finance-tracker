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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight">💸 Keuangan Pribadi</h1>
          <p className="text-gray-400">Pantau pemasukan dan pengeluaran kamu dengan mudah!</p>
        </header>

        {/* Ringkasan */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-600/80 backdrop-blur-md p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm uppercase text-green-100 mb-1">Pemasukan</h3>
            <p className="text-3xl font-bold">Rp{totalPemasukan.toLocaleString()}</p>
          </div>
          <div className="bg-red-600/80 backdrop-blur-md p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm uppercase text-red-100 mb-1">Pengeluaran</h3>
            <p className="text-3xl font-bold">Rp{totalPengeluaran.toLocaleString()}</p>
          </div>
          <div className="bg-gray-600/80 backdrop-blur-md p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm uppercase text-gray-300 mb-1">Saldo</h3>
            <p className="text-3xl font-bold">Rp{saldo.toLocaleString()}</p>
          </div>
        </section>

        {/* Form Input */}
        <section className="bg-gray-800 p-8 rounded-3xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold mb-2">➕ Tambah Transaksi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nama transaksi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="number"
              placeholder="Jumlah"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
            <button
              onClick={handleAdd}
              className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-xl font-semibold text-white transition shadow"
            >
              Tambahkan
            </button>
          </div>
        </section>

        {/* Riwayat Transaksi */}
        <section className="bg-gray-800 p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">📋 Riwayat Transaksi</h2>
          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md ${
                  tx.type === 'pemasukan' ? 'bg-green-700/60' : 'bg-red-700/60'
                }`}
              >
                <div>
                  <p className="font-semibold text-lg">{tx.name}</p>
                  <p className="text-sm text-gray-200">
                    {tx.type === 'pengeluaran' ? '-' : '+'} Rp{tx.amount.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="text-sm text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-full shadow"
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

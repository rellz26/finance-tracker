import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('pemasukan');

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Keuangan Pribadi</h1>

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

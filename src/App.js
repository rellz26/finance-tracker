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
          <p className="text-2xl font-bold">Rp{totalPemasukan.toLocaleString()}</

import React, { useState, useRef } from 'react';

const CATS = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || Number(amount) <= 0 || !date) {
      return setError('Nhập đủ nội dung, số tiền > 0 và ngày chi!');
    }
    const ok = await onAdd({ title: title.trim(), amount: Number(amount), category, date });
    if (ok) {
      setTitle('');
      setAmount('');
      setError('');
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row">
      <input ref={inputRef} placeholder="Nội dung chi" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Số tiền" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATS.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Thêm</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
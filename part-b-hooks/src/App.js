import React, { useState, useEffect, createContext, useContext } from 'react';
import Clock from './components/Clock';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import useFetch from './hooks/useFetch';
import './App.css';

const API_URL = 'https://6b079dc158419b87a43865dd.mockapi.io/expenses';
const ThemeContext = createContext();

function MainApp() {
  const { dark, setDark } = useContext(ThemeContext);
  const { data: expenses, loading, error, addItem, deleteItem } = useFetch(API_URL);
  const [filter, setFilter] = useState('Tất cả');
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    const total = expenses.reduce((s, i) => s + Number(i.amount), 0);
    document.title = `Tổng chi: ${total.toLocaleString()} đ`;
  }, [expenses]);

  const filtered = filter === 'Tất cả' ? expenses : expenses.filter((i) => i.category === filter);

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <div className="container">
        <header className="header">
          <h2>Sổ Chi Tiêu Cá Nhân</h2>
          <div>
            {showClock && <Clock />}
            <button onClick={() => setShowClock(!showClock)}>{showClock ? 'Ẩn' : 'Hiện'}</button>
            <button onClick={() => setDark(!dark)}>{dark ? '☀️ Sáng' : '🌙 Tối'}</button>
          </div>
        </header>

        <div className="layout-grid">
          <aside className="left-col">
            <h3 className="col-title">+ Khoản chi mới</h3>
            <ExpenseForm onAdd={addItem} />
          </aside>

          <main className="right-col">
            <FilterBar filter={filter} onSelect={setFilter} />
            {error && <p className="empty error">⚠️ {error}</p>}
            {loading ? <p className="empty">⏳ Đang tải...</p> : (
              <ExpenseList
                items={filtered}
                onDelete={(id) => window.confirm('Xóa khoản chi này?') && deleteItem(id)}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <MainApp />
    </ThemeContext.Provider>
  );
}
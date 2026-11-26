import React, { Component } from 'react';
import Clock from './components/Clock';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import './App.css';
const SAMPLE_DATA = [
  { id: 1, title: 'Đổ xăng', amount: 50000, category: 'Đi lại', date: '2026-11-25' },
  
];
export default class App extends Component {
  state = {
    expenses: SAMPLE_DATA,
    filter: 'Tất cả',
    showClock: true,
  };
  updateTitle = () => {
    const total = this.state.expenses.reduce((s, i) => s + i.amount, 0);
    document.title = `Tổng chi: ${total.toLocaleString()} đ`;
  };
  componentDidMount() {
    this.updateTitle();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateTitle();
    }
  }
  handleAdd = (item) => {
    this.setState({ expenses: [item, ...this.state.expenses] });
  };
    handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa khoản chi này?')) {
      this.setState({ expenses: this.state.expenses.filter((i) => i.id !== id) });
    }
  };
  render() {
    const { expenses, filter, showClock } = this.state;
    const filtered = filter === 'Tất cả' ? expenses : expenses.filter((i) => i.category === filter);
    return (
      <div className="container">
        <header className="header">
          <h2>Sổ Chi Tiêu Cá Nhân</h2>
          <div>
            {showClock && <Clock />}
            <button onClick={() => this.setState({ showClock: !showClock })}>
              {showClock ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
        </header>

        <div className="layout-grid">
          <aside className="left-col">
            <h3 className="col-title">+ Khoản chi mới</h3>
            <ExpenseForm onAdd={this.handleAdd} />
          </aside>

          <main className="right-col">
            <FilterBar filter={filter} onSelect={(f) => this.setState({ filter: f })} />
            <ExpenseList items={filtered} onDelete={this.handleDelete} />
          </main>
        </div>
      </div>
    );
  }
}
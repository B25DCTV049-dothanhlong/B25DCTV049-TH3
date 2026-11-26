import React, { Component } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default class ExpenseForm extends Component {
  state = {
    title: '',
    amount: '',
    category: 'Ăn uống',
    date: new Date().toISOString().split('T')[0],
    error: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = this.state;
    if (!title.trim() || Number(amount) <= 0 || !date) {
      this.setState({ error: 'Vui lòng nhập đủ nội dung, số tiền > 0 và ngày chi!' });
      return;
    }
    this.props.onAdd({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });
    this.setState({ title: '', amount: '', error: '' });
  };

  render() {
    const { title, amount, category, date, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="row">
        <input name="title" placeholder="Nội dung chi" value={title} onChange={this.handleChange} />
        <input name="amount" type="number" placeholder="Số tiền" value={amount} onChange={this.handleChange} />
        <select name="category" value={category} onChange={this.handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name="date" type="date" value={date} onChange={this.handleChange} />
        <button type="submit">Thêm</button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }
}
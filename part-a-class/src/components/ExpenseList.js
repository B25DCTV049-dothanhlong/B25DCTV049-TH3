import React, { Component } from 'react';

export default class ExpenseList extends Component {
  render() {
    const { items, onDelete } = this.props;
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div className="expense-board">
        <div className="total-row">
          <span>Tổng tiền ({items.length} khoản):</span>
          <b>{total.toLocaleString()} đ</b>
        </div>

        <div className="card-list">
          {items.length === 0 ? (
            <p className="empty">Chưa có khoản chi nào.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="expense-card">
                <div className="card-info">
                  <strong>{item.title}</strong>
                  <div className="card-meta">
                    <span className="tag">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="card-right">
                  <span className="amount">{item.amount.toLocaleString()} đ</span>
                  <button onClick={() => onDelete(item.id)}>Xóa</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
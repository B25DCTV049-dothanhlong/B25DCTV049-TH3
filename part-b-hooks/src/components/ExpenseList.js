import React from 'react';

export default function ExpenseList({ items, onDelete }) {
  const total = items.reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <>
      <div className="total-row">
        <span>Tổng tiền ({items.length} khoản):</span>
        <b>{total.toLocaleString()} đ</b>
      </div>

      {items.length === 0 ? (
        <p className="empty">Chưa có khoản chi nào.</p>
      ) : (
        <div className="card-list">
          {items.map((i) => (
            <div key={i.id} className="expense-card">
              <div>
                <strong>{i.title}</strong>
                <div className="card-meta">
                  <span className="tag">{i.category}</span>
                  <span>{i.date}</span>
                </div>
              </div>
              <div className="card-right">
                <span className="amount">{Number(i.amount).toLocaleString()} đ</span>
                <button onClick={() => onDelete(i.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
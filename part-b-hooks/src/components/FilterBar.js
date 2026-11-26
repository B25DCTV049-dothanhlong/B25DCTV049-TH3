import React from 'react';

const FILTERS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function FilterBar({ filter, onSelect }) {
  return (
    <div className="row">
      {FILTERS.map((c) => (
        <button key={c} className={filter === c ? 'active' : ''} onClick={() => onSelect(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
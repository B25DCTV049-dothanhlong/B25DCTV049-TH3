import React, { Component } from 'react';

const FILTERS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default class FilterBar extends Component {
  render() {
    const { filter, onSelect } = this.props;
    return (
      <div className="row">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? 'active' : ''}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
}
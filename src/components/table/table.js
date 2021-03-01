import React from 'react';
import './table.scss';

const Table = ( { items, onSortColumn } ) => {

  const sortType = {
    id: 'id',
    description: 'text'
  }

  const renderRow = (item) => {
    const { id, text } = item
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{text}</td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead className="table-column">
        <tr>
          <th onClick={() => onSortColumn(sortType.id)}>#</th>
          <th onClick={() => onSortColumn(sortType.description)}>Description</th>
        </tr>
      </thead>
      <tbody className="table-row">
      {items.map(renderRow)}
      </tbody>
    </table>
  )
}
export default Table;

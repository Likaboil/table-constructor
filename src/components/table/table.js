import React from 'react';
import './table.scss';

const Table = ( { items } ) => {

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
          <th>#</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody className="table-row">
      {items.map(renderRow)}
      </tbody>
    </table>
  )
}
export default Table;

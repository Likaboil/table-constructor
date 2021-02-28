import React from 'react';
import './app.scss';

import TableScreen from '../table-screen';

const App = () => {

  const items =  [
    {
      id: 1,
      text: 'mock-item'},
    {
      id: 2,
      text: 'mock-item'},
    {
      id: 3,
      text: 'mock-item'},
    {
      id: 4,
      text: 'mock-item'}
  ];

  return (
    <div className="page-container">
      <header className='app-header'>
        <h1 className="title">Table-constructor</h1>
      </header>
      <main>
        <TableScreen items={items} />
      </main>
    </div>
  );
};

export default App;

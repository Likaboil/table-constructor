import React from 'react';
import './app.scss';

import TableScreen from '../table-screen';
import MockData from '../../mock-data';

const App = () => {

  const items = MockData;

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

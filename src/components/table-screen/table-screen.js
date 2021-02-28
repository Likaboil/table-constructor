import React, { Component } from 'react';
import './table-screen.scss';

import Table from '../table';

export default class TableScreen extends Component {

  state = {
    items: this.props.items,
  }

  render() {

    const { items } = this.state;

    return (
      <div className="table-container">
        <Table items={items}/>
      </div>
    );
  }
};

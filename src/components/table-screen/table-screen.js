import React, { Component } from 'react';
import './table-screen.scss';

import Table from '../table';

export default class TableScreen extends Component {

  state = {
    items: this.props.items,
    sort: 'id',
    sortReverse: false,
  }

  onSortColumn = (sortType) => {

    const { items, sort, sortReverse } = this.state;

    if (sortType !== sort) {
      return  this.setState(
        {
          items: items.sort(this.sortColumn(sortType, sortReverse)),
          sortReverse: !sortReverse,
        });
    }

    return this.setState(
      {
        items: items.sort(this.sortColumn(sortType, sortReverse)),
        sortReverse: !sortReverse,
      });
  }

  sortColumn = (sortType, sortReverse) => {

      if (sortReverse) {
        return (a, b) => a[sortType]  < b[sortType] ? 1 : -1;
      }

      return (a, b) => a[sortType]  > b[sortType] ? 1 : -1;
  }

  render() {

    const { items } = this.state;

    return (
      <div className="table-container">
        <Table items={items} onSortColumn={this.onSortColumn}/>
      </div>
    );
  }
};

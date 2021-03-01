import React, { Component } from 'react';
import './table-screen.scss';

import Table from '../table';

export default class TableScreen extends Component {

  state = {
    items: this.props.items,
    sortType: 'id',
    sortReverse: false,
  }

  // по клику получаем тип стобца для сортировки по возрастанию
  // в state устанавливаем полученный тип и значение переменной для сортировки по убыванию
  onSortColumn = (sortType) => {
    const { sortReverse } = this.state;

    return this.setState(
      {
        sortType: sortType,
        sortReverse: !sortReverse
      });
  }

  // доп.функция для сортировки с учетом направления сортировки
  sortColumn = (sortType, sortReverse) => {
    if (sortReverse) {
      return (a, b) => a[sortType]  < b[sortType] ? 1 : -1;
    }

    return (a, b) => a[sortType]  > b[sortType] ? 1 : -1;
  }

  // сортировка данных на основе типа столбца и направления сортировки
  sortTableColumn = (items, sortType, sortReverse) => {
    switch(sortType) {
      case 'id':
      return  items.sort(this.sortColumn(sortType, sortReverse));
      case 'text':
      return items.sort(this.sortColumn(sortType, sortReverse));
      default:
        return items;
    };
  }

  render() {

    const { items, sortType, sortReverse } = this.state;

    // отсортированные данные
    const sortItems = this.sortTableColumn(items, sortType, sortReverse);

    return (
      <div className="table-container">
        <Table items={sortItems}
          onSortColumn={this.onSortColumn}
        />
      </div>
    );
  }
};

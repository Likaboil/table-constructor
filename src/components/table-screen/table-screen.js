import React, { Component } from 'react';
import './table-screen.scss';

import Table from '../table';
import SearchPanel from '../search-panel';
import Pagination from '../pagination';

export default class TableScreen extends Component {

  state = {
    items: this.props.items,
    sortType: 'id',
    sortReverse: false,
    searchLabel: '',
    pageActive: 1,
    pageLimit: 50,
    idxStart: 0,
    idxEnd: 49,
  }

  // по клику получаем тип стобца для сортировки по возрастанию
  // в state устанавливаем полученный тип и значение доп.свойства для сортировки по убыванию
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

  // по клику получаем значение из строки поиска
  onSearchChange = (searchLabel) =>  this.setState({ searchLabel });

  // поиск строки
  searchRow = (items, searchLabel ) => {

    // по умолчанию выводятся все данные
    if (searchLabel.length === 0) {
      return items;
    };

    return items.filter((item) => {
      return item.text.toLowerCase().indexOf(searchLabel.toLowerCase()) > -1;
    });
  }

  // получение номера активной страницы
  onBtnActive = (id) => this.setState({ pageActive: id })

  // создание массива кнопок
  createBtns = () => {
    const { items, pageLimit } = this.state;

    const btnCount = Math.ceil(items.length/pageLimit);
    const btns = [];

    for (let i = 1; i <= btnCount; i++) {
      const newBtn = {
        id: i,
        name: i
      };

      btns.push(newBtn);
    };

    return btns;
  }

  // ограничивает количество строк на одной странице - 50
  limitRow = (items) => {
    const { pageLimit, pageActive } = this.state;

    const idxEnd = pageActive * pageLimit;
    const idxStart = idxEnd - pageLimit;

    return  items.slice(idxStart, idxEnd);
  }

  render() {
    const { items, sortType, sortReverse, searchLabel, pageActive} = this.state;

    const btn = this.createBtns();

    // отсортированные данные
    const sortItems = this.sortTableColumn(items, sortType, sortReverse);

    // данные после поиска
    const searchItems = this.searchRow(sortItems, searchLabel)

    // данные лимитированные для страницы
    const visibleItems = this.limitRow(searchItems)

    return (
      <div className="table-container">
        <SearchPanel onSearchChange={this.onSearchChange} />
        <Table items={visibleItems}
          onSortColumn={this.onSortColumn}
        />
        <Pagination
          btns={btn}
          btnActive={pageActive}
          onBtnActive={this.onBtnActive} />
      </div>
    );
  }
};

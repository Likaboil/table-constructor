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

  // создание массива кнопок
  createBtns = () => {
    const { items, pageLimit } = this.state;

    // вычисление количеств кнопок
    const btnCount = Math.ceil(items.length/pageLimit);

    // цикл для создания массива объектов для кнопок
    const btns = [];

    for (let i = 0; i <= btnCount-1; i++) {
      const newBtn = {
        id: i+1,
        name: i+1
      };

      btns.push(newBtn);
    };

    return btns;
  }

  // получение номера активной страницы
  _handleBtnClick = (id) => {

    const { pageActive } = this.state;

    const pageActiveChange = (id === 'next') ? pageActive + 1:
                            (id === 'prev') ? pageActive - 1:
                            id;
    return this.setState({
      pageActive: pageActiveChange
    });
  }

  // вывод кнопок под таблицей и навигацией
  visibleBtns = (btns) => {

    const { pageActive } = this.state;

    const prevBtn = {
      id: 'prev',
      name: 'prev'
    };

    const nextBtn = {
      id: 'next',
      name: 'next'
    };

    // начало и конец отображаемых кнопок
    const startIdx = pageActive - 1;
    const endIdx = pageActive + 3;

    const visibleBtns = btns.slice(startIdx, endIdx);

    // переменные для определения текущего номера страницы и изменения положения активной кнопки
    const hasNextBtn = pageActive === 1;
    const hasPrevBtn = pageActive >= (btns.length - 2) && pageActive <= btns.length;
    const hasPrevandNextBtn = pageActive < (btns.length - 2)

    // определение текущего номера страницы и вставка кнопок навигации
    if (hasNextBtn) {
      return btns = [...visibleBtns, nextBtn]
    };

    if (hasPrevBtn)  {
      return btns = [prevBtn, ...visibleBtns]
    };

    if (hasPrevandNextBtn) {
      return btns= [prevBtn, ...visibleBtns, nextBtn]
    };
  }

  // ограничение количества строк на одной странице
  limitRow = (items) => {
    const { pageLimit, pageActive } = this.state;

    const idxEnd = pageActive * pageLimit;
    const idxStart = idxEnd - pageLimit;

    return  items.slice(idxStart, idxEnd);
  }

  render() {

    const { items, sortType, sortReverse, searchLabel, pageActive } = this.state;

    // кнопки пагинации
    const btns = this.createBtns();
    const visibleBtns = this.visibleBtns(btns);

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
          btns={visibleBtns}
          btnActive={pageActive}
          onBtnClick={this._handleBtnClick}
        />
      </div>
    );
  }
};

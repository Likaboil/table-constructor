import React from 'react';
import './pagination.scss';

const Pagination = ({ btns, btnActive, onBtnClick }) => {

  const renderBtn = btns.map((btn)=> {
    const { id, name } = btn;
    const isActive = btn.id === btnActive;

    const btnClassName = `nav-btn ${(isActive ? `nav-btn-active` : ``)}`;

    return (
      <button  className={btnClassName}
        key={id}
        type="button"
        onClick={() => onBtnClick(id)}
      >
        {name}
      </button>
      );
  });

  return (
    <nav className="table-nav">
      {renderBtn}
    </nav>
  );
};

export default Pagination;

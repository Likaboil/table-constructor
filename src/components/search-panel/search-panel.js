import React, { Component } from 'react';
import './search-panel.scss';

export default class SearchPanel extends Component {

  state = {
    label: ''
  }

  onLabelChange = (evt) => {
    const label = evt.target.value

    this.setState({ label });
    this.props.onSearchChange(label);
  }

  render() {

    return <input className="search-panel"
              id="search-input"
              placeholder="search"
              type="text"
              value={this.state.label}
              onChange={this.onLabelChange}
            />
  }
};

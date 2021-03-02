import React, { Component } from 'react';
import './search-panel.scss';

export default class SearchPanel extends Component {

  state = {
    label: ''
  }

  onInputChange = (evt) => {
    const label = evt.target.value

    this.setState({ label });
    this.props.onInputChange(label);
  }

  render() {

    return <input className="search-panel"
              id="search-input"
              placeholder="search"
              type="text"
              value={this.state.label}
              onChange={this.onInputChange}
            />
  }
};

import React, { Component } from 'react';
import CardList from './components/CardList';

export default class Market extends Component {
  static displayName = 'Market';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="market-page">
        <CardList />
      </div>
    );
  }
}

import React, { Component } from 'react';
import TagList from './components/TagList';

export default class MyCenter extends Component {
  static displayName = 'MyCenter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="my-center-page">
        <TagList />
      </div>
    );
  }
}

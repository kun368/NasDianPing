import React, { Component } from 'react';
import CreateForm from './components/CreateForm';

export default class Create extends Component {
  static displayName = 'Create';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="create-page">
        <CreateForm />
      </div>
    );
  }
}

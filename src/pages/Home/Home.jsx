import React, { Component } from 'react';
import SimpleSlider from './components/SimpleSlider/SimpleSlider';
import ProductInfo from './components/ProductInfo/ProductInfo';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <SimpleSlider/>
        <ProductInfo/>
      </div>
    );
  }
}

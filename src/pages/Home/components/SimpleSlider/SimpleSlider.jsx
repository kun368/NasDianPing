import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Slider } from '@icedesign/base';

const slides = [
  {
    url: 'http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/21080149.jpg',
    text: 'image',
  },
  {
    url: 'http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/62302180.jpg',
    text: 'image',
  },
  {
    url: 'http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/94367879.jpg',
    text: 'image',
  },
];

export default class SimpleSlider extends Component {
  static displayName = 'SimpleSlider';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <Slider
          autoplay={true}
        >
          {slides.map((item, index) => (
            <div key={index}>
              <img src={item.url} alt={item.text} style={styles.itemImg} />
            </div>
          ))}
        </Slider>
      </IceContainer>
    );
  }
}

const styles = {
  itemImg: {
    width: '100%',
  },
};

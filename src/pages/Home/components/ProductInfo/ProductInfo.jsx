import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const dataSource = [
  {
    title: '去中心化',
    pic: 'https://img.alicdn.com/tfs/TB1i7OMif6H8KJjSspmXXb2WXXa-210-210.png',
    desc: '区块链点评 没有中间商',
  },
  {
    title: '快捷选择',
    pic: 'https://img.alicdn.com/tfs/TB1a31mignH8KJjSspcXXb3QFXa-210-210.png',
    desc: '提供点评市场方便选择',
  },
  {
    title: '技术强硬',
    pic: 'https://img.alicdn.com/tfs/TB1ALecicrI8KJjy0FhXXbfnpXa-210-210.png',
    desc: '基于NAS智能合约',
  },
  {
    title: '安全第一',
    pic: 'https://img.alicdn.com/tfs/TB1EfLYfOqAXuNjy1XdXXaYcVXa-207-210.png',
    desc: '点评即不可篡改永不丢失',
  },
];

export default class ProductInfo extends Component {
  static displayName = 'ProductInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="product-info" style={styles.container}>
        <Row wrap>
          {dataSource.map((item, index) => {
            return (
              <Col xxs="12" s="6" l="6" key={index} style={styles.item}>
                <img src={item.pic} style={styles.pic} alt="" />
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.desc}>{item.desc}</p>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '30px 0',
  },
  item: {
    textAlign: 'center',
    padding: '10px 22px',
    marginBottom: '20px',
  },
  pic: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
  },
  desc: {
    lineHeight: '22px',
    color: '#999',
  },
};

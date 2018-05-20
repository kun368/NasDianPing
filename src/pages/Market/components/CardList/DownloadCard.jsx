import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Icon, Grid } from '@icedesign/base';
import './DownloadCard.scss';
import { Link } from 'react-router-dom';
import { MarketData } from '../../../../data/MarketContent.js'
import Create from '../../../Create/Create';

const { Row, Col } = Grid;
const { TabPane } = Tab;
const ButtonGroup = Button.Group;


export default class DownloadCard extends Component {
  static displayName = 'DownloadCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabData: [],
    };
  }

  componentDidMount() {
    this.setState({
      tabData: MarketData,
    })
  }

  renderButton = (item) => {
     if (item.support) {
       return (
         <div style={styles.downloadButtons}>
           <ButtonGroup>
             <Button
               type="primary"
               component="a"
               href={`/#/MyCenter/${item.id}`}
             >
               <Icon type="all" /> 查看点评
             </Button>
             <Button
               type="primary"
               component="a"
               href={`/#/Create/${item.id}`}
             >
               <Icon type="survey" /> 我要点评
             </Button>
           </ButtonGroup>
         </div>
       );
     }
     return (
       <div style={styles.downloadButtons}>
         <Button
           type="normal"
           component="a"
         >
           <Icon type="loading" /> 开发中 敬请期待
         </Button>
       </div>
     );
  };

  renderContent = (data) => {
    if (!data) {
      return '暂无数据';
    }
    return data.map((item, index) => {
      return (
        <Col key={index}>
          <div key={index} style={styles.columnCardItem}>
            <div style={styles.cardBody}>
              <div style={styles.avatarWrapper}>
                {/*<Icon type={item.img} size="xl"/>*/}
                <img style={styles.img} src={item.img} alt="头像" />
              </div>
              <p style={styles.title}>{item.title}</p>
              <p style={styles.desc}>{item.desc}</p>
            </div>
            {this.renderButton(item)}
          </div>
        </Col>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div className="download-card" style={styles.downloadCard}>
        <IceContainer>
          <Tab type="bar" contentStyle={{ padding: '20px 5px' }}>
            <TabPane tab="点评市场" key="1">
              <Row gutter="20" wrap>
                {this.renderContent(tabData)}
              </Row>
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  columnCardItem: {
    marginBottom: 20,
    position: 'relative',
    float: 'left',
    width: '100%',
    minWidth: '284px',
    // height: '280px',
    padding: '0px',
    overflow: 'hidden',
    boxShadow:
      '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  },
  cardBody: {
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #dedede',
  },
  avatarWrapper: {
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    margin: '0 auto',
  },
  title: {
    fontSize: '20px',
    margin: '10px',
  },
  desc: {
    fontSize: '15px',
    color: '#999',
  },
  downloadButtons: {
    margin: '15px 0',
    textAlign: 'center',
  },
  rightButton: {
    width: '114px',
    fontSize: '13px',
    marginLeft: '10px',
  },
  leftButton: {
    width: '114px',
    fontSize: '13px',
  },
  cardBottom: {
    padding: '10px 10px',
    background: '#f6f7f9',
  },
  bottomText: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#666',
    textDecoration: 'none',
  },
  img: {
    width: '100%',
  },
};

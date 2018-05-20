import React, {Component} from 'react';
import {Tab, Feedback, Grid, Rating } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './TagMessageList.scss';
import {Base64} from 'js-base64';
import NebUtils from "../../../../util/NebUtils";
import { MarketData } from '../../../../data/MarketContent';
import { withRouter } from 'react-router-dom';

const {Row, Col} = Grid;

const Toast = Feedback.toast;

@withRouter
export default class TagMessageList extends Component {
  static displayName = 'TagMessageList';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      tabName: '',
    };
  }

  componentDidMount() {
    const {typeId} = this.props.match.params;
    if (typeId && /^[\d]+$/.test(typeId)) {
      const item = MarketData[parseInt(typeId)];
      if (!item) return;
      NebUtils.userCallAxios(
        "queryCatVoucher",
        `["${typeId}"]`,
        resp => {
          this.setState({
            tabName: `大家对 ${item.title} 的点评`,
            dataSource: resp.reverse(),
          })
        },
      );
    }
    else {
      if (!NebUtils.checkInstalledPlugin()) {
        Toast.error('还未安装Chrome扩展，无法查询您的点评信息，请点击页面上方的下载按钮！');
      }
      NebUtils.getPluginUserAddress(addr => {
        NebUtils.userCallAxios(
          "queryUserVoucher",
          `["${addr}"]`,
          resp => {
            this.setState({
              tabName: `我发表的星云点评`,
              dataSource: resp.reverse(),
            });
          },
        );
      })
    }
  }

  renderItem = (item, idx) => {
    const dpItem = MarketData[parseInt(item.dpType)];
    if (!dpItem) return '';

    return (
      <div style={styles.item} key={idx}>
        <ul>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>评价类型：</div>
            <div style={styles.detailBody}>{dpItem.title}</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>评价商品名称：</div>
            <div style={styles.detailBody}>{Base64.decode(item.name)}</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>商品链接：</div>
            <div style={styles.detailBody}><a target="_blank" href={Base64.decode(item.link)}>{Base64.decode(item.link)}</a></div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>发表人地址：</div>
            <div style={styles.detailBody}>{item.from}</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>评价时间：</div>
            <div style={styles.detailBody}>{new Date(item.time).toLocaleString()}</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>评分：</div>
            <div style={styles.detailBody}>
              <span style={styles.statusProcessing}><Rating defaultValue={parseInt(item.score)} disabled /></span>
            </div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>评价内容：</div>
            <div style={styles.detailBody}>
              {Base64.decode(item.content)}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div className="tag-message-list">
        <IceContainer>
          <Tab size="small">
            <Tab.TabPane key={0} tab={this.state.tabName}>
              {this.state.dataSource.length === 0 ? '暂无数据' :
                this.state.dataSource.map((item, idx) => {
                  return this.renderItem(item, idx)
                })}
            </Tab.TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  allMessage: {
    marginTop: '20px',
    textAlign: 'center',
  },
  item: {
    borderBottom: '3px solid #E5E5E5',
    padding: '15px 0',
  },
  detailItem: {
    padding: '8px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
};

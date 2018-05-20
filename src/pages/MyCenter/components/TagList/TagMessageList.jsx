import React, {Component} from 'react';
import {Tab, Feedback, Grid} from '@icedesign/base';
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
            dataSource: resp,
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
              dataSource: resp,
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
        <div>
          <div style={styles.title}>
            <span style={{fontWeight: 900}}>评价类型：</span>{dpItem.title}
          </div><br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>评价名称：</span>{Base64.decode(item.name)}
          </div><br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>商品链接：</span>
            <a target="_blank" href={Base64.decode(item.link)}>{Base64.decode(item.link)}</a>
          </div><br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>发表地址：</span>{item.from}
          </div><br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>评价时间：</span>{new Date(item.time).toLocaleString()}
          </div><br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>评价内容：</span>{Base64.decode(item.content)}
          </div><br/>
        </div>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  title: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '14px',
  },
  date: {
    fontSize: '12px',
    color: '#666',
  },
  desc: {
    lineHeight: '14px',
    fontSize: '14px',
    color: '#999',
  },
  articleItem: {
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #f5f5f5',
  },
};

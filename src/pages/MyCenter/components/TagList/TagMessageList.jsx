import React, {Component} from 'react';
import {Tab, Feedback, Grid} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './TagMessageList.scss';
import {Base64} from 'js-base64';
import NebUtils from "../../../../util/NebUtils";

const {Row, Col} = Grid;

const Toast = Feedback.toast;

export default class TagMessageList extends Component {
  static displayName = 'TagMessageList';

  constructor(props) {
    super(props);
    this.state = {
      dataSourceSend: [],
      dataSourceRecv: []
    };
  }

  checkInstalledPlugin = () => {
    return typeof(webExtensionWallet) !== 'undefined';
  };

  componentDidMount() {
    if (!NebUtils.checkInstalledPlugin()) {
      Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
    }
    const contract = {
      function: 'query',
      args: `[]`,
    };
    NebUtils.pluginSimCall(
      contract.function,
      contract.args,
      (err) => {
        Toast.error("获取数据失败: " + err);
      },
      (item) => {
        console.log(item);
        this.setState({
          dataSourceSend: item.send.arr,
          dataSourceRecv: item.recv.arr,
        });
        Toast.success("获取您的兑现券数据成功");
      }
    );
  }

  renderItem = (item, idx) => {
    return (
      <div style={styles.item} key={idx}>

        <div>
          <div style={styles.title}>
            <span style={{fontWeight: 900}}>兑现券名：</span>{item.title}
          </div>
          <br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>发送者：</span>{item.from}
          </div>
          <br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>接收者：</span>{item.to}
          </div>
          <br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>内容：</span>{item.content}
          </div>
          <br/>

          <div style={styles.title}>
            <span style={{fontWeight: 900}}>备注：</span>{Base64.decode(item.remark)}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="tag-message-list">
        <IceContainer>
          <Tab size="small">
            <Tab.TabPane key={0} tab={`我发送的兑现券（${this.state.dataSourceSend.length}）`}>
              {this.state.dataSourceSend.length === 0 ? '暂无数据' :
                this.state.dataSourceSend.map((item, idx) => {
                  return this.renderItem(item, idx, 0)
                })}
            </Tab.TabPane>
            <Tab.TabPane key={1} tab={`我收到的兑现券（${this.state.dataSourceRecv.length}）`}>
              {this.state.dataSourceRecv.length === 0 ? '暂无数据' :
                this.state.dataSourceRecv.map((item, idx) => {
                  return this.renderItem(item, idx, 1)
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

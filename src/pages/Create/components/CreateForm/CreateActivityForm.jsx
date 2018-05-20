import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {withRouter} from "react-router-dom";
import { Base64 } from 'js-base64';
import {MarketData} from '../../../../data/MarketContent.js'
import NebUtils from '../../../../util/NebUtils.js'
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Feedback
} from '@icedesign/base';

const Toast = Feedback.toast;
const {Row, Col} = Grid;

@withRouter
export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        dpType: '',
        link: '',
        name: '',
        score: '',
        content: '',
      },
    };
  }

  componentDidMount() {
    const {typeId} = this.props.match.params;
    if (typeId && /^[\d]+$/.test(typeId)) {
      const item = MarketData[parseInt(typeId)];
      if (item) {
        this.setState({
          value: {
            dpType: item.title,
            link: '',
            name: '',
            score: '',
            content: '',
          },
        })
      }
    }
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        dpType: '',
        link: '',
        name: '',
        score: '',
        content: '',
      },
    });
  };


  submit = () => {
    this.formRef.validateAll((errors, values) => {
      console.log('error', errors, 'value', values);
      if (errors) {
        return;
      }
      let dpType = MarketData.filter(it => {
        return it.title === values.dpType
      })[0];
      if (!dpType) {
        Toast.error("点评类型填写不正确，请在“市场”中选择点评类型！");
        return;
      }
      if (!NebUtils.checkInstalledPlugin()) {
        Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
      }
      const contract = {
        function: 'createDianPing',
        args: `["${dpType.id}", "${Base64.encode(values.link)}", "${Base64.encode(values.name)}",
              "${values.score}", "${Base64.encode(values.content)}"]`,
      };
      NebUtils.pluginCall(contract.function, contract.args, (txHash) => {
        Toast.success("已提交交易，交易成功即点评成功！")
      });
    });
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="写星云点评" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  点评类型：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="dpType"
                    required
                    message="请填写点评类型"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="dpType"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  点评名称：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="name"
                    required
                    message="请填写点评商品名称"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="name"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  点评链接：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="link"
                    required
                    type="url"
                    message="请填写点评链接URL"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="link"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  评分：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="score"
                    required
                    pattern={/^[12345]$/}
                    message="请填写1-5分整数评分"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="score"/>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  内容：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="contnet">
                    <Input multiple
                           rows={8}
                           style={{width: '100%'}}
                           required
                           message="请填写点评内容"/>
                  </IceFormBinder>
                  <IceFormError name="contnet"/>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    确认制作并发送
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
    fontWeight: 900
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};

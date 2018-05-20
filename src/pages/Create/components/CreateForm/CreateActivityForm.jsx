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
        toAddr: '',
        title: '',
        contnet: '',
        remark: ''
      },
    };
  }

  componentDidMount() {
    const {typeId} = this.props.match.params;
    if (typeId && /^[\d]+$/.test(typeId)) {
      const item = MarketData[parseInt(typeId)];
      console.log(item);
      if (item) {
        this.setState({
          value: {
            toAddr: '',
            title: item.title,
            contnet: item.desc,
            remark: '本兑换券最终解释权归xxx所有，兑换券有效期至xxxx年xx月xx日...'
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
        toAddr: '',
        title: '',
        contnet: '',
        remark: ''
      },
    });
  };


  submit = () => {
    this.formRef.validateAll((errors, values) => {
      console.log('error', errors, 'value', values);
      if (errors) {
        return;
      }
      if (!NebUtils.checkInstalledPlugin()) {
        Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
      }
      const contract = {
        function: 'create',
        args: `["${values.toAddr}", "${values.title}", "${values.contnet}", "${Base64.encode(values.remark)}"]`,
      };
      NebUtils.pluginCall(contract.function, contract.args, (txHash) => {
        Toast.success("已提交交易，交易成功即制作&发送兑换券成功！")
      });
    });
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="制作兑现券" style={styles.container}>
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
                  券名：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="title"
                    required
                    message="请填写兑现券券名"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="title"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  内容：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="contnet"
                    required
                    message="请填写兑现券内容"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="contnet"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  接收地址：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder
                    name="toAddr"
                    required
                    message="请填写兑现券接收方NAS钱包地址"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="toAddr"/>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  备注：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="remark">
                    <Input multiple
                           rows={8}
                           style={{width: '100%'}}
                           required
                           message="请填写备注"/>
                  </IceFormBinder>
                  <IceFormError name="remark"/>
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

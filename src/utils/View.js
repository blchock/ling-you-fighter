import React from 'react';
import { Modal, Input, Select, Row, Col, Radio, message } from 'antd';
const { Option } = Select;

let scene;
class View extends React.Component {
  constructor(props) {
    super(props);
    scene = props.sc;
    this.state = {
      regDlg: false,
      inpDlg: false,
      inpTitle: '请输入',
      inpName: '输入内容：',
      inpHint: '',
    }
    // 初始化变量
    scene.set('rgd-name', '');
    scene.set('rgd-class', 'swordsman');
    scene.set('rgd-icon', '');
    scene.set('rgd-sex', '');
    scene.set('inpd-value', '');
    // 定义触发器
    scene.call.showRegDlg = (func) => {
      if(func) scene.set('reg-func',func)
      this.setState({
        regDlg: true
      })
    }
    scene.call.inputDlg = (title, name, hint, func) => {
      if(func) scene.set('inp-func',func)
      this.setState({
        inpDlg: true,
        inpTitle: title,
        inpName: name,
        inpHint: hint
      })
    }
  }

  REGDLG_Ok = e => {
    if (scene.get('rgd-name').length < 1 || scene.get('rgd-id').length < 1 || scene.get('rgd-class').length < 1 || scene.get('rgd-icon').length < 1 || scene.get('rgd-sex').length < 1) {
      message.warn('请输入完整信息！');
      return
    }
    let account = localStorage.getItem(scene.get('rgd-id'));
    if(account && account.length > 0) {
      message.warn('该存档已存在，请换个存档名称！');
      return
    }
    this.setState({
      regDlg: false
    })
    scene.get('reg-func')(true);
  };

  REGDLG_Cl = e => {
    this.setState({
      regDlg: false
    })
    scene.get('reg-func')(false);
  };

  REGDLG_Inp1(e) {
    scene.set("rgd-name", e.target.value);
  }

  REGDLG_Inp2(value) {
    scene.set("rgd-class", value.key);
  }
  
  REGDLG_Inp3(e) {
    scene.set("rgd-icon", e.target.value);
  }

  REGDLG_Inp4(e) {
    scene.set("rgd-sex", e.target.value);
  }

  REGDLG_Inp5(e) {
    scene.set("rgd-id", e.target.value);
  }

  INPDLG_Inp1(e) {
    scene.set("inpd-value", e.target.value);
  }

  INPDLG_Ok = e => {
    if (scene.get('inpd-value').length < 1) {
      message.warn('请输入内容！');
      return
    }
    this.setState({
      inpDlg: false
    })
    scene.get('inp-func')(true,scene.get('inpd-value'));
  };

  INPDLG_Cl = e => {
    this.setState({
      inpDlg: false
    })
    scene.get('inp-func')(false);
  };

  render() {
    return (
      <div>
        <Modal title={this.state.inpTitle}
          visible={this.state.inpDlg}
          onOk={this.INPDLG_Ok}
          width={330}
          onCancel={this.INPDLG_Cl}
        >
          {this.state.inpName}
          <Input onChange={this.INPDLG_Inp1} style={{ width: 210, marginLeft: 10 }} placeholder={this.state.inpHint} />
        </Modal>
        <Modal
          title="新的征程"
          visible={this.state.regDlg}
          onOk={this.REGDLG_Ok}
          width={330}
          onCancel={this.REGDLG_Cl}
        >
          <Row type="flex" justify="space-around" style={{height:270}}>
          <Col>
          存档名称
          <Input onChange={this.REGDLG_Inp5} style={{ width: 210, marginLeft: 10 }} placeholder="输入简短的英文或数字" />
          </Col>
          <Col>
          玩家姓名
          <Input onChange={this.REGDLG_Inp1} style={{ width: 210, marginLeft: 10 }} placeholder="输入你的名字" />
          </Col>
          <Col>
          玩家性别
          <Radio.Group onChange={this.REGDLG_Inp4} style={{ width: 210, marginLeft: 10 }}>
            <Radio value={0}>男</Radio>
            <Radio value={1}>女</Radio>
          </Radio.Group>
          </Col>
          <Col>
          选择职业
          <Select
              labelInValue
              defaultValue={{ key: 'swordsman' }}
              style={{ width: 210, marginLeft: 10 }}
              onChange={this.REGDLG_Inp2}
            >
              <Option value="mage">法师</Option>
              <Option value="warrior">战士</Option>
              <Option value="swordsman">剑客</Option>
              <Option value="assassin">刺客</Option>
            </Select>
          </Col>
          <Col>
            选择形象
            <Radio.Group onChange={this.REGDLG_Inp3} style={{ width: 210, marginLeft: 10 }}>
              <Radio value={'Q-1'}><img src='res/Q-1.png' width='30' height='40' /></Radio>
              <Radio value={'Q-2'}><img src='res/Q-2.png' width='30' height='40' /></Radio>
              <Radio value={'Q-3'}><img src='res/Q-3.png' width='30' height='40' /></Radio>
              <Radio value={'Q-4'}><img src='res/Q-4.png' width='30' height='40' /></Radio>
              <Radio value={'Q-5'}><img src='res/Q-5.png' width='30' height='40' /></Radio>
              <Radio value={'Q-6'}><img src='res/Q-6.png' width='30' height='40' /></Radio>
              <Radio value={'Q-7'}><img src='res/Q-7.png' width='30' height='40' /></Radio>
              <Radio value={'Q-8'}><img src='res/Q-8.png' width='30' height='40' /></Radio>
              <Radio value={'Q-9'}><img src='res/Q-9.png' width='30' height='40' /></Radio>
            </Radio.Group>
          </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default View;
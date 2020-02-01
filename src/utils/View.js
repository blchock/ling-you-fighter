import React from 'react';
import DB from "../utils/Database";
import { Modal, Input, Select, Row, Col, Radio, message, Button, Icon, Avatar } from 'antd';
const { Option } = Select;
const { confirm } = Modal;
const ButtonGroup = Button.Group;

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
      menuDlg: false,
      menuArea: <Row></Row>
    }
    // 初始化变量
    scene.set('rgd-name', '');
    scene.set('rgd-class', 'swordsman');
    scene.set('rgd-icon', '');
    scene.set('rgd-sex', '');
    scene.set('inpd-value', '');
    // 定义触发器
    scene.call.showRegDlg = (func) => {
      if (func) scene.set('reg-func', func)
      this.setState({
        regDlg: true
      })
    }
    scene.call.inputDlg = (title, name, hint, func) => {
      if (scene.get('pause')) return;
      scene.set('pause', true);
      if (func) scene.set('inp-func', func)
      this.setState({
        inpDlg: true,
        inpTitle: title,
        inpName: name,
        inpHint: hint
      })
    }
    scene.call.showMenu = () => {
      if (scene.get('pause')) return;
      scene.set('pause', true);
      let me = scene.get('me');
      console.log(me)
      this.setState({
        menuDlg: true,
        menuArea: <Row style={{ width: '100%',height: 160 }} type="flex" justify="space-between">
          <Col style={{width:80,textAlign: 'center',margin:'20px 20px 0 0'}}>
            <Avatar style={{ border: '1px solid #999', backgroundColor: '#fde3cf', borderRadius:12 }} size={80} shape="square" src={`res/${me.icon}.png`} />
            <span style={{fontWeight:'bold'}}>{me.name}</span>
          </Col>
          <Col>
            <Row style={{width:225,height:15,marginLeft:5}} type="flex" justify="start">
                <span style={{fontSize:'13px',color:'#FF0000',lineHeight:'15px',marginRight:5}}>HP</span>
                <div style={{width:140,height:15,border:'1px solid #FF6A6A',borderRadius:5}} title={`${me.hp} / ${me.getMaxHp()}`}>
                  <div style={{marginLeft:-1,width:me.getHpValue(140),height:13,borderRadius:5,backgroundColor:'#F00'}}></div>
                </div>
                <span style={{fontSize:5,color:'#FF0000',lineHeight:'15px',marginLeft:5}}>{me.hp}</span>
            </Row>
            <Row style={{width:225,height:15,marginLeft:5,marginTop:10}} type="flex" justify="start">
                <span style={{fontSize:'13px',color:'#1874CD',lineHeight:'15px',marginRight:5}}>MP</span>
                <div style={{width:100,height:15,border:'1px solid #1E90FF',borderRadius:5}} title={`${me.mp} / ${me.getMaxMp()}`}>
                  <div style={{marginLeft:-1,width:me.getMpValue(100),height:13,borderRadius:5,backgroundColor:'#1874CD'}}></div>
                </div>
                <span style={{fontSize:5,color:'#1874CD',lineHeight:'15px',marginLeft:5}}>{me.mp}</span>
            </Row>
            <Row style={{width:225,height:5,marginLeft:5,marginTop:5}} type="flex" justify="start">
                <span style={{fontSize:'13px',color:'#EEEE00',lineHeight:'15px',marginRight:5}}>EXP</span>
                <div style={{width:160,height:4,marginTop:6}} title={`${me.exp} / ${me.getMaxExp()}`}>
                  <div style={{width:me.getExpValue(160),height:4,borderRadius:4,backgroundColor:'#EEEE00'}}></div>
                </div>
            </Row>
            <Col style={{width:225,height:200,marginLeft:5,marginTop:10,fontSize:14}} type="flex" justify="space-around">
              <Row type="flex" justify="space-between">
                <span style={{fontWeight:'bold'}}>等级: Lv.{me.level}</span>
                <span>职业: {me.getClassicalName()}</span>
              </Row>
              <Row type="flex" justify="space-between">
                <span>故事线: {me.chapter.file}</span>
                <span style={{color:'#EEAD0E'}}>财产: {me.gold}</span>
              </Row>
              <Row type="flex" justify="space-between">
                <span style={{color:'#00FF7F'}}>宝具: {me.weapon.name} {me.weapon.attr.star}星</span>
                <span style={{color:'#8B1C62'}}>水晶: {me.mineral} 颗</span>
              </Row>
              <Row type="flex" justify="space-between">
                <span>战力: {me.power} P</span>
                <span>坦度: {me.resist} P</span>
              </Row>
              <Row type="flex" justify="space-between">
                <span>智慧: {me.wisdom} P</span>
                <span>敏捷: {me.speed} P</span>
              </Row>
            </Col>
          </Col>
        </Row>
      })
    }
  }

  REGDLG_Ok = e => {
    if (scene.get('rgd-name').length < 1 || scene.get('rgd-id').length < 1 || scene.get('rgd-class').length < 1 || scene.get('rgd-icon').length < 1 || scene.get('rgd-sex').length < 1) {
      message.warn('请输入完整信息！');
      return
    }
    let account = DB.get(scene.get('rgd-id'), true);
    if (account) {
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
    scene.set('pause', false);
    scene.get('inp-func')(true, scene.get('inpd-value'));
  };

  INPDLG_Cl = e => {
    this.setState({
      inpDlg: false
    })
    scene.set('pause', false);
    scene.get('inp-func')(false);
  };

  MNDLG_Cl = e => {
    scene.set('pause', false);
    this.setState({
      menuDlg: false
    })
  };

  MNDLG_Shop = () => {
    
    this.MNDLG_Cl();
  }
  
  MNDLG_Weapon = () => {
    
    this.MNDLG_Cl();
  }
  
  MNDLG_PK = () => {
    
    this.MNDLG_Cl();
  }
  
  MNDLG_New = () => {
    this.MNDLG_Cl();
    scene.call.inputDlg('选择故事', '剧本名', '输入剧本文件名（scripts目录下的json文件）', (isOk, fileName) => {
      if (isOk) {
        let me = scene.get('me')
        me.chapter = {  // 剧本
            file: fileName,
            chapter: 0,
            line: 0,
            pid: 0
        }
        scene.get('reloadStory')(fileName);
      }
    })
  }
  
  MNDLG_Save = () => {
    let me = scene.get('me')
    me.save()
    message.success(`存档 [${me.id}] 成功！`);
  }

  MNDLG_Back = () => {
    let self = this
    confirm({
      content: '返回标题会丢失未保存的记录，是否继续？',
      okText: '返回标题',
      cancelText: '保存进度',
      onOk() {
        scene.get('removeStoryFunc')();
        scene.removeScene('story');
        scene.show('entry');
        self.MNDLG_Cl();
      },
      onCancel() {
        self.MNDLG_Save();
      }
    });
  }

  render() {
    return (
      <div>
        <Modal title={this.state.inpTitle}
          visible={this.state.inpDlg}
          onOk={this.INPDLG_Ok}
          width={330}
          onCancel={this.INPDLG_Cl}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          {this.state.inpName}
          <Input onChange={this.INPDLG_Inp1} style={{ width: 210, marginLeft: 10 }} placeholder={this.state.inpHint} />
        </Modal>
        <Modal title='灵佑世界'
          visible={this.state.menuDlg}
          width={378}
          onCancel={this.MNDLG_Cl}
          maskClosable={false}
          footer={null}
        >
          {this.state.menuArea}
          <Row>
            <ButtonGroup style={{marginTop: 10}}>
              <Button onClick={this.MNDLG_Shop}><Icon type="dollar" />游戏商店</Button>
              <Button onClick={this.MNDLG_Weapon}><Icon type="fire" />宝具淬炼</Button>
              <Button onClick={this.MNDLG_PK}><Icon type="crown" />排位赛PK</Button>
            </ButtonGroup>
            <ButtonGroup style={{marginTop: 10}}>
              <Button onClick={this.MNDLG_New}><Icon type="read" />新的冒险</Button>
              <Button onClick={this.MNDLG_Save}><Icon type="save" />保存进度</Button>
              <Button onClick={this.MNDLG_Back}><Icon type="rollback" />返回标题</Button>
            </ButtonGroup>
          </Row>
        </Modal>
        <Modal
          title="新建角色"
          visible={this.state.regDlg}
          onOk={this.REGDLG_Ok}
          width={330}
          onCancel={this.REGDLG_Cl}
          okText="创建"
          cancelText="返回"
        >
          <Row type="flex" justify="space-around" style={{ height: 270 }}>
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
                <Radio value={'Q-1'}><img src='res/Q-1.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-2'}><img src='res/Q-2.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-3'}><img src='res/Q-3.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-4'}><img src='res/Q-4.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-5'}><img src='res/Q-5.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-6'}><img src='res/Q-6.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-7'}><img src='res/Q-7.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-8'}><img src='res/Q-8.png' width='30' height='40' alt='' /></Radio>
                <Radio value={'Q-9'}><img src='res/Q-9.png' width='30' height='40' alt='' /></Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default View;
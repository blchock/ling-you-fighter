import React from 'react';
import { Modal, Input, Select, Row, Col } from 'antd';
const { Option } = Select;


class View extends React.Component {
  constructor(props) {
    super(props);
    this.sc = props.sc;
    this.state = {
      regDlg: false
    }
    //
    this.sc.call.showRegDlg = () => {
      this.setState({
        regDlg: true
      })
    }
  }

  REGDLG_Ok = e => {
    console.log(e);
    this.setState({
      regDlg: false
    })
  };

  REGDLG_Cl = e => {
    console.log(e);
    this.setState({
      regDlg: false
    })
  };

  REGDLG_Inp1(e) {
    console.log(e.target.value);
    
  }

  REGDLG_Inp2(value) {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  }
  

  REGDLG_Inp3(e) {
    console.log(e.target.value);
    
  }


  render() {
    return (
      <div>
        <Modal
          title="新建存档"
          visible={this.state.regDlg}
          onOk={this.REGDLG_Ok}
          width={300}
          onCancel={this.REGDLG_Cl}
        >
          <Row type="flex" justify="space-around" style={{height:140}}>
          <Col>
          玩家姓名
          <Input onChange={this.REGDLG_Inp1} style={{ width: 180, marginLeft: 10 }} placeholder="输入你的名字" />
          </Col>
          <Col>
          选择门派
          <Select
              labelInValue
              defaultValue={{ key: 'lucy' }}
              style={{ width: 180, marginLeft: 10 }}
              onChange={this.REGDLG_Inp2}
            >
              <Option value="jack">Jack (100)</Option>
              <Option value="lucy">Lucy (101)</Option>
            </Select>
          </Col>
          <Col>
            随机种子<Input onChange={this.REGDLG_Inp3} style={{ width: 180, marginLeft: 10 }} placeholder="随机生成属性" />
          </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default View;
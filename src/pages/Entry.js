import Text from '../utils/Text';
import Sprite from '../utils/Sprite';
const img = './res/Q_0002_g.png'
class Entry {
  constructor(scene) {
    this.sc = scene;
    this.name = 'entry';
    this.sc.newScene(this.name);
    this.init();
  }
  registry() {
    // import { Modal, Button } from 'antd';

    // class App extends React.Component {
    //   state = { visible: false };

    //   showModal = () => {
    //     this.setState({
    //       visible: true,
    //     });
    //   };

    //   handleOk = e => {
    //     console.log(e);
    //     this.setState({
    //       visible: false,
    //     });
    //   };

    //   handleCancel = e => {
    //     console.log(e);
    //     this.setState({
    //       visible: false,
    //     });
    //   };

    //   render() {
    //     return (
    //       <div>
    //         <Button type="primary" onClick={this.showModal}>
    //           Open Modal
    //     </Button>
    //         <Modal
    //           title="Basic Modal"
    //           visible={this.state.visible}
    //           onOk={this.handleOk}
    //           onCancel={this.handleCancel}
    //         >
    //           <p>Some contents...</p>
    //           <p>Some contents...</p>
    //           <p>Some contents...</p>
    //         </Modal>
    //       </div>
    //     );
    //   }
    // }

    // ReactDOM.render(<App />, mountNode);
  }
  init() {
    Sprite.create(this.sc, this.name, './bg/d462f7122d061de4061f351d4f0e6475.jpg', { x: 0, y: 0 })
    Text.create(this.sc, this.name, '灵佑大陆', { x: 30, y: 30 }, true);
    Text.create(this.sc, this.name, '进入大陆', { x: 50, y: 120 }, { fill: "#ffffff" }, () => {
      console.log("enter")
      this.sc.hide(this.name);
    });
    Text.create(this.sc, this.name, '新的征程', { x: 50, y: 180 }, { fill: "#ffffff" }, () => {
      console.log("new")
      this.registry();
    });

  }
}

export default Entry;
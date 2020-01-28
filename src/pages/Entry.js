import Text from '../utils/Text';
import Sprite from '../utils/Sprite';
import { Modal } from 'antd';
const img = './res/Q_0002_g.png'
class Entry {
  constructor(scene) {
    this.sc = scene;
    this.name = 'entry';
    this.sc.newScene(this.name);
    this.init();
  }
  registry() {
    this.sc.call.showRegDlg();
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
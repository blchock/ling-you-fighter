import Text from '../utils/Text';
import Sprite from '../utils/Sprite';
import { message } from 'antd';
const img = './res/Q_0002_g.png'
let scene;
class Entry {
  constructor(sc) {
    scene = sc;
    this.name = 'entry';
    scene.newScene(this.name);
    this.init();
  }
  begin(saveID) {
    let dt = localStorage.getItem(saveID);
    if (dt && dt.length > 0) {
      let data = JSON.parse(dt)
      console.log("enter", data);
      scene.hide(this.name);
    } else {
      message.warn('没有找到存档！');
    }
  }
  registry() {
    let data = {
      id: scene.get('rgd-id'),
      name: scene.get('rgd-name'),
      sex: scene.get('rgd-sex'),
      classical: scene.get('rgd-class'),
      icon: `res/${scene.get('rgd-icon')}.png`,
      level: 1,   // 等级
      exp: 0,     // 经验
      hp: 100,    // 血量
      mp: 0       // 法力
    }
    let weapon = {}
    switch (data.classical) {
      case 'mage': {
        weapon.name = '水晶魔法杖';
        weapon.attr = { // 武器能力
          star: 1,
          atk: Math.floor(Math.random() * 20) + 20,
          def: 0
        }
        data.wisdom = Math.floor(Math.random() * 60) + 60; // 智慧
        data.power = Math.floor(Math.random() * 30) + 0;   // 力量
        data.speed = Math.floor(Math.random() * 50) + 30;  // 速度
        data.resist = Math.floor(Math.random() * 30) + 0;  // 抵抗（防御）
        data.mp = Math.floor(Math.random() * data.wisdom / 2) + data.wisdom // 法力
        break
      }
      case 'warrior': {
        weapon.name = '烈焰拳套';
        weapon.attr = { // 武器能力
          star: 1,
          atk: Math.floor(Math.random() * 5) + 5,
          def: Math.floor(Math.random() * 10) + 10,
        }
        data.wisdom = Math.floor(Math.random() * 30) + 0;
        data.power = Math.floor(Math.random() * 60) + 60;
        data.speed = Math.floor(Math.random() * 50) + 30;
        data.resist = Math.floor(Math.random() * 80) + 30;
        break
      }
      case 'swordsman': {
        weapon.name = '青水流光剑';
        weapon.attr = { // 武器能力
          star: 1,
          atk: Math.floor(Math.random() * 15) + 15,
          def: Math.floor(Math.random() * 5) + 5
        }
        data.wisdom = Math.floor(Math.random() * 50) + 50;
        data.power = Math.floor(Math.random() * 50) + 60;
        data.speed = Math.floor(Math.random() * 50) + 50;
        data.resist = Math.floor(Math.random() * 50) + 20;
        data.mp = 60 // 法力
        break
      }
      case 'assassin': {
        weapon.name = '鱼肠';
        weapon.attr = { // 武器能力
          star: 1,
          atk: Math.floor(Math.random() * 30) + 10,
          def: 0
        }
        data.wisdom = Math.floor(Math.random() * 40) + 0;
        data.power = Math.floor(Math.random() * 80) + 40;
        data.speed = Math.floor(Math.random() * 60) + 60;
        data.resist = Math.floor(Math.random() * 30) + 10;
        break
      }
    }
    localStorage.setItem(data.id, JSON.stringify(data));
    return data.id
  }

  init() {
    let self = this;
    Sprite.create(scene, this.name, './bg/d462f7122d061de4061f351d4f0e6475.jpg', { x: 0, y: 0 })
    Text.create(scene, this.name, '灵佑大陆', { x: 30, y: 30 }, true);
    Text.create(scene, this.name, '进入大陆', { x: 50, y: 120 }, { fill: "#ffffff" }, () => {
      scene.call.inputDlg('选择存档', '存档名称', '输入简短的英文或数字', (isOk, value) => {
        if (isOk) {
          self.begin(value);
        }
      });
    });
    Text.create(scene, this.name, '新的征程', { x: 50, y: 180 }, { fill: "#ffffff" }, () => {
      scene.call.showRegDlg((isOk) => {
        if (isOk) {
          let id = self.registry();
          self.begin(id);
        }
      });
  });

}
}

export default Entry;
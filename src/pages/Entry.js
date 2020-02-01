import Text from '../utils/Text';
import Sprite from '../utils/Sprite';
import Role from '../utils/Role';
import Story from '../utils/Story';
import { message, notification } from 'antd';
let scene;
class Entry {
  constructor(sc) {
    scene = sc;
    this.name = 'entry';
    scene.newScene(this.name);
    this.init();
  }
  begin(saveID) {
    let role = new Role(saveID);
    if (role.id) {
      scene.set('me', role);
      notification.open({message: '温馨提示',description: '在游戏中按[~]键可以打开游戏菜单；按[P]键可以显示隐藏画板',style: {width:280,marginLeft: 120}});
      scene.hide(this.name);
      new Story(scene, role.chapter.file, (story) => {
        story.start(role);
      });
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
      icon: scene.get('rgd-icon')
    }
    return Role.create(data);
  }

  init() {
    let self = this;
    Sprite.create(scene, this.name, './bg/d462f7122d061de4061f351d4f0e6475.jpg', { x: 400, y: 300 })
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
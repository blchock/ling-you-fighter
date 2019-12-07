import Text from '../utils/Text';
const img = './res/Q_0002_g.png'
class Entry {
  constructor(scene) {
    this.sc = scene;
    this.name = 'entry';
    this.sc.newScene(this.name);
    this.init();
  }
  init() {
    Text.create(this.sc, this.name, '灵佑大陆', { x: 30, y: 30 }, true);
    Text.create(this.sc, this.name, '进入大陆', {x: 50, y: 100}, undefined, () => {
      console.log("enter")
      this.sc.hide(this.name);
    });
    Text.create(this.sc, this.name, '新的征程', {x: 50, y: 140}, undefined, () => {
      console.log("new")
    });
    // Sprite.create(sc, this.name, img, {x:200,y:300}, 0.5, () => {
    //   // sc.removeScene(this.name);
    // })

  }
}

export default Entry;
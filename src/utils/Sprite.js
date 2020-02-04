import * as PIXI from 'pixi.js';
const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
let icons;
class Sprite {
  static loadingPack() {
    loader
      .add('bg/fight_bg.jpg')
      .add('bg/home_bg.jpg')
      .add('res/txt.jpg')
      .add('res/fight.jpg')
      .add("res/lyicon.json")
      .load(() => {
        console.log("lyicon loaded!")
        icons = loader.resources["res/lyicon.json"].textures;
      });
  }
  static createIcon(SM, sceneName, name, po, size, anc, onClick) {
    if (icons) {
      return this.create(SM, sceneName, icons[name + '.png'], po, size, anc, onClick, true);
    }
  }
  /**
   * 创建精灵
   * @SM 场景管理器
   * @sceneName 场景名
   * @path 图片路径
   * @po 精灵位置(x,y)
   * @anc 精灵锚点(x,y)
   * @onClick 精灵点击事件
   */
  static create(SM, sceneName, path, po, size, anc, onClick, fromCache) {
    let scene = SM.getScene(sceneName);
    let sp;
    if (fromCache) {
      sp = new PIXI.Sprite(path);
    } else {
      sp = PIXI.Sprite.from(path);
    }
    anc = anc || 0.5
    if (typeof (anc) === "number") {
      sp.anchor.set(anc);
    } else {
      sp.anchor.set(anc.x, anc.y);
    }
    if (typeof (size) === "number") {
      size = { w: size, h: size }
    }
    sp.x = po.x;
    sp.y = po.y;
    if (size) { // 可以只指定一边的宽度 另一边自适应
      if (size.h === undefined) {
        sp.height = size.w / sp.width * sp.height;
        sp.width = size.w;
      } else if (size.w === undefined) {
        sp.width = size.h / sp.height * sp.width;
        sp.height = size.h;
      } else {
        sp.width = size.w;
        sp.height = size.h;
      }
    }
    scene.addChild(sp);
    if (onClick) {
      sp.interactive = true;
      sp.buttonMode = true;
      sp.on('pointertap', onClick);
    }
    return sp;
  }
  static change(sp, url) {
    sp.texture = PIXI.Texture.from(url);
  }
  // 创建圆形 color：0x333333
  static circle(SM, sceneName, color, po, r, linecolor, linew, lineAlpha) {
    let scene = SM.getScene(sceneName);
    var g = new PIXI.Graphics();
    if (linecolor) {
      r.lineStyle(linew || 1, linecolor, lineAlpha || 1);
    }
    if (color) g.beginFill(color);
    g.drawCircle(0, 0, r); //x,y,r
    g.endFill();
    g.x = po.x;
    g.y = po.y;
    scene.addChild(g);
    return g;
  }
  // 创建矩形
  static react(SM, sceneName, color, po, size, linecolor, linew, lineAlpha) {
    let scene = SM.getScene(sceneName);
    let r = new PIXI.Graphics();
    if (linecolor) {
      r.lineStyle(linew || 1, linecolor, lineAlpha || 1);
    }
    if (color) r.beginFill(color);
    r.drawRect(0, 0, size.w, size.h);
    r.endFill();
    r.x = po.x;
    r.y = po.y;
    scene.addChild(r);
    return r;
  }
}

export default Sprite;
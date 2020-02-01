import * as PIXI from 'pixi.js';
class Sprite {
  /**
   * 创建精灵
   * @SM 场景管理器
   * @sceneName 场景名
   * @path 图片路径
   * @po 精灵位置(x,y)
   * @anc 精灵锚点(x,y)
   * @onClick 精灵点击事件
   */
  static create(SM, sceneName, path, po, anc, onClick) {
    let scene = SM.getScene(sceneName);
    const sp = PIXI.Sprite.from(path);
    anc = anc || 0.5
    if (typeof(anc) === "number") {
      sp.anchor.set(anc);
    } else {
      sp.anchor.set(anc.x, anc.y);
    }
    sp.x = po.x;
    sp.y = po.y;
    scene.addChild(sp);
    if (onClick)
    {
      sp.interactive = true;
      sp.buttonMode = true;
      sp.on('pointertap', onClick);
    }
    return sp;
  }
}

export default Sprite;
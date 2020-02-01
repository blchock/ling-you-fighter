import * as PIXI from 'pixi.js';
class Text { //  extends React.Component
  // fontSize, fontWeight, fontStyle, fontFamily
  /**
   * 创建文本
   * @SM 场景管理器
   * @sceneName 场景名
   * @str 文本内容
   * @po 文本位置(x,y)
   * @param 字体参数（true代表艺术字体）
   */
  static create(SM, sceneName, str, po, param, onClick) {
    let scene = SM.getScene(sceneName);
    if(param === true) {
        param = {
          fontFamily: 'Arial',
          fontSize: 36,
          fontStyle: 'normal',//'italic',
          fontWeight: 'bold',
          fill: ['#ffffff', '#00ff99'], // gradient
          stroke: '#4a1850',
          strokeThickness: 5,
          dropShadow: true,
          dropShadowColor: '#000000',
          dropShadowBlur: 4,
          dropShadowAngle: Math.PI / 6,
          dropShadowDistance: 6,
          wordWrap: true,
          wordWrapWidth: 440,
      }
    } else if (param === undefined) {
      param = {
        fontFamily: '微软雅黑',
        fontSize: 22
      }
    }
    // console.log(param)
    const style = new PIXI.TextStyle(param);
    const richText = new PIXI.Text(str, style);
    richText.x = po.x;
    richText.y = po.y;
    scene.addChild(richText);
    if (onClick)
    {
      richText.interactive = true;
      richText.buttonMode = true;
      richText.on('pointertap', onClick);
    }
    return richText;
  }
}

export default Text;
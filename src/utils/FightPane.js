import * as PIXI from 'pixi.js';
import Sprite from '../utils/Sprite';
import Text from '../utils/Text';
let scene;
class FightPane {
    constructor(sc) {
        scene = sc;
        this.name = 'fightpane';
        scene.newScene(this.name);
        this.imgs = {}
    }
    hide() {
        scene.hide(this.name);
    }
    show() {
        scene.show(this.name);
    }
    remove() {
        scene.removeScene(this.name);
    }
    initView(fightBg, roleMe) { // 初始化界面
        let ss = scene.size()
        // set bg
        let url = ''
        if(fightBg && fightBg !== null) {
            url = `./res/${fightBg}`
        } else url = './bg/fight_bg.jpg'
        this.add('bgSp', url, { x: ss.w / 2, y: ss.h / 2 }, 0.5, 'rootpath');
        // set menu
        let po = {x: ss.w / 2, y: ss.h - 100}
        var headWidth = 80// proportion是百分比，170是设计图宽高
        let sc = scene.getScene(this.name);
        // bar
        var bar = new PIXI.Graphics();
        // bar.lineStyle(0);
        bar.beginFill(0xF08080);
        bar.drawRoundedRect(headWidth/2 - 5, -35, 200, 15, 7);
        bar.beginFill(0x48D1CC);
        bar.drawRoundedRect(headWidth/2 + 1, -15, 160, 13, 6);
        bar.endFill();
        bar.x = po.x;
        bar.y = po.y;
        sc.addChild(bar);
        // hp
        var hp = new PIXI.Graphics();
        hp.beginFill(0xEE0000);
        hp.drawRoundedRect(headWidth/2 - 3, -33, 196, 11, 5);
        hp.endFill();
        hp.x = po.x;
        hp.y = po.y;
        sc.addChild(hp);
        // mp
        var mp = new PIXI.Graphics();
        mp.beginFill(0x1874CD);
        mp.drawRoundedRect(headWidth/2 + 2, -13, 156, 9, 4);
        mp.endFill();
        mp.x = po.x;
        mp.y = po.y;
        sc.addChild(mp);
        // btn
        var btn0 = new PIXI.Graphics();
        btn0.beginFill(0xffff33);
        btn0.drawCircle(0, 0, 15);
        btn0.endFill();
        btn0.x = po.x - 70;
        btn0.y = po.y - 35;
        sc.addChild(btn0);
        var btn1 = new PIXI.Graphics();
        btn1.beginFill(0xffff66);
        btn1.drawCircle(0, 0, 15);
        btn1.endFill();
        btn1.x = po.x - 105;
        btn1.y = po.y - 45;
        sc.addChild(btn1);
        var btn2 = new PIXI.Graphics();
        btn2.beginFill(0xffff99);
        btn2.drawCircle(0, 0, 15);
        btn2.endFill();
        btn2.x = po.x - 140;
        btn2.y = po.y - 55;
        sc.addChild(btn2);
        var btn3 = new PIXI.Graphics();
        btn3.beginFill(0xffff33);
        btn3.drawCircle(0, 0, 15);
        btn3.endFill();
        btn3.x = po.x - 78;
        btn3.y = po.y;
        sc.addChild(btn3);
        var btn4 = new PIXI.Graphics();
        btn4.beginFill(0xffff66);
        btn4.drawCircle(0, 0, 15);
        btn4.endFill();
        btn4.x = po.x - 112;
        btn4.y = po.y - 7;
        sc.addChild(btn4);
        var btn5 = new PIXI.Graphics();
        btn5.beginFill(0xffff33);
        btn5.drawCircle(0, 0, 15);
        btn5.endFill();
        btn5.x = po.x - 70;
        btn5.y = po.y + 35;
        sc.addChild(btn5);
        // headborder
        var menu = new PIXI.Graphics();
        menu.lineStyle(10, 0x36648B, 1);
        menu.beginFill(0xffffff);
        menu.drawCircle(0, 0, headWidth/2 + 5); //x,y,r
        menu.lineStyle(0);
        menu.endFill();
        menu.x = po.x;
        menu.y = po.y;
        sc.addChild(menu);
        // head
        var headmask = new PIXI.Graphics();
        headmask.beginFill(0x333333);
        headmask.drawCircle(ss.w/2, ss.h-100, headWidth/2); //x,y,r
        headmask.endFill();
        let head = this.add('fm_icon', roleMe.icon, po, {w:headWidth,h:headWidth})
        head.mask = headmask;
        // 
        // Text
    }
    fighting(fightBg, roleMe, roleR, func) {
        this.initView(fightBg, roleMe);

    }
    fightingTimes(fightBg, roleMe, roles, times, func) {
        let self = this
        if (times > 1) {
            let len = roles.length;
            let curFighter = Math.floor(Math.random() * len)
            self.fighting(fightBg, roleMe, roles[curFighter], () => {
                self.fightingTimes(fightBg, roleMe, roles, times - 1, func)
            })
        } else {
            if (func) func();
        }
    }
    add(name, img, po, size, anc, ext) { // po:{ x: 0, y: 0 }
        if (this.imgs[name]) this.del(name);
        let url = `./res/${img}.png`
        if (ext) {
            if (ext === 'rootpath') url = img;
            else url = `./res/${img}.${ext}`
        }
        // console.log(name, url);
        // console.log(po);
        let sp = Sprite.create(scene, this.name, url, po, size, anc);
        this.imgs[name] = sp;
        return sp;
    }
    del(name) {
        if (this.imgs[name]) {
            scene.remove(this.imgs[name], this.name);
            this.imgs[name] = undefined;
        }
    }
    clear() {
        for (const name in this.imgs) {
            scene.remove(this.imgs[name], this.name);
        }
        this.imgs = {}
    }
}

export default FightPane;
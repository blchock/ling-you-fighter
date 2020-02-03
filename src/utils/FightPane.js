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
    onMage0Btn() {
        console.log("onMage0Btn");
    }
    onMage1Btn() {
        console.log("onMage1Btn");
    }
    onMage2Btn() {
        console.log("onMage2Btn");
    }
    onAtkBtn() {
        console.log("onAtkBtn");
    }
    onUseBtn() {
        console.log("onUseBtn");
    }
    onSetBtn() {
        console.log("onSetBtn");
    }
    initView(fightBg, roleMe) { // 初始化界面
        let ss = scene.size()
        // set bg
        let url = ''
        if(fightBg && fightBg !== null) {
            url = `./res/${fightBg}`
        } else url = './bg/fight_bg.jpg'
        this.add('bgSp', url, { x: ss.w / 2, y: ss.h / 2 }, undefined, 0.5, 'rootpath');
        // set menu
        let po = {x: ss.w / 2 - 30, y: ss.h - 100}
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
        this.insert('bar', bar);
        // hp
        var hp = new PIXI.Graphics();
        hp.beginFill(0xEE0000);
        hp.drawRoundedRect(headWidth/2 - 3, -33, 196, 11, 5);
        hp.endFill();
        hp.x = po.x;
        hp.y = po.y;
        sc.addChild(hp);
        this.insert('hp', hp);
        // mp
        var mp = new PIXI.Graphics();
        mp.beginFill(0x1874CD);
        mp.drawRoundedRect(headWidth/2 + 2, -13, 156, 9, 4);
        mp.endFill();
        mp.x = po.x;
        mp.y = po.y;
        sc.addChild(mp);
        this.insert('mp', mp);
        // btn
        let r = 15; // 按钮半径
        var btn0 = new PIXI.Graphics();
        btn0.lineStyle(1, 0xC1CDCD, 1);
        btn0.beginFill(0xF0FFF0);
        btn0.drawCircle(0, 0, r);
        btn0.endFill();
        btn0.x = po.x - 70;
        btn0.y = po.y - 45;
        sc.addChild(btn0);
        this.insert('btn0', btn0);
        var btn1 = new PIXI.Graphics();
        btn1.lineStyle(1, 0xC1CDCD, 1);
        btn1.beginFill(0xF0FFF0);
        btn1.drawCircle(0, 0, r);
        btn1.endFill();
        btn1.x = po.x - 105;
        btn1.y = po.y - 55;
        sc.addChild(btn1);
        this.insert('btn1', btn1);
        var btn2 = new PIXI.Graphics();
        btn2.lineStyle(1, 0xC1CDCD, 1);
        btn2.beginFill(0xF0FFF0);
        btn2.drawCircle(0, 0, r);
        btn2.endFill();
        btn2.x = po.x - 140;
        btn2.y = po.y - 65;
        sc.addChild(btn2);
        this.insert('btn2', btn2);
        var btn3 = new PIXI.Graphics();
        btn3.lineStyle(1, 0xC1CDCD, 1);
        btn3.beginFill(0xF0FFF0);
        btn3.drawCircle(0, 0, r);
        btn3.endFill();
        btn3.x = po.x - 78;
        btn3.y = po.y;
        sc.addChild(btn3);
        this.insert('btn3', btn3);
        var btn4 = new PIXI.Graphics();
        btn4.lineStyle(1, 0xC1CDCD, 1);
        btn4.beginFill(0xF0FFF0);
        btn4.drawCircle(0, 0, r);
        btn4.endFill();
        btn4.x = po.x - 112;
        btn4.y = po.y - 7;
        sc.addChild(btn4);
        this.insert('btn4', btn4);
        var btn5 = new PIXI.Graphics();
        btn5.lineStyle(1, 0xC1CDCD, 1);
        btn5.beginFill(0xF0FFF0);
        btn5.drawCircle(0, 0, r);
        btn5.endFill();
        btn5.x = po.x - 70;
        btn5.y = po.y + 45;
        sc.addChild(btn5);
        this.insert('btn5', btn5);
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
        this.insert('menu', menu);
        // head
        var headmask = new PIXI.Graphics();
        headmask.beginFill(0x333333);
        headmask.drawCircle(po.x, po.y, headWidth/2); //x,y,r
        headmask.endFill();
        let head = this.add('fm_icon', roleMe.icon, po, {w:headWidth,h:headWidth})
        head.mask = headmask;
        // 
        let b0 = Sprite.createIcon(scene,this.name,'i_water',{x:btn0.x,y:btn0.y},r*2-8,0,this.onMage0Btn);
        let t0 = Text.createSpTxt(scene,this.name, b0,'技能1','down',5,{fill:'#36648B',fontSize:10,stroke: '#fff',strokeThickness: 1});
        this.insert('b0', b0); this.insert('t0', t0);
        let b1 = Sprite.createIcon(scene,this.name,'i_star',{x:btn1.x,y:btn1.y+1},r*2-8,0,this.onMage1Btn);
        let t1 = Text.createSpTxt(scene,this.name, b1,'技能2','down',5,{fill:'#36648B',fontSize:10,stroke: '#fff',strokeThickness: 1});
        this.insert('b1', b1); this.insert('t1', t1);
        let b2 = Sprite.createIcon(scene,this.name,'i_l2',{x:btn2.x+1,y:btn2.y+1},r*2,0,this.onMage2Btn);
        let t2 = Text.createSpTxt(scene,this.name, b2,'技能3','down',0,{fill:'#36648B',fontSize:10,stroke: '#fff',strokeThickness: 1});
        this.insert('b2', b2); this.insert('t2', t2);
        let b3 = Sprite.createIcon(scene,this.name,'i_atk',{x:btn3.x+1,y:btn3.y+1},r*2-2,0,this.onAtkBtn);
        let t3 = Text.createSpTxt(scene,this.name, b3,'攻击','down',0,{fill:'#36648B',fontSize:10,stroke: '#fff',strokeThickness: 1});
        this.insert('b3', b3); this.insert('t3', t3);
        let b4 = Sprite.createIcon(scene,this.name,'i_med',{x:btn4.x,y:btn4.y},r*2-8,0,this.onUseBtn);
        let t4 = Text.createSpTxt(scene,this.name, b4,'物品','down',5,{fill:'#36648B',fontSize:10,stroke: '#fff',strokeThickness: 1});
        this.insert('b4', b4); this.insert('t4', t4);
        let b5 = Sprite.createIcon(scene,this.name,'i_set',{x:btn5.x,y:btn5.y},r*2-8,0,this.onSetBtn);
        let t5 = Text.createSpTxt(scene,this.name, b5,'功能','down',5,{fill:'#36648B',fontSize:10,stroke: '#fff',strokeThickness: 1});
        this.insert('b5', b5); this.insert('t5', t5);
        // Text
        let inforTxt = `Lv.${roleMe.level} ${roleMe.getClassicalName()}`;
        let menu_roleName = Text.create(scene, this.name, roleMe.name, {x: po.x + 60, y: po.y + 5}, { fill: '#000', fontSize: 24, fontWeight: 'bold', stroke: '#fff', strokeThickness: 2})
        this.insert('menu_roleName', menu_roleName);
        let menu_roleInfor = Text.create(scene, this.name, inforTxt, {x: po.x + 60, y: po.y + 34}, { fill: '#000', fontSize: 12, stroke: '#fff', strokeThickness: 1})
        this.insert('menu_roleInfor', menu_roleInfor);
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
    insert(name, obj) {
        if (this.imgs[name]) this.del(name);
        this.imgs[name] = obj;
        return obj
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
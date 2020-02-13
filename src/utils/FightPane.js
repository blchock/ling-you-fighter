import * as PIXI from 'pixi.js';
import Sprite from '../utils/Sprite';
import Text from '../utils/Text';
import Charm from '../utils/Charm';
let scene;
let Ani;
class FightPane {
    constructor(sc) {
        scene = sc;
        this.name = 'fightpane';
        scene.newScene(this.name);
        this.imgs = {}
        this.says = []
        this.sayCount = 12;
        this.sayLineHeight = 14;
        this.sayMargin = 5;
        this.statusWidth = 80;
        this.curBack = null;
        Ani = new Charm(PIXI);
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
        if(!this.canDo) return;
        // this.say("onMage0Btn");
        // this.meSp.x = this.meSp.x + 10;
        // this.roleMe.hp = this.roleMe.hp - 5;
        this.menuVisible(false)
        this.waitMe = false
    }
    onMage1Btn() {
        if(!this.canDo) return;
        this.menuVisible(false)
        this.waitMe = false
    }
    onMage2Btn() {
        if(!this.canDo) return;
        this.menuVisible(false)
        this.waitMe = false
    }
    onAtkBtn() {
        if(!this.canDo) return;
        // http://www.xampp.cc/archives/5259
        // https://github.com/kittykatattack/charm
        // 使精灵用120帧从原始位置移动到坐标为(128,128)的位置的关键代码
        let _this = this;
        _this.canDo = false;
        _this.menuVisible(false);
        Ani.sequene(this.meSp, [
            { slide: [this.meSp.x + 300, this.meSp.y, 30] },
            {
                func: () => {
                    let injured = _this.roleR.beAttacked(_this.roleMe.attack());
                    _this.say(`[${_this.roleMe.name}] 对 [${_this.roleR.name}] 造成了${injured}点伤害!`,'#0F0');
                    if (_this.roleR.injured(injured)) {
                        _this.win();
                    }
                },
                slide: [this.meSp.x, this.meSp.y, 30]
            }
        ], () => {
            _this.canDo = true;
            _this.waitMe = false
        });
    }
    win() {
        // 获胜！
        console.log('win!')
        // 显示成功界面
        this.clear();
        if (this.curBack) this.curBack();
    }
    lose() {
        // 失败。
        console.log('lose!')
        // 显示失败界面
        this.clear();
        // if (this.curBack) this.curBack();
        scene.get('removeStoryFunc')();
        scene.removeScene('story');
        scene.show('entry');
        scene.set('pause', false);
    }
    onUseBtn() {
        if(!this.canDo) return;
        // this.say("onUseBtn");
        // this.meSp.y = this.meSp.y - 10;
        // this.roleMe.mp = this.roleMe.mp - 1;
    }
    onLeaveBtn() {
        if(!this.canDo) return;
        this.clear();
        if (this.curBack) this.curBack();
    }
    initView(fightBg, roleMe) { // 初始化界面
        let self = this;
        let ss = scene.size()
        // set bg
        let url = ''
        if (fightBg && fightBg !== null) {
            url = `./res/${fightBg}`
        } else url = './bg/fight_bg.jpg'
        this.add('bgSp', url, { x: ss.w / 2, y: ss.h / 2 }, undefined, 0.5, 'rootpath');
        // set menu
        let po = { x: ss.w / 2 - 30, y: ss.h - 100 }
        var headWidth = 80// proportion是百分比，170是设计图宽高
        let sc = scene.getScene(this.name);
        // bar
        var bar = new PIXI.Graphics();
        // bar.lineStyle(0);
        bar.beginFill(0xF08080);
        bar.drawRoundedRect(headWidth / 2 - 5, -35, 200, 15, 7);
        bar.beginFill(0x48D1CC);
        bar.drawRoundedRect(headWidth / 2 + 1, -15, 160, 13, 6);
        bar.endFill();
        bar.x = po.x;
        bar.y = po.y;
        sc.addChild(bar);
        this.insert('bar', bar);
        // hp
        var hp = new PIXI.Graphics();
        hp.beginFill(0xEE0000);
        hp.drawRoundedRect(headWidth / 2 - 3, -33, 196, 11, 5);
        hp.endFill();
        hp.x = po.x;
        hp.y = po.y;
        sc.addChild(hp);
        this.hpBar = hp;
        this.insert('hp', hp);
        // mp
        var mp = new PIXI.Graphics();
        mp.beginFill(0x1874CD);
        mp.drawRoundedRect(headWidth / 2 + 2, -13, 156, 9, 4);
        mp.endFill();
        mp.x = po.x;
        mp.y = po.y;
        this.mpBar = mp;
        sc.addChild(mp);
        this.insert('mp', mp);
        // btn
        let r = 15; // 按钮半径
        var btn0 = new PIXI.Graphics();
        btn0.lineStyle(1, 0xC1CDCD, 1);
        btn0.beginFill(0xF0FFF0, 0.9);
        btn0.drawCircle(0, 0, r);
        btn0.endFill();
        btn0.x = po.x - 70;
        btn0.y = po.y - 45;
        sc.addChild(btn0);
        this.insert('btn0', btn0);
        var btn1 = new PIXI.Graphics();
        btn1.lineStyle(1, 0xC1CDCD, 1);
        btn1.beginFill(0xF0FFF0, 0.9);
        btn1.drawCircle(0, 0, r);
        btn1.endFill();
        btn1.x = po.x - 105;
        btn1.y = po.y - 55;
        sc.addChild(btn1);
        this.insert('btn1', btn1);
        var btn2 = new PIXI.Graphics();
        btn2.lineStyle(1, 0xC1CDCD, 1);
        btn2.beginFill(0xF0FFF0, 0.9);
        btn2.drawCircle(0, 0, r);
        btn2.endFill();
        btn2.x = po.x - 140;
        btn2.y = po.y - 65;
        sc.addChild(btn2);
        this.insert('btn2', btn2);
        var btn3 = new PIXI.Graphics();
        btn3.lineStyle(1, 0xC1CDCD, 1);
        btn3.beginFill(0xF0FFF0, 0.9);
        btn3.drawCircle(0, 0, r);
        btn3.endFill();
        btn3.x = po.x - 78;
        btn3.y = po.y;
        sc.addChild(btn3);
        this.insert('btn3', btn3);
        var btn4 = new PIXI.Graphics();
        btn4.lineStyle(1, 0xC1CDCD, 1);
        btn4.beginFill(0xF0FFF0, 0.9);
        btn4.drawCircle(0, 0, r);
        btn4.endFill();
        btn4.x = po.x - 112;
        btn4.y = po.y - 7;
        sc.addChild(btn4);
        this.insert('btn4', btn4);
        var btn5 = new PIXI.Graphics();
        btn5.lineStyle(1, 0xC1CDCD, 1);
        btn5.beginFill(0xF0FFF0, 0.9);
        btn5.drawCircle(0, 0, r);
        btn5.endFill();
        btn5.x = po.x - 70;
        btn5.y = po.y + 45;
        sc.addChild(btn5);
        this.insert('btn5', btn5);
        // headborder
        var menu = new PIXI.Graphics();
        menu.lineStyle(10, 0x36648B, 1);
        menu.beginFill(0xffffff, 0.9);
        menu.drawCircle(0, 0, headWidth / 2 + 5); //x,y,r
        menu.lineStyle(0);
        menu.endFill();
        menu.x = po.x;
        menu.y = po.y;
        sc.addChild(menu);
        this.insert('menu', menu);
        // head
        var headmask = new PIXI.Graphics();
        headmask.beginFill(0x333333, 0.9);
        headmask.drawCircle(po.x, po.y, headWidth / 2); //x,y,r
        headmask.endFill();
        let head = this.add('fm_icon', roleMe.icon, po, { w: headWidth, h: headWidth })
        head.mask = headmask;
        // 
        let b0 = Sprite.createIcon(scene, this.name, 'i_water', { x: btn0.x, y: btn0.y }, r * 2 - 8, 0, () => { self.onMage0Btn() });
        let t0 = Text.createSpTxt(scene, this.name, b0, '技能1', 'down', 5, { fill: '#36648B', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('b0', b0); this.insert('t0', t0);
        let b1 = Sprite.createIcon(scene, this.name, 'i_star', { x: btn1.x, y: btn1.y + 1 }, r * 2 - 8, 0, () => { self.onMage1Btn() });
        let t1 = Text.createSpTxt(scene, this.name, b1, '技能2', 'down', 5, { fill: '#36648B', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('b1', b1); this.insert('t1', t1);
        let b2 = Sprite.createIcon(scene, this.name, 'i_l2', { x: btn2.x + 1, y: btn2.y + 1 }, r * 2, 0, () => { self.onMage2Btn() });
        let t2 = Text.createSpTxt(scene, this.name, b2, '技能3', 'down', 0, { fill: '#36648B', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('b2', b2); this.insert('t2', t2);
        let b3 = Sprite.createIcon(scene, this.name, 'i_atk', { x: btn3.x + 1, y: btn3.y + 1 }, r * 2 - 2, 0, () => { self.onAtkBtn() });
        let t3 = Text.createSpTxt(scene, this.name, b3, '攻击', 'down', 0, { fill: '#36648B', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('b3', b3); this.insert('t3', t3);
        let b4 = Sprite.createIcon(scene, this.name, 'i_med', { x: btn4.x, y: btn4.y }, r * 2 - 8, 0, () => { self.onUseBtn() });
        let t4 = Text.createSpTxt(scene, this.name, b4, '物品', 'down', 5, { fill: '#36648B', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('b4', b4); this.insert('t4', t4);
        let b5 = Sprite.createIcon(scene, this.name, 'i_fly', { x: btn5.x, y: btn5.y + 1 }, r * 2, 0, () => { self.onLeaveBtn() });
        let t5 = Text.createSpTxt(scene, this.name, b5, '逃跑', 'down', 0, { fill: '#36648B', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('b5', b5); this.insert('t5', t5);
        this.menuVisible = (isShow) => {
            btn0.visible = isShow
            btn1.visible = isShow
            btn2.visible = isShow
            btn3.visible = isShow
            btn4.visible = isShow
            btn5.visible = isShow
            b0.visible = isShow
            b1.visible = isShow
            b2.visible = isShow
            b3.visible = isShow
            b4.visible = isShow
            b5.visible = isShow
            t0.visible = isShow
            t1.visible = isShow
            t2.visible = isShow
            t3.visible = isShow
            t4.visible = isShow
            t5.visible = isShow
            // if (isShow) this.say('轮到你了！');
            // else this.say(this.roleR.name + '正在思考..');
        }
        // Text
        let inforTxt = `Lv.${roleMe.level} ${roleMe.getClassicalName()}`;
        let menu_roleName = Text.create(scene, this.name, roleMe.name, { x: po.x + 60, y: po.y + 5 }, { fill: '#000', fontSize: 24, fontWeight: 'bold', stroke: '#fff', strokeThickness: 2 })
        this.insert('menu_roleName', menu_roleName);
        let menu_roleInfor = Text.create(scene, this.name, inforTxt, { x: po.x + 60, y: po.y + 34 }, { fill: '#000', fontSize: 12, stroke: '#fff', strokeThickness: 1 })
        this.insert('menu_roleInfor', menu_roleInfor);
        // inforPane
        var inforPane = new PIXI.Graphics();
        inforPane.lineStyle(2, 0x000000, 0.6);
        inforPane.beginFill(0xF0FFF0, 0.6);
        inforPane.drawRoundedRect(-250, 20, 230, this.sayMargin * 2 + this.sayCount * this.sayLineHeight, 8);
        inforPane.endFill();
        inforPane.x = ss.w;
        inforPane.y = 0;
        sc.addChild(inforPane);
        this.insert('inforPane', inforPane);
    }
    say(str, color) {
        let ss = scene.size()
        if (this.says.length === this.sayCount) {
            scene.remove(this.says[0], this.name);
            this.says.shift();
            for (const i in this.says) {
                this.says[i].y = this.says[i].y - this.sayLineHeight;
            }
        }
        let txt = Text.create(scene, this.name, str, { x: ss.w - 243, y: 25 + this.says.length * this.sayLineHeight }, { fill: color || '#000', fontSize: 10 });
        this.says.push(txt);
    }
    createRoleStatus(sp) {
        let sc = scene.getScene(this.name);
        let w = this.statusWidth
        // status
        var status = new PIXI.Graphics();
        status.beginFill(0xFFE4C4);
        status.drawRect(- w / 2 - 1, - sp.height / 2 - 15, w + 2, 10);
        status.endFill();
        status.x = sp.x;
        status.y = sp.y;
        sc.addChild(status);
        // hp
        var hp = new PIXI.Graphics();
        hp.beginFill(0xEE0000);
        hp.drawRect(0, 1 - sp.height / 2 - 15, w, 4);
        hp.endFill();
        hp.x = sp.x - w / 2;
        hp.y = sp.y;
        sc.addChild(hp);
        // mp
        var mp = new PIXI.Graphics();
        mp.beginFill(0x1874CD);
        mp.drawRect(0, 6 - sp.height / 2 - 15, w, 3);
        mp.endFill();
        mp.x = sp.x - w / 2;
        mp.y = sp.y;
        sc.addChild(mp);
        return { st: status, hp: hp, mp: mp }
    }
    initRole(roleMe, roleR) {
        let ss = scene.size()
        let pMe = { x: 200, y: ss.h / 2 }
        let pR = { x: ss.w - 200, y: ss.h / 2 }
        let roleSize = { h: 100 }
        this.meSp = this.add("f_roleMe", roleMe.icon, pMe, roleSize);
        this.meSp.scale.x = -1; // x翻转
        this.rSp = this.add("f_roleR", roleR.icon, pR, roleSize);
        let one = this.createRoleStatus(this.meSp);
        this.fMeSt = one.st; this.fMeHp = one.hp; this.fMeMp = one.mp;
        this.insert('fMeSt', this.fMeSt); this.insert('fMeHp', this.fMeHp); this.insert('fMeMp', this.fMeMp);
        let two = this.createRoleStatus(this.rSp);
        this.fRSt = two.st; this.fRHp = two.hp; this.fRMp = two.mp;
        this.insert('fRSt', this.fRSt); this.insert('fRHp', this.fRHp); this.insert('fRMp', this.fRMp);
        this.fMeName = Text.createSpTxt(scene, this.name, this.meSp, roleMe.name, 'up', 20, { fill: '#00F', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('fMeName', this.fMeName);
        this.fRName = Text.createSpTxt(scene, this.name, this.rSp, roleR.name, 'up', 20, { fill: '#F00', fontSize: 10, stroke: '#fff', strokeThickness: 1 });
        this.insert('fRName', this.fRName);
    }
    gameLoop(delta) {
        let _this = this;
        Ani.update(); // 执行补间动画
        // 同步玩家信息
        this.hpBar.width = this.roleMe.getHpValue(196);
        this.mpBar.width = this.roleMe.getMpValue(156);
        // 同步战斗血量
        this.fMeSt.x = this.meSp.x; this.fMeHp.x = this.meSp.x - this.statusWidth / 2; this.fMeMp.x = this.meSp.x - this.statusWidth / 2;
        this.fRSt.x = this.rSp.x; this.fRHp.x = this.rSp.x - this.statusWidth / 2; this.fRMp.x = this.rSp.x - this.statusWidth / 2;
        this.fMeSt.y = this.meSp.y; this.fMeHp.y = this.meSp.y; this.fMeMp.y = this.meSp.y;
        this.fRSt.y = this.rSp.y; this.fRHp.y = this.rSp.y; this.fRMp.y = this.rSp.y;
        this.fMeHp.width = this.roleMe.getHpValue(this.statusWidth);
        this.fMeMp.width = this.roleMe.getMpValue(this.statusWidth);
        this.fRHp.width = this.roleR.getHpValue(this.statusWidth);
        this.fRMp.width = this.roleR.getMpValue(this.statusWidth);
        Text.UpdateTxtPo(this.meSp, 'up', 20, { fontSize: 10 }, this.fMeName);
        Text.UpdateTxtPo(this.rSp, 'up', 20, { fontSize: 10 }, this.fRName);
        if (this.waitMe || (!this.canDo)) {
            return;
        }
        if (this.nextRole()) {
            this.waitMe = true
            _this.menuVisible(true)
        } else {
            _this.canDo = false;
            Ani.sequene(this.rSp, [
                { slide: [this.rSp.x - 300, this.rSp.y, 30] },
                {
                    func: () => {
                        let injured = _this.roleMe.beAttacked(_this.roleR.attack());
                        _this.say(`[${_this.roleR.name}] 对 [${_this.roleMe.name}] 造成了${injured}点伤害!`,'#F00');
                        if (_this.roleMe.injured(injured)) {
                            _this.lose();
                        }
                    },
                    slide: [this.rSp.x, this.rSp.y, 30]
                }
            ], () => {
                _this.canDo = true;
                _this.menuVisible(true)
            });
        }
    }
    fighting(fightBg, roleMe, roleR, func) {
        this.imgs = {}
        this.says = []
        this.canDo = true
        this.waitMe = false
        this.speedM = 0;
        this.speedR = 0;
        this.curBack = func;
        this.roleMe = roleMe
        this.roleR = roleR
        this.initView(fightBg, roleMe);
        this.menuVisible(false);
        this.initRole(roleMe, roleR);
        scene.timer(delta => this.gameLoop(delta));
    }
    nextRole() { // 获取下一个行动者（返回true代表是自己）
        if (this.speedM === this.speedR === 0) {
            this.speedM = 1 / this.roleMe.speed;
            this.speedR = 1 / this.roleR.speed;
            return this.speedM < this.speedR
        }
        let isSpeedM = this.speedM < this.speedR
        if (isSpeedM) {
            this.speedM += 1 / this.roleMe.speed;
        } else {
            this.speedR += 1 / this.roleR.speed;
        }
        return this.speedM < this.speedR;
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
        console.log(name, url);
        console.log(po);
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
        for (const i in this.says) {
            scene.remove(this.says[i], this.name);
        }
        this.says = {}
        scene.clearTimer();
    }
}

export default FightPane;
import Role from '../utils/Role';
import Com from '../utils/Com';
import Text from '../utils/Text';
import Sprite from '../utils/Sprite';
import DrawPane from '../utils/DrawPane';
import FightPane from '../utils/FightPane';
import DB from "../utils/Database";
import { Modal } from 'antd';
const { confirm } = Modal;
var scene;
var draw;
var fight;
var Me;
var storyFontSize = 22
var storyLineHeight = 30
var storyMargin = [20, 20, 20, 20]
var textLines = 18
var roleDefaultColor = "#F00"
var textColor = "#000000"
var fightBg = null
var txtBg = null
var txtSp = null
class Story {
    constructor(sc, fileName, func) {
        let self = this
        scene = sc
        self.init(fileName, func)
        scene.set('reloadStory', (file) => {
            self.clearStoryBoard();
            self.init(file, (story) => {
                story.start();
            })
        })
    }
    init(fileName, func) {
        let self = this
        this.storyName = fileName
        this.roles = {}
        this.storyBoard = [];
        var url = `scripts/${fileName}.json`/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
                var data = JSON.parse(request.responseText);
                self.data = data;
                if (data.config) {
                    if (data.config.fontSize) storyFontSize = Number(data.config.fontSize);
                    if (data.config.lineHeight) storyLineHeight = Number(data.config.lineHeight);
                    if (data.config.margin) storyMargin = data.config.margin;
                    if (data.config.roleDefaultColor) roleDefaultColor = data.config.roleDefaultColor; // 匿名角色颜色
                    if (data.config.textColor) textColor = data.config.textColor;
                    if (data.config.fightBg) fightBg = data.config.fightBg;
                    if (data.config.txtBg) txtBg = data.config.txtBg;
                } else {
                    storyFontSize = 22
                    storyLineHeight = 30
                    storyMargin = [20, 20, 20, 20]
                    roleDefaultColor = "#F00"
                    textColor = "#000000"
                }
                textLines = Math.floor((scene.size().h - storyMargin[0] - storyMargin[2]) / storyLineHeight);
                if (func) func(self);
            }
        }
    }
    start(role) {
        if (role) {
            Me = role;
            this.initFightBoard();
            this.initTitleBoard();
            this.initStroyBoard();
            this.initBackground();
        }
        this.initRoles(this.data.role);
        this.chapterNum = this.data.story.length;
        this.beginChapter();
    }
    initFightBoard() {
        fight = new FightPane(scene);
        fight.hide();
    }
    initTitleBoard() {
        scene.newScene('title');
        scene.hide('title');
    }
    initBackground() {
        scene.set('isShowDrawPane', true)
        draw = new DrawPane(scene);
    }
    switchDrawPane() {
        if (scene.get('isShowDrawPane')) {
            scene.set('isShowDrawPane', false)
            draw.hide();
        } else {
            scene.set('isShowDrawPane', true)
            draw.show();
        }
    }
    initStroyBoard() {
        let self = this
        scene.newScene('story');
        scene.hide('story');
        let keyFunc = (e) => {
            if (e.code === 'Enter' || e.code === 'Space') {
                self.next();
            } else if (e.code === 'Backquote') {
                scene.call.showMenu();
            } else if (e.code === 'KeyP') {
                self.switchDrawPane();
            } else if (e.code === 'KeyT') {
                scene.set('testmode', !scene.get('testmode'));
            }
        }
        let mouseFunc = (e) => {
            if (e.button === 0) {
                self.next();
            }
            if (scene.get('testmode')) {
                let po = { x: e.screenX, y: e.screenY }
                if (e.button === 1) { // 鼠标左键 0 中键 1 右键 2
                    scene.set('testmode_anc', po);
                    console.log('TEST set ora po:', po);
                } else if (e.button === 0) {
                    let anc = scene.get('testmode_anc') || { x: 0, y: 0 };
                    console.log('TEST the delta po:', { x: po.x - anc.x, y: po.y - anc.y })
                }
            }
        }
        window.addEventListener('keypress', keyFunc)
        window.addEventListener('mousedown', mouseFunc)
        scene.set('removeStoryFunc', () => {
            window.removeEventListener('keypress', keyFunc)
            window.removeEventListener('mousedown', mouseFunc)
            draw.clear();
            draw.remove();
            fight.remove();
        });
    }
    initRoles(array) {
        let self = this
        array.forEach(eny => {
            let roleid = Role.create(eny);
            self.roles[eny.id] = new Role(roleid);
        });
        // console.log("loaded roles!")
    }
    showBg() {
        if (txtBg && txtBg !== null) {
            txtSp = Sprite.create(scene, 'story', `./res/${txtBg}`, { x: scene.size().w / 2, y: scene.size().h / 2 });
            this.storyBoard.push(txtSp);
        }
    }
    beginChapter() {
        this.chapter = this.data.story[Me.chapter.chapter];
        this.content = this.chapter.chapter;
        this.size = this.content.length;
        this.storyBoard = [];
        if (this.chapter.name) this.showTitle(this.chapter.name);
        else {
            this.showBg();
            this.next();
        }
    }
    showTitle(title) {
        scene.set('pause', true)
        let self = this
        let fsize = Com.gblen(title) / 2 * 36 / 2;
        let titleCtl = Text.create(scene, 'title', title, { x: scene.size().w / 2 - fsize, y: scene.size().h / 2 - 50 }, true);
        scene.show('title');
        draw.clear();
        setTimeout(() => {
            scene.hide('title');
            scene.remove(titleCtl, 'title');
            scene.show('story');
            scene.set('pause', false)
            self.showBg();
            // console.log("line:",Me.chapter.line)
            if (Me.chapter.line > 0) { // 读取上次进度
                Me.chapter.line--;
                let line = Me.chapter.line
                Me.chapter.line = 0
                Me.chapter.pid = 0
                for (let i = 0; i < line; i++) {
                    self.next();
                }
            } else {
                self.next();
            }
        }, 3000);
    }
    clearStoryBoard() {
        Me.chapter.pid = 0;
        this.storyBoard.forEach(one => {
            scene.remove(one, 'story');
        });
        this.storyBoard = [];
    }
    splitsTxt(str, flag) { // 根据长度分割字符串
        let arr = [];
        for (let i = 0, len = Com.gblen(str) / 2 / flag; i < len; i++) {
            let str1 = str.substr(0, flag);
            str = str.replace(str1, '');
            arr.push(str1)
        }
        return arr
    }
    next() {
        if (scene.get('pause')) return;
        let self = this
        let one = this.content[Me.chapter.line];
        let tp = typeof (one);
        let isPrompt = false
        if (tp === 'string' || tp === 'object') {
            let cmd = one;
            if (tp === 'string') {
                cmd = { do: "say", k: "", v: one }
            }
            switch (cmd.do) {
                case 'say': {
                    let role = cmd.k;
                    let roleName = "";
                    let roleColor = roleDefaultColor
                    let txt = cmd.v;
                    if (role === "") {
                        roleName = undefined;
                    } else if (role === "ME") {
                        roleName = scene.get('me').name;
                        roleColor = scene.get('me').color;
                    } else {
                        if (self.roles[role]) {
                            roleName = self.roles[role].name;
                            roleColor = self.roles[role].color;
                        } else {
                            roleName = role;
                        }
                    }
                    Me.chapter.pid++;
                    if (Me.chapter.pid >= textLines) {
                        self.clearStoryBoard();
                        self.showBg();
                        Me.chapter.pid++;
                    }
                    if (roleName) {
                        let nameW = Com.gblen(roleName) * storyFontSize / 2 + storyLineHeight + storyMargin[3]
                        self.storyBoard.push(Text.create(scene, 'story', roleName, { x: storyMargin[3], y: (Me.chapter.pid - 1) * storyLineHeight + storyMargin[0] }, { fill: textColor, stroke: roleColor, strokeThickness: 2, fontSize: storyFontSize }));
                        let lineFont = Math.floor((scene.size().w - storyMargin[1] - nameW) / storyFontSize);
                        let txts = self.splitsTxt(txt, lineFont);
                        txts.forEach(str => {
                            self.storyBoard.push(Text.create(scene, 'story', str, { x: nameW, y: (Me.chapter.pid - 1) * storyLineHeight + storyMargin[0] }, { fill: textColor, fontSize: storyFontSize, fontWeight: 'normal' }));
                            Me.chapter.pid++;
                        });
                        // Me.chapter.pid--;
                    } else {
                        let lineFonts = Math.floor((scene.size().w - storyMargin[1] - storyMargin[3]) / storyFontSize) // 一行显示的文本字数
                        let txts = self.splitsTxt(txt, lineFonts);
                        txts.forEach(str => {
                            self.storyBoard.push(Text.create(scene, 'story', str, { x: storyMargin[3], y: (Me.chapter.pid - 1) * storyLineHeight + storyMargin[0] }, { fill: textColor, fontSize: storyFontSize, fontWeight: 'normal' }));
                            Me.chapter.pid++;
                        });
                        // Me.chapter.pid--;
                    }
                    break;
                }
                case 'fight': { // 战斗 k:敌人s v:次数
                    scene.set('pause', true);
                    let ids = cmd.k;
                    let times = Number(cmd.v);
                    let arr = [];
                    ids.forEach(id => {
                        arr.push(this.roles[id]);
                    });
                    fight.show();
                    if (scene.get('isShowDrawPane')) {
                        draw.hide();
                    }
                    scene.hide('story');
                    fight.fightingTimes(fightBg, Me, arr, times, () => {
                        scene.set('pause', false);
                        fight.hide();
                        if (scene.get('isShowDrawPane')) {
                            draw.show();
                        }
                        scene.show('story');
                    });
                    break;
                }
                case 'img': { // 图片 k:名称(任意，可以指定为ME（玩家角色）或role库中角色，如此做则不需要指定pic) v:{pic路径,po坐标,size图片大小（可不指定）,anc锚点(默认0.5图片中心定位),ext如果不是png需指定后缀} po：左上角坐标{x:0,y:0} 满800*600 url:可带相对路径/,相对res目录的
                    let name = cmd.k;
                    let one = cmd.v;
                    let url = one.pic
                    if (name === "ME") {
                        url = Me.icon
                    } else if (self.roles[name]) {
                        url = self.roles[name].icon
                    }
                    draw.add(name, url, one.po, one.size, one.anc, one.ext);
                    isPrompt = true;
                    break;
                }
                case 'delimg': { // 删除图片 k:名称 v:任意，当为clear时会清空所有图片
                    let name = cmd.k;
                    let isClear = cmd.v;
                    if (isClear === 'clear') {
                        draw.clear();
                    } else {
                        draw.del(name);
                    }
                    isPrompt = true;
                    break;
                }
                case 'choice': { // 选项 {"do": "choice","k":"询问内容","v":{"flag":"变量名","yes":"选项一","yesval":"如果选择选项一flag对应变量的内容","no":"选项二","noval":"选项二对应变量值"}}
                    let content = cmd.k;
                    let one = cmd.v;
                    scene.set('pause', true)
                    confirm({
                        content: content,
                        okText: one.yes,
                        cancelText: one.no,
                        onOk() {
                            DB.set(`${Me.id}-${self.storyName}-${one.flag}`, one.yesval);
                            scene.set('pause', false)
                        },
                        onCancel() {
                            DB.set(`${Me.id}-${self.storyName}-${one.flag}`, one.noval);
                            scene.set('pause', false)
                        }
                    });
                    break;
                }
                case 'if': { // 条件判断跳转 {"do": "if","k":"flag变量名","v":{"op":"操作 不填为判断真,! 不为真,= 等于,!= 不等于,> 大于,< 小于,>=,<=","val":"比较的值","yes":比较结果为真时跳转的分支,"no":比较结果为假时跳转的分支}}
                    let flag = cmd.k;
                    let one = cmd.v;
                    let value = DB.get(`${Me.id}-${self.storyName}-${flag}`);
                    let isTrue = false;
                    if (one.op) {
                        let val = one.val
                        switch (one.op) {
                            case "!": {
                                isTrue = true
                                if (value && value.length > 0 && value !== "false") isTrue = false;
                                break;
                            }
                            case "=": {
                                if (value === val) isTrue = true;
                                break;
                            }
                            case "!=": {
                                isTrue = false;
                                if (value !== val) isTrue = true;
                                break;
                            }
                            case ">": {
                                if (Number(value) > Number(val)) isTrue = true;
                                break;
                            }
                            case ">=": {
                                if (Number(value) >= Number(val)) isTrue = true;
                                break;
                            }
                            case "<": {
                                if (Number(value) < Number(val)) isTrue = true;
                                break;
                            }
                            case "<=": {
                                if (Number(value) <= Number(val)) isTrue = true;
                                break;
                            }
                            default: {

                            }
                        }
                    } else {
                        if (value && value.length > 0 && value !== "false") {
                            isTrue = true
                        }
                    }
                    let jump = one.no
                    if (isTrue) jump = one.yes;
                    self.goto(Number(jump));
                    return;
                }
                case 'goto': { // 直接跳转 {"do": "if","k":跳转章节id（从0开始）}
                    let jump = cmd.k;
                    self.goto(Number(jump));
                    break;
                }
                case 'end': { // 结束游戏 {"do": "end"} 由于是直接结束，所以建议在前面加上提示已经结束的话
                    Me.chapter.chapter = self.chapterNum
                    self.goto();
                    break;
                }
                case 'bg': { // 改变文本框背景 {"do": "bg","k":"bg1.jpg"} 路径相对于res目录，需要指明后缀
                    if (txtSp) {
                        txtBg = cmd.k;
                        Sprite.change(txtSp, `./res/${txtBg}`);
                    }
                    isPrompt = true;
                    break;
                }
                case 'fightbg': { // 改变战斗背景 {"do": "fightbg","k":"bg2.jpg"} 路径相对于res目录，需要指明后缀
                    fightBg = cmd.k;
                    isPrompt = true;
                    break;
                }
                default: {

                }
            }
        }
        Me.chapter.line++;
        if (Me.chapter.line > this.size) {
            this.goto();
        } else {
            if (isPrompt) {
                self.next();
            }
        }
    }
    goto(cid) {
        this.clearStoryBoard();
        if (cid) Me.chapter.chapter = cid;
        else Me.chapter.chapter++;
        Me.chapter.line = 0;
        Me.chapter.pid = 0;
        if (Me.chapter.chapter >= this.chapterNum) {
            scene.get('removeStoryFunc')();
            scene.removeScene('story');
            scene.show('entry');
            return;
        }
        this.beginChapter();
    }
}

export default Story;
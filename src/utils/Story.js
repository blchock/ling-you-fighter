import Role from '../utils/Role';
import Text from '../utils/Text';
let scene;
let Me;
const screenSize = { w: 800, h: 600 }
const storyFontSize = 22
const storyLineHeight = 30
const storyMargin = 20
const lineFonts = Math.floor((screenSize.w - storyMargin * 2) / storyFontSize) // 一行显示的文本字数
class Story {
    constructor(sc, fileName, func) {
        let self = this
        scene = sc
        self.init(fileName, func)
        scene.set('reloadStory',(file) => {
            self.clearStoryBoard();
            self.init(file, (story) => {
                story.start();
            })
        })
    }
    init(fileName, func) {
        let self = this
        this.storyName = fileName
        this.enemys = {}
        this.storyBoard = [];
        var url = `scripts/${fileName}.json`/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var data = JSON.parse(request.responseText);
                self.data = data;
                console.log("data:", data)
                if (func) func(self);
            }
        }
    }
    start(role) {
        if(role)
        {
            Me = role;
            this.initFightBoard();
            this.initTitleBoard();
            this.initStroyBoard();
        }
        this.initEnemys(this.data.enemy);
        this.chapterNum = this.data.story.length;
        this.beginChapter();
    }
    initFightBoard() {
        scene.newScene('fight');
        scene.hide('fight');
    }
    initTitleBoard() {
        scene.newScene('title');
        scene.hide('title');
    }
    initStroyBoard() {
        let self = this
        scene.newScene('story');
        scene.hide('story');
        let keyFunc = (e) => {
            if (e.code === 'Enter') {
                self.next();
            } else if (e.code === 'Backquote') {
                scene.call.showMenu();
            }
        }
        let mouseFunc = (e) => {
            if (e.button === 0) {
                self.next();
            }
        }
        window.addEventListener('keypress', keyFunc)
        window.addEventListener('mousedown', mouseFunc)
        scene.set('removeStoryFunc', () => {
            window.removeEventListener('keypress', keyFunc)
            window.removeEventListener('mousedown', mouseFunc)
        });
    }
    initEnemys(array) {
        let self = this
        array.forEach(eny => {
            let roleid = Role.create(eny);
            self.enemys[eny.id] = new Role(roleid);
        });
        console.log("loaded enemys!")
    }
    beginChapter() {
        this.chapter = this.data.story[Me.chapter.chapter];
        this.content = this.chapter.chapter;
        this.size = this.content.length;
        this.storyBoard = [];
        this.showTitle(this.chapter.name);
    }
    showTitle(title) {
        scene.set('pause', true)
        let self = this
        let fsize = title.length * 36 / 2;
        let titleCtl = Text.create(scene, 'title', title, { x: screenSize.w / 2 - fsize, y: screenSize.h / 2 - 50 }, true);
        scene.show('title');
        setTimeout(() => {
            scene.hide('title');
            scene.remove(titleCtl, 'title');
            scene.show('story');
            scene.set('pause', false)
            if (Me.chapter.line > 0) { // 读取上次进度
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
        for (let i = 0, len = str.length / flag; i < len; i++) {
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
        if (tp === 'string' || tp === 'object') {
            let cmd = one;
            if (tp === 'string') {
                cmd = { do: "say", k: "", v: one }
            }
            switch (cmd.do) {
                case 'say': {
                    let role = cmd.k;
                    let roleName = "";
                    let roleColor = "#FFFFFF"
                    let txt = cmd.v;
                    if (role === "") {
                        roleName = undefined;
                    } else if (role === "ME") {
                        roleName = scene.get('me').name;
                        roleColor = scene.get('me').color;
                    } else {
                        if (self.enemys[role]) {
                            roleName = self.enemys[role].name;
                            roleColor = self.enemys[role].color;
                        } else {
                            roleName = role;
                        }
                    }
                    Me.chapter.pid++;
                    if (Me.chapter.pid >= 18) {
                        self.clearStoryBoard();
                        Me.chapter.pid++;
                    }
                    if (roleName) {
                        let nameW = roleName.length * storyFontSize + storyLineHeight
                        self.storyBoard.push(Text.create(scene, 'story', roleName, { x: storyMargin, y: (Me.chapter.pid - 1) * storyLineHeight + storyMargin }, { fill: "#ffffff", stroke: roleColor, strokeThickness: 2, fontSize: storyFontSize }));
                        let lineFont = Math.floor((screenSize.w - storyMargin * 2 - nameW) / storyFontSize);
                        let txts = self.splitsTxt(txt, lineFont);
                        txts.forEach(str => {
                            self.storyBoard.push(Text.create(scene, 'story', str, { x: nameW, y: (Me.chapter.pid - 1) * storyLineHeight + storyMargin }, { fill: "#ffffff", fontSize: storyFontSize, fontWeight: 'normal' }));
                            Me.chapter.pid++;
                        });
                        // Me.chapter.pid--;
                    } else {
                        let txts = self.splitsTxt(txt, lineFonts);
                        txts.forEach(str => {
                            self.storyBoard.push(Text.create(scene, 'story', str, { x: storyMargin, y: (Me.chapter.pid - 1) * storyLineHeight + storyMargin }, { fill: "#ffffff", fontSize: storyFontSize, fontWeight: 'normal' }));
                            Me.chapter.pid++;
                        });
                        // Me.chapter.pid--;
                    }
                    break;
                }
                case 'fight': {
                    let roles = cmd.k;
                    let times = Number(cmd.v);

                    break;
                }
            }
        }
        Me.chapter.line++;
        if (Me.chapter.line >= this.size) {
            this.end();
        }
    }
    end() {
        this.clearStoryBoard();
        Me.chapter.chapter++;
        Me.chapter.line = 0;
        Me.chapter.pid = 0;
        console.log(Me.chapter.chapter,this.chapterNum)
        if (Me.chapter.chapter >= this.chapterNum) {
            scene.get('removeStoryFunc')();
            scene.removeScene('story');
            scene.removeScene('fight');
            scene.show('entry');
            return;
        }
        this.beginChapter();
    }
}

export default Story;
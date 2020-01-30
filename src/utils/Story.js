import Role from '../utils/Role';
import Text from '../utils/Text';
let scene;

class Story {
    constructor(sc, fileName, func) {
        let self = this
        scene = sc
        this.storyName = fileName
        this.enemys = {}
        this.storyBoard = [];
        this.curChapter = 0
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
    start() {
        this.initFightBoard();
        this.initTitleBoard();
        this.initStroyBoard();
        this.initEnemys(this.data.enemy);
        this.chapterNum = this.data.story.length;
        this.curChapter = 0;
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
        this.chapter = this.data.story[this.curChapter];
        this.content = this.chapter.chapter;
        this.size = this.content.length;
        this.id = 0;
        this.pid = 0;
        this.storyBoard = [];
        this.showTitle(this.chapter.name);
    }
    showTitle(title) {
        let self = this
        let fsize = title.length * 36 / 2;
        let titleCtl = Text.create(scene, 'title', title, { x: 400 - fsize, y: 250 }, true);
        scene.show('title');
        setTimeout(() => {
            scene.hide('title');
            scene.remove(titleCtl, 'title');
            scene.show('story');
            self.next();
        }, 3000);
    }
    next() {
        let self = this
        let one = this.content[this.id];
        let tp = typeof (one);
        console.log(typeof (one), one);
        if (tp === 'string' || tp === 'object') {
            let cmd = one;
            if (tp === 'string') {
                cmd = { do: "say", k: "", v: one }
            }
            switch (cmd.do) {
                case 'say': {
                    let role = cmd.k;
                    let roleName = "";
                    let txt = cmd.v;
                    if (role === "") {
                        roleName = undefined;
                    } else if (role === "ME") {
                        roleName = scene.get('me').name;
                    } else {
                        if(self.enemys[role]) {
                            roleName = self.enemys[role].name;
                        } else {
                            roleName = role;
                        }
                    }
                    self.pid++;
                    if(self.pid >= 18) {
                        self.pid = 1;
                        self.storyBoard.forEach(one => {
                            scene.remove(one, 'story');
                        });
                        self.storyBoard = [];
                    }
                    if (roleName) {
                        self.storyBoard.push(Text.create(scene, 'story', roleName, { x: 20, y: self.pid * 30 + 20 }, { fill: "#ffffff", fontSize: 26 }));
                        self.storyBoard.push(Text.create(scene, 'story', txt, { x: 120, y: self.pid * 30 + 20 }, { fill: "#ffffff", fontSize: 26, fontWeight: 'normal' }));
                    } else {
                        self.storyBoard.push(Text.create(scene, 'story', txt, { x: 30, y: self.pid * 30 + 20 }, { fill: "#ffffff", fontSize: 26, fontWeight: 'normal' }));
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
        this.id++;
        if (this.id >= this.size) {
            this.end();
        }
    }
    end() {
        this.curChapter++;
        if (this.curChapter >= this.chapterNum) {
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
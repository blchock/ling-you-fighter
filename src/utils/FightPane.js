import Sprite from '../utils/Sprite';
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
    fighting(fightBg, roleL, roleR, func) {
        // set bg
        let url = ''
        if(fightBg && fightBg !== null) {
            url = `./res/${fightBg}`
        } else url = './bg/fight_bg.jpg'
        this.add('bgSp', url, { x: scene.size().w / 2, y: scene.size().h / 2 }, 0.5, 'rootpath');
        // set role
        // this.add(roleL.id, roleL.icon, {x: 200, y: scene.size().h / 2}, )
    }
    fightingTimes(fightBg, role, roles, times, func) {
        let self = this
        if (times > 1) {
            let len = roles.length;
            let curFighter = Math.floor(Math.random() * len)
            self.fighting(fightBg, role, roles[curFighter], () => {
                self.fightingTimes(fightBg, role, roles, times - 1, func)
            })
        } else {
            if (func) func();
        }
    }
    add(name, img, po, anc, ext) { // po:{ x: 0, y: 0 }
        if (this.imgs[name]) this.del(name);
        let url = `./res/${img}.png`
        if (ext) {
            if (ext === 'rootpath') url = img;
            else url = `./res/${img}.${ext}`
        }
        console.log(name, url);
        console.log(po);
        let sp = Sprite.create(scene, this.name, url, po, anc);
        this.imgs[name] = sp;
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
import Sprite from '../utils/Sprite';
let scene;
class DrawPane {
    constructor(sc) {
        scene = sc;
        this.name = 'drawpane';
        scene.newScene(this.name);
        this.imgs = {}
    }
    hide() {
        scene.hide(this.name);
    }
    show() {
        scene.show(this.name);
    }
    add(name, img, po, anc, ext) { // po:{ x: 0, y: 0 }
        if (this.imgs[name]) this.del(name);
        let url = `./res/${img}.png`
        if (ext) url = `./res/${img}.${ext}`
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

export default DrawPane;
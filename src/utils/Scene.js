// 场景管理器
import React from 'react';
import * as PIXI from 'pixi.js';
class Scene { //  extends React.Component
  constructor(color) {
    this.app = new PIXI.Application({ backgroundColor: color });
    this.containers = {};
    this.call = {};
    this.data = {};
    this.curSceneName = "";
  }
  getScene(name) {
    if (this.curSceneName === "") return this.app.stage;
    return this.containers[name || this.curSceneName];
  }
  // 场景显示
  show(name) {
    this.getScene(name || this.curSceneName).visible = true
  }
  // 场景隐藏
  hide(name) {
    this.getScene(name || this.curSceneName).visible = false
  }
  // 场景切换
  replace(toName, fromName) {
    this.hide(fromName);
    this.show(toName);
  }
  getView() {
    return this.app.view;
  }
  newScene(name) {
    const container = new PIXI.Container();
    this.containers[name] = container;
    this.app.stage.addChild(container);
    this.curSceneName = name;
  }
  removeScene(name) {
    name = name || this.curSceneName
    if (this.containers[name]) {
      this.app.stage.removeChild(this.containers[name]);
      this.containers[name] = undefined;
    }
  }
  remove(child, sceneName) {
    sceneName = sceneName || this.curSceneName
    if (this.containers[sceneName]) {
      this.containers[sceneName].removeChild(child);
    }
  }
  timer(func) {
    this.app.ticker.add(func); // (delta) => {}
  }
  // storage
  set(key, value) {
    this.data[key] = value;
  }
  get(key) {
    return this.data[key];
  }
}

export default Scene;
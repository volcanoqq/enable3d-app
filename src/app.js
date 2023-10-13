import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { CameraController } from "./CameraController";
import { PhysicsManager } from "./PhysicsManager";

const clock = new THREE.Clock();
export class App {
  dom;

  scene;

  camera;

  loader;

  renderer;

  stats;

  PhysicsManager;

  constructor(config, inited) {
    const { dom, url, background } = config;

    this.scene = new THREE.Scene();
    this.dom = dom;
    this.loader = new GLTFLoader();

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    });

    this.initRenderer(dom);
    this.camera = new CameraController(this);

    if (background !== undefined) {
      this.scene.background = new THREE.Color(background);
    }

    this.PhysicsManager = new PhysicsManager(this);

    this.loader.load(url, (gltf) => {
      console.log(gltf);

      this.scene.add(gltf.scene);

      inited?.(gltf.scene);
    });

    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    console.log("场景初始化完毕！");

    const ambient = new THREE.AmbientLight(0xffffff, 0.1); // AmbientLight,影响整个场景的光源
    ambient.name = "环境光";
    this.scene.add(ambient);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.name = "平行光";
    directionalLight.position.set(100, 60, 50);
    this.scene.add(directionalLight);

    // this.cacheBaseObject = new Map()

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.stats.dom.style.position = "absolute";
    this.stats.dom.style.top = "0px"; // 显示在屏幕左上角的地方。
    this.stats.dom.style.display = "none";

    this.render();
  }

  initRenderer(dom) {
    const { width, height } = dom.getBoundingClientRect();

    const top = `${dom.offsetTop}px`;
    const left = `${dom.offsetLeft}px`;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    // 取消自动清除上一次渲染的场景
    this.renderer.autoClear = false;

    dom.appendChild(this.renderer.domElement);
  }

  setScene(scene) {
    this.scene = scene;
    return this;
  }

  getObjectByName(name) {
    return this.scene.getObjectByName(name);
  }

  onWindowResize() {
    const { width, height } = this.dom.getBoundingClientRect();

    const aspect = width / height;

    this.renderer.setSize(width, height);

    this.camera.camera3D.aspect = aspect;
    this.camera.camera3D.updateProjectionMatrix();
  }

  render() {
    const delta = clock.getDelta();

    // 每次调用render()函数的时候，把上次调用render()执行两次.render()叠加的帧缓冲区数据清除
    this.renderer.clear();
    this.camera.controls.update();

    this.renderer.render(this.scene, this.camera.viewportCamera);
    this.stats.update();

    if (this.PhysicsManager) {
      this.PhysicsManager.update(delta);
    }

    requestAnimationFrame(this.render.bind(this));
  }
}

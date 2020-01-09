import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js' // 引入性能监视器
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js' // 引入动画引擎

const width = document.getElementById('canvas-frame').clientWidth;
const height = document.getElementById('canvas-frame').clientHeight;
// 初始化三大创建
let renderer = new THREE.WebGLRenderer({antialias: true});
let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
let scene = new THREE.Scene();
// 初始化性能监视器
let stats = new Stats();

// 初始化3d模型
function initThree() {
  renderer.setSize(width, height);
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.width = '100px';
  stats.domElement.style.height = '100px';
  stats.domElement.style.right = '0px';
  stats.domElement.style.left = '';
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  document.getElementById('canvas-frame').appendChild(stats.domElement);
  renderer.setClearColor(0xFFFFFF, 1.0);
}

// 初始化相机
function initCamera() {
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 600;
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
  camera.lookAt(0,0,0);
}

// 初始化光源
function initLight() {
  let light = new THREE.AmbientLight(0xffffff); // 环境光
  // light.position.set(100, 100, 200);
  scene.add(light);
  let light2 = new THREE.PointLight(0xff0000);
  light.position.set(0, 0, 600);
  scene.add(light2);
}

// 初始化模型
let mesh;
function initObject() {
  let geometry = new THREE.CylinderGeometry(100, 150, 400);
  let material = new THREE.MeshLambertMaterial({color: 0xffff00});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}
function initTween() {
  new TWEEN.Tween(mesh.position).to({x: -400}, 3000).repeat(Infinity).start();
}
// 动画函数
let direction = 'left';
function animation() {
  // if (camera.position.x >= 150) direction = 'right';
  // if (camera.position.x <= 0) direction = 'left';
  // if (camera.position.x <= 150 && direction === 'right') camera.position.x -= 1;
  // if (camera.position.x >= 0 && direction === 'left') camera.position.x += 1;
  // mesh.position.x -=1;
  renderer.render(scene, camera);
  stats.update();
  TWEEN.update();
  requestAnimationFrame(animation);
}
let threeStart3_1 = () => {
  initThree();
  initCamera();
  initLight();
  initObject();
  initTween();
  animation();
};

export {
  threeStart3_1
}

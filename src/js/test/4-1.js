import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
// 获取浏览器可视窗口的宽高
const width = document.getElementById('canvas-frame').clientWidth;
const height = document.getElementById('canvas-frame').clientHeight;
// 三创建创建
let scene = new THREE.Scene(); // 创建场景
let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000); // 透视相机
// let camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 10, 1000); // 正投影相机
let renderer = new THREE.WebGLRenderer({antialias: true});

// 初始化监视器
let stats = new Stats();

// 初始化
function initTHREE() {
  initStats();
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xffffff, 1);
}

// 初始化性能监视器
function initStats() {
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '';
  stats.domElement.style.right = '0px';
  document.getElementById('canvas-frame').appendChild(stats.domElement);
}

// 初始化相机
function initCamera() {
  camera.position.x = 600;
  camera.position.y = 0;
  camera.position.z = 600;
  camera.up.x = 0;
  camera.up.y = 1; // y为正上方
  camera.up.z = 0;
  camera.lookAt(0,0,0);
}

// 初始化光源
function initLight() {

  // let environmentLight = new THREE.AmbientLight(0xffffff);
  // environmentLight.position.set(100,100, 200);
  // scene.add(environmentLight); // 添加环境光

  let pointLight = new THREE.PointLight(0xff0000);
  pointLight.position.set(0,0,50);
  scene.add(pointLight); // 添加单点光源

  // let directionalLight = new THREE.DirectionalLight(0xff0000);
  // directionalLight.position.set(0,0,1);
  // scene.add(directionalLight)
}

// 初始化物体
function initObject() {
  // let geometry = new THREE.CylinderGeometry(70, 100, 200);
  let geometry = new THREE.BoxGeometry(200, 100, 50, 4,4);
  let material = new THREE.MeshLambertMaterial({color:0xffffff});
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,0,0);
  scene.add(mesh);

  let geometry2 = new THREE.BoxGeometry(200, 100, 50, 4,4);
  let material2 = new THREE.MeshLambertMaterial({color:0xffffff});
  let mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(-300,0,0);
  scene.add(mesh2);

  let geometry3 = new THREE.BoxGeometry(200, 100, 50, 4,4);
  let material3 = new THREE.MeshLambertMaterial({color:0xffffff});
  let mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.position.set(300,0,0);
  scene.add(mesh3);

  let geometry4 = new THREE.BoxGeometry(200, 100, 50, 4,4);
  let material4 = new THREE.MeshLambertMaterial({color:0xffffff});
  let mesh4 = new THREE.Mesh(geometry4, material4);
  mesh4.position.set(0,-150,0);
  scene.add(mesh4);

  let geometry5 = new THREE.BoxGeometry(200, 100, 50, 4,4);
  let material5 = new THREE.MeshLambertMaterial({color:0xffffff});
  let mesh5 = new THREE.Mesh(geometry5, material5);
  mesh5.position.set(0,150,0);
  scene.add(mesh5);

  let geometry6 = new THREE.BoxGeometry(200, 100, 50, 4,4);
  let material6 = new THREE.MeshLambertMaterial({color:0xffffff});
  let mesh6 = new THREE.Mesh(geometry6, material6);
  mesh6.position.set(0,0,-100);
  scene.add(mesh6);
}

// 游戏循环
function animation() {
  renderer.render(scene, camera);
  stats.update();
  requestAnimationFrame(animation)
}

// 渲染函数
let ThreeStart4_1 = () => {
  initTHREE();
  initCamera();
  initLight();
  initObject();
  animation();
};
export default ThreeStart4_1
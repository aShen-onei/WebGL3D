import * as THREE from 'three'

const width = document.getElementById('canvas-frame').clientWidth;
const height = document.getElementById('canvas-frame').clientHeight;
// 初始化三大创建
let renderer = new THREE.WebGLRenderer({antialias: true});
let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
let scene = new THREE.Scene();

// 初始化3d模型
function initThree() {
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xFFFFFF, 1.0);
}

// 初始化相机
function initCamera() {
  camera.position.x = 0;
  camera.position.y = 1500;
  camera.position.z = 1;
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 1;
  camera.lookAt(0,0,0);
}

// 初始化光源
function initLight() {
  let light = new THREE.DirectionalLight(0xFF0000, 1.0);
  light.position.set(100, 100, 200);
  scene.add(light);
}

// 初始化模型
function initObject() {
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(500, 0, 0));
  geometry.vertices.push(new THREE.Vector3(-500, 0, 0));

  for (let i = 0; i <= 20; i++) {
    let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0x000000, transparent: true, opacity: 0.2}));
    line.position.z = (i * 50) - 500;
    scene.add(line);

    let line2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0x000000, transparent: true, opacity: 0.2}));
    line2.position.x = (i * 50) - 500;
    line2.rotation.y = 90 * Math.PI / 180; // 旋转90度
    scene.add(line2);
  }
}

let threeStart2 = () => {
  initThree();
  initCamera();
  initLight();
  initObject();
  renderer.clear();
  renderer.render(scene, camera)
};

export {
  threeStart2
}

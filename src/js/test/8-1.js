/**
 * 阴影效果添加
 */

import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";

let renderer, scene, camera,stats, control;
renderer = new THREE.WebGLRenderer({antialias: true});
function initThree() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff)
  renderer.shadowMap.enabled = true; // 开启渲染阴影
  document.body.appendChild(renderer.domElement);
}

stats = new Stats();
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 10000);
function initCamera() {
  // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 10000);
  camera.position.set(5, -10, 20);
  camera.up.set(0,0,1);
  camera.lookAt(new THREE.Vector3(0,0,0))

  let cameraHelper = new THREE.CameraHelper(camera);
  scene.add(cameraHelper);

}

function initStats() {
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left     = '';
  stats.domElement.style.right    = '0px';
  document.body.appendChild(stats.domElement);
}

function initControl() {
  control = new TrackballControls(camera, renderer.domElement);
  control.rotateSpeed           = 1;    // 旋转速度
  control.zoomSpeed             = 1.2;  // 缩放速度
  control.dynamicDampingFactor  = 0.2;  // 鼠标阻尼
  control.minDistance           = 10;    // 最小视距
  control.maxDistance           = 10000; // 最大视距

  // control = new TrackballControls(camera, renderer.domElement);
  // control.rotateSpeed           = 1;     // 旋转速度
  // control.zoomSpeed             = 1.2;   // 缩放速度
  // control.dynamicDampingFactor  = 0.2;   // 鼠标阻尼
  // control.maxDistance           = 500;   // 最大视距
  // control.minDistance           = 0;    // 最小视距
  // control.target.set(10,5,5);   // 改变摄像机的焦点
}
function initLight() {
  let environmentLight = new THREE.AmbientLight(0xffffff);
  scene.add(environmentLight);

  let pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 0,50);
  pointLight.castShadow = true;
  scene.add(pointLight);

  let pointLightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(pointLightHelper);

  let shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  scene.add(shadowHelper);
}

function initPlane() {
  let planeGeometry  = new THREE.PlaneBufferGeometry(150,150,150,150);
  let planeMaterial  = new THREE.MeshStandardMaterial({color:0x00ff00});
  let plane          = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(0,0,-10);
  plane.receiveShadow = true;
  scene.add(plane);
}

function initModel() {
  // let geometry    = new THREE.BoxGeometry(5, 5,5);
  // let material    = new THREE.MeshLambertMaterial({color:0xff0000});
  // let mesh        = new THREE.Mesh(geometry, material);
  // mesh.position.set(0,0,10);
  // mesh.castShadow = true;
  // scene.add(mesh);

  let mesh;
  let loader = new ColladaLoader();
  loader.load("/model/fishing&boat/model.dae", function (res) {
    mesh = res.scene.children[0].clone();
    mesh.castShadow = true;
    mesh.position.z = 10;

    mesh.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });
    scene.add(mesh);
  });
  // window.addEventListener('resize', onResize, false);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animation() {
  renderer.render(scene, camera);
  stats.update();
  control.update();
  requestAnimationFrame(animation);
}

let start8 = function() {
  initThree();
  initCamera();
  initLight();
  initPlane();
  initModel();
  initStats();
  initControl();
  animation();
};


export default start8
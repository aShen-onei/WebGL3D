/**
 * url:http://123.207.167.185:8080/mgc33/images/2.de6cc06.jpg
 */
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {WebGLRenderer} from "three";
import {Mesh} from "three";

const width = document.getElementById('canvas-frame').clientWidth;
const height = document.getElementById('canvas-frame').clientHeight;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
let renderer = new WebGLRenderer({antialias: true});

let stats = new Stats();

function initTHREE() {
  initStats();
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xffffff, 1);
}

function initStats() {
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '';
  stats.domElement.style.right = '0px';
  document.getElementById('canvas');
}

function initLight() {
  let environmentLight = new THREE.AmbientLight(0xffffff);
  environmentLight.position.set(100,100, 200);
  scene.add(environmentLight); // 添加环境光
}

function initCamera() {
  camera.position.z = 400;
}

function initObject() {
  let geometry = new THREE.PlaneGeometry(500, 300,1,1);
  // 纹理坐标
  geometry.vertices[0].uv = new THREE.Vector2(0, 0);
  geometry.vertices[1].uv = new THREE.Vector2(2, 0);
  geometry.vertices[2].uv = new THREE.Vector2(2, 2);
  geometry.vertices[3].uv = new THREE.Vector2(0, 2);

  // 纹理加载
  let Texture = new THREE.TextureLoader().load('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4250112166,2387168490&fm=26&gp=0.jpg');
  let material = new THREE.MeshLambertMaterial({map:Texture});
  let mesh = new Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animation() {
  stats.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

let ThreeStart5_1 = () => {
  initTHREE();
  initCamera();
  initLight();
  initObject();
  animation()
};

export default ThreeStart5_1
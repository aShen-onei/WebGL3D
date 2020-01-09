import canvas from './clock.js'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'



let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
let renderer = new THREE.WebGLRenderer();

let stats = new Stats();
function initStat() {
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '';
  stats.domElement.style.right = '0px';
  document.body.appendChild(stats.domElement)
}
function initThree() {
  initStat();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}
function initCamera() {
  camera.position.z = 400;
}
let mesh;
let texture;
function initObject() {
  let geometry = new THREE.BoxGeometry(150,150,150);
  texture = new THREE.CanvasTexture(canvas);
  let material = new THREE.MeshBasicMaterial({map:texture});
  texture.needsUpdate = true;
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  window.addEventListener('resize', onResize, false)
}
function animation() {
  stats.update();
  texture.needsUpdate = true;
  mesh.rotation.y -= 0.01;
  mesh.rotation.x -= 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animation)
}
function onResize() {
  console.log('resize');
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}
let start6_1 = function() {
  initThree();
  initCamera();
  initObject();
  animation();
};
export default start6_1;
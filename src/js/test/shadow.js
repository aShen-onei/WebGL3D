import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

var renderer;
function initRender() {
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  //告诉渲染器需要阴影效果
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
  document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 40, 100);
  camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
  scene = new THREE.Scene();
}

var light;
function initLight() {
  scene.add(new THREE.AmbientLight(0x444444));

  light = new THREE.SpotLight(0xffffff);
  light.position.set(60,30,0);

  //告诉平行光需要开启阴影投射
  light.castShadow = true;

  scene.add(light);
}

function initModel() {
  // //上面的球
  // var sphereGeometry = new THREE.SphereGeometry(5,20,20);
  // var sphereMaterial = new THREE.MeshStandardMaterial({color:0x7777ff});
  //
  // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // sphere.position.y = 5;
  //
  // //告诉球需要投射阴影
  // sphere.castShadow = true;
  //
  // scene.add(sphere);
  //
  // //辅助工具
  // var helper = new THREE.AxisHelper(10);
  // scene.add(helper);
  //
  // //立方体
  var cubeGeometry = new THREE.CubeGeometry(10,10,8);
  var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = 25;
  cube.position.y = 15;
  cube.position.z = -5;

  //告诉立方体需要投射阴影
  cube.castShadow = true;

  scene.add(cube);

  // var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
  // var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
  // var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  // sphere.position.y = 5
  // sphere.castShadow = true; //default is false
  // sphere.receiveShadow = false; //default
  // scene.add( sphere );


  let loader = new ColladaLoader();
  var   mesh;
  loader.load("/model/sofa/model.dae", function (res) {
    mesh = res.scene.children[0].clone();
    console.log(mesh);
    for(let k in mesh.children) {
      mesh.children[k].castShadow = true;
    }
    mesh.castShadow = true;
    mesh.position.y = 10;
    scene.add(mesh);
  });

  //底部平面
  var planeGeometry = new THREE.PlaneGeometry(100,100);
  var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = - 0.5 * Math.PI;
  plane.position.y = -0;

  //告诉底部平面需要接收阴影
  plane.receiveShadow = true;

  scene.add(plane);

}

//初始化性能插件
var stats;
function initStats() {
  stats = new Stats();
  document.body.appendChild(stats.dom);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;
function initControls() {
  controls = new TrackballControls( camera, renderer.domElement );
  //旋转速度
  controls.rotateSpeed = 5;
  //变焦速度
  controls.zoomSpeed = 3;
  //平移速度
  controls.panSpeed = 0.8;
  //是否不变焦
  controls.noZoom = false;
  //是否不平移
  controls.noPan = false;
  //是否开启移动惯性
  controls.staticMoving = false;
  //动态阻尼系数 就是灵敏度
  controls.dynamicDampingFactor = 0.3;
  //未知，占时先保留
  //controls.keys = [ 65, 83, 68 ];
  controls.addEventListener( 'change', render );
}

function render() {
  renderer.render( scene, camera );
}

//窗口变动触发的函数
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.handleResize();
  render();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  //更新控制器
  render();

  //更新性能插件
  stats.update();

  controls.update();

  requestAnimationFrame(animate);
}

let draw = function () {
  initRender();
  initScene();
  initCamera();
  initLight();
  initModel();
  initControls();
  initStats();

  animate();
  window.onresize = onWindowResize;
}

export default draw
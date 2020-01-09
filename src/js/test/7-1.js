// 3D模型加载
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

// 初始化三大件
let renderer = new THREE.WebGLRenderer({antialias: true});
let   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 1000);
let    scene = new THREE.Scene();

// 初始化性能监视器
let    stats = new Stats();

// 初始化交互控件
let  control;
// let control2 = new DeviceOrientationControls(camera); // 陀螺仪？
// let control4 = new FirstPersonControls(camera, renderer.domElement);
// let control5 = new FlyControls(camera, renderer.domElement);
// let control6 = new PointerLockControls(camera, renderer.domElement);
let control7;
// let control8;
// let control3 = new DragControls(camera, renderer.domElement);


function initTHREE() {
  initStats();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff);
  renderer.shadowMap.enabled = true; // 开启阴影效果
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
}

function initCamera() {
  camera.position.set(0, 10, 10);
  camera.up.set(0,0,1);
  camera.lookAt(new THREE.Vector3(0,0,0));
  // camera.getWorldDirection(new THREE.Vector3(0,0,0));

  let helper = new THREE.CameraHelper(camera);
  scene.add(helper);
}

function initgrid() {
  let helper = new THREE.GridHelper(1000, 10);
  scene.add(helper)
}
let pointLight;
function initLights() {
  let environmentLight = new THREE.AmbientLight(0x888888);
  scene.add(environmentLight);

  pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(10, 50, 50);
  pointLight.castShadow = true; // 光源可产生阴影
  scene.add(pointLight);

  pointLight.shadow.mapSize.width = 1920;
  pointLight.shadow.mapSize.height = 1080;
  pointLight.shadow.camera.near = 0.5;
  pointLight.shadow.camera.far = 500;

  let pointLightHelper = new THREE.PointLightHelper(pointLight, 1, 0xff0000)
  scene.add(pointLightHelper);

  let shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  scene.add(shadowHelper);
}

let plane;
// 模拟地面
function initPlane() {
  let geometry = new THREE.PlaneBufferGeometry( 150, 150, 32 );
  let material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  plane = new THREE.Mesh( geometry, material );
  plane.receiveShadow = true; // 接收阴影
  scene.add(plane);
}
let   mesh;
let starField;
function initObject() {
  // 辅助器
  const url = '/model/city/model.dae';
  let helper = new THREE.AxesHelper(150);
  scene.add(helper);

  let loader = new ColladaLoader();
  loader.load("/model/fishing&boat/model.dae", function (res) {
    mesh = res.scene.children[0].clone();
    mesh.traverse(function (child) {
      if(child.isMesh) {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });
    scene.add(mesh);
  });


  let starsGeometry = new THREE.Geometry();

  for ( let i = 0; i < 10000; i ++ ) {

    let star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 200 );
    star.y = THREE.Math.randFloatSpread( 200 );
    star.z = 550;

    starsGeometry.vertices.push( star );

  }

  let starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );

  starField = new THREE.Points( starsGeometry, starsMaterial );

  starField.verticesNeedUpdate = true;
  scene.add( starField );

}

function initStats() {
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '';
  stats.domElement.style.right = '0px';
  document.body.appendChild(stats.domElement)
}

function initOrbitControl() {
  control = new OrbitControls(camera, renderer.domElement);
  // 鼠标阻尼
  control.dampingFactor = 1000;
  // 缩放
     control.enableZoom = true;
  // 旋转
   control.enableRotate = true;
  // 自传
  // control.autoRotate = true;
  // 拖拽
      control.enablePan = true;
  control.target.set(10,5,5);
}

function initDeviceOrientationControls() {
  // control2.enabled = true;
}

// 第一人称控制器
function initFirstPersonControls() {
  // control4.activeLook        = false;
  // control4.enabled           = true;  // 启用
  // control4.movementSpeed     = 20;    //相机移动速度
  // control4.constrainVertical = true; // 约束垂直
  // control4.verticalMin       = 1.0;
  // control4.verticalMax       = 2.0;
  // control4.moveDown          = true;
  // control4.moveUp            = true;
  // control4.moveLeft          = true;
  // control4.moveRight         = true;
  // control4.autoForward       = false;

  // control4.verticalMax        // 环顾的最大范围
  // control4.lookAt(0,0,0)
}
// 初始化飞行相机控件
function initFlyControls() {
  // control5.autoForward    = false;         // 自动往前
  // control5.dragToLook     = true;          // 是否可以环顾,false则自动环顾。。。
  // control5.movementSpeed  = 25;            // 移动速度
  // control5.rollSpeed      = Math.PI / 24;  // 翻滚速度
}
// 轨迹球控件
function initTrackballControls() {
  control7 = new TrackballControls(camera, renderer.domElement);
  control7.rotateSpeed           = 1;     // 旋转速度
  control7.zoomSpeed             = 1.2;   // 缩放速度
  control7.dynamicDampingFactor  = 0.4;   // 鼠标阻尼
  control7.maxDistance           = 500;   // 最大视距
  control7.minDistance           = 0;    // 最小视距
  control7.target.set(10,5,5);   // 改变摄像机的焦点
}
function render() {
  let vertices = starField.geometry.vertices;
  vertices.forEach((v) => {
    v.z -= 1;
  });
  starField.geometry.vertices.needsUpdate = true;
  renderer.render(scene, camera)
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let clock = new THREE.Clock();
let step = 0;
function animation() {
  render();
  stats.update();
  // control.update();
  // control2.update();
  // control4.update(clock.getDelta());
  // control5.update(clock.getDelta());
  control7.update();
  // control8.update()
  pointLight.position.z = 10 + (26 * (Math.cos(step / 3)));
  pointLight.position.y = +(27 * (Math.sin(step / 3)));
  step += 0.03;
  mesh.rotation.z += 0.1;
  requestAnimationFrame(animation);
}

let start = function() {
  initTHREE();
  initCamera();
  initLights();
  initObject();
  initPlane();
  // initgrid();
  // initOrbitControl();
  // initDeviceOrientationControls();
  // initFirstPersonControls();
  // initFlyControls();
  initTrackballControls();
  setTimeout(() => {
    animation();
  }, 3000);
  // animation();
  window.addEventListener('resize', onResize, false);
};

export default start;
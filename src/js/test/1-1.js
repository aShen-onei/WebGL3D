import * as THREE from 'three'

let scene = new THREE.Scene(); // 场景
      // 使用透视相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer(); // 渲染
renderer.setSize(window.innerWidth, window.innerHeight); // 视图,内容区的大小

document.body.appendChild(renderer.domElement); // 挂载的节点，挂载到domElement元素上
let geometry = new THREE.BoxGeometry(1, 1, 1); // 创建物体
let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube); // 将模型添加到场景
camera.position.z = 5; // 相机位置
const render = function() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  renderer.render(scene, camera); // 渲染
}
export{
  render
}
/**
       * 三大创建 Scence Camera Renderer
       * @type {Scene}
       */
      import * as THREE from 'three'
      var renderer;
      var width;
      var height;
      /**
       * 描述: 初始化渲染器
       */
      function initThree() {
        width = document.getElementById('canvas-frame').clientWidth;
        height = document.getElementById('canvas-frame').clientHeight;
        renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        renderer.setSize(width, height);
        document.getElementById('canvas-frame').appendChild(renderer.domElement);
        renderer.setClearColor(0xFFFFFF, 1.0);
      }
      var camera;

      /**
       * 描述: 初始化相机
       */
      function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        // 相机位置
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 1;
        // 这个？z轴为上
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt(new THREE.Vector3(0,0,0))
      }
      var scene;
      /**
       * 描述: 初始化场景
       */
      function initScene() {
        scene = new THREE.Scene();
      }
      /**
       * 描述: 初始化灯光
       */
      function initLight() {
        /**
         *
         * @type {DirectionalLight}
         * 参数:
         *      color：颜色
         *      intensity：强度
         */
        let light = new THREE.DirectionalLight(0xFF0000, 1.0);
        scene.add(light);
      }
      /**
       * 描述: 初始化模型
       */
      function initObject() {
        let geometry = new THREE.Geometry();
        let material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors}); // 线性模型
        let color1 = new THREE.Color(0x444444); // 定义两个端点的颜色
        let color2 = new THREE.Color(0xFF0000);
        // 定义线的两个顶点的位置
        let p1 = new THREE.Vector3(-100, 0, 100); // 顶点1
        let p2 = new THREE.Vector3(100, 0, -100); // 顶点2
        geometry.vertices.push(p1, p2); //
        geometry.colors.push(color1, color2);
        let line = new THREE.Line(geometry, material);
        scene.add(line)
      }

      /**
       * 描述: 渲染函数
       */
      function render() {
        renderer.clear();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      /**
       * 描述: 执行初始化
       */
      const threeStart = function() {
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject();
        render();
      };
export{
  threeStart
}
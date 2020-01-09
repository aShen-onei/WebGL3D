import Sphere from "./ray-tracer/Sphere";
import Vector3 from "./ray-tracer/Vector3";
import Plane from "./ray-tracer/Plane";
import PrespectiveCamera from "./ray-tracer/PrespectiveCamera";
import Union from "./ray-tracer/Union";
let canvas = document.getElementById('canvas-frame');

function render(canvas, scene, camera, maxDepth) {
  if (!canvas || !canvas.getContext) {
    console.error('Browser too old');
    return;
  }
  let ctx = canvas.getContext('2d');
  let w   = canvas.width;
  let h   = canvas.height;
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, w, h);
  let imageData = ctx.getImageData(0, 0, w, h);
  let pixel     = imageData.data;
  scene.initialize();
  camera.initialize();
  let i = 0;
  for (let y = 0; y < h; y++) {
    let sy = 1 - y / h;
    for (let x = 0; x < w; x++) {
      let sx = x / w;
      let ray    = camera.generateRay(sx, sy);
      let result = scene.intersect(ray);
      if (result.geometry) {
        let depth    = 255 - Math.min((result.distance / maxDepth) * 255, 255);
        pixel[i]     = depth;
        pixel[i + 1] = depth;
        pixel[i + 2] = depth;
        pixel[i + 3] = 255;
      }
      i += 4;
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

const fun = () => {
  render(canvas, new Union([
    new Plane(new Vector3(0, 1, 0), 0), // 经过坐标原点的平面
    new Sphere(new Vector3(0, 10, -10), 10)
  ]
  ),
  new PrespectiveCamera(new Vector3(0, 10, 10), new Vector3(0, 0, -1), new Vector3(0, 1, 0), 90),
  20)
};

export default fun;
import Ray from "./Ray";
/**
 * 透视投影摄像机类实现
 * @param position 摄像机位置
 * @param froward 看向的方向
 * @param refUp 
 * @param fov 视角
 * @constructor
 */
let PrespectiveCamera = function (position, froward, refUp, fov) {
  this.position = position;
  this.forward  = froward;
  this.refUp    = refUp;
  this.fov      = fov;
};

PrespectiveCamera.prototype = {
  initialize:function () {
    this.right    = this.forward.cross(this.refUp);
    this.up       = this.right.cross(this.forward);
    this.fovScale = Math.tan(this.fov * 0.5 * Math.PI / 180) * 2;
  },
  /**
   * 生成光线
   * @param sx 取样坐标x
   * @param sy 取样坐标y
   */
  generateRay(sx, sy) {
    let r = this.right.multiply((sx - 0.5) * this.fovScale);
    let u = this.up.multiply((sy - 0.5) * this.fovScale);
    return new Ray(this.position, this.forward.add(r).add(u).normalize());
  }
};

export default PrespectiveCamera;
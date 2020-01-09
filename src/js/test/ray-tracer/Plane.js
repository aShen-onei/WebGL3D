import IntersectResult from "./InterSecteResult";
/**
 * 地面构造函数 数学定义为 n·x = d,n为平面的法向量，定义平面的方向，d为平面到原点的距离
 * @param normal
 * @param d
 * @constructor
 */
let Plane = function (normal, d) {
  this.normal = normal;
  this.d      = d;
};

Plane.prototype = {
  copy: function () {
    return new Plane(this.normal.copy(), this.d);
  },
  initialize: function () {
    this.position =this.normal.multiply(this.d);
  },
  intersect: function (ray) {
    // 求交算法 与平面
    let a = ray.direction.dot(this.normal);
    if (a >= 0) return IntersectResult.noHit;
    let b = this.normal.dot(ray.origin.subtract(this.position));
    let result = new IntersectResult();
    result.geometry = this;
    result.distance = -b / a;
    result.position = ray.getPoint(result.distance);
    result.normal   = this.normal;
    return result;
  }
};

export default Plane;
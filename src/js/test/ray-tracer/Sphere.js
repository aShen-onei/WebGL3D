import IntersectResult from "./InterSecteResult";
/**
 * 球体类
 * @param center Vector3
 * @param radius Vector3
 * @constructor 构造函数
 */
let Sphere = function (center, radius) {
  this.center = center;
  this.radius = radius;
};
Sphere.prototype = {
  copy: function () {
    return new Sphere(this.center.copy(), this.radius.copy())
  },
  initialize: function () {
    this.sqrtRadius = this.radius * this.radius;
  },
  intersect: function (ray) {
    /**
     * 求交，求交公式 ：±√(r^2+d^2 v^2-v^2 )-dv
     * @type {*|Vector3|Vector3|number|e}
     */
    let v  = ray.origin.subtract(this.center); // o-c,光源点减去圆心点
    let a0 = v.sqrLength() - this.sqrtRadius; // v^2 - r^2;
    let DV = ray.direction.dot(v); // D·V 光线方向点乘V
    if (DV <=0 ) {
      let value = DV * DV - a0; // r^2+d^2 v^2-v^2
      if (value >= 0) {
        // 根号内部大于零才会有交点
        let result = new IntersectResult();
        result.geometry = this;
        result.distance = -DV - Math.sqrt(value); // 只取最近的交点
        result.position = ray.getPoint(result.distance);
        result.normal   = result.position.subtract(this.center).normalize(); // 求交点和圆心的单位向量？
        return result
      }
    }
    return IntersectResult.noHit;
  }
};

export default Sphere;
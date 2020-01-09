/**
 * 顶点参数
 */
let Vector3 = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

Vector3.prototype = {
  copy: function () {
    return new Vector3(this.x, this.y, this.z);
  },
  length: function () { // 距离
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  sqrLength: function () { // 距离平方
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  normalize: function () { // 单位向量化
    let inv = 1 / this.length();
    return new Vector3(this.x * inv, this.y * inv, this.z * inv);
  },
  negate: function () { // 求反
    return new Vector3(-this.x, -this.y, -this.z);
  },
  add: function (V3) { // 向量相加
    return new Vector3(this.x + V3.x, this.y + V3.y, this.z + V3.z);
  },
  subtract(V3) { // 向量相减
    return new Vector3(this.x - V3.x, this.y - V3.y, this.z - V3.z);
  },
  multiply(Num) { // 数乘
    return new Vector3(this.x * Num, this.y * Num, this.z * Num);
  },
  dot: function (V3) { // 点乘
    return this.x * V3.x + this.y * V3.y + this.z * V3.z;
  },
  cross: function (V3) { // 叉乘 法向量
    return new Vector3(this.y * V3.z - this.z * V3.y, this.z * V3.x - this.x * V3.z, this.x * V3.y - this.y * V3.x);
  }
};


Vector3.zero = new Vector3(0, 0, 0); // 原点
export default Vector3;
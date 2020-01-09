/**
 * 光线
 */
let Ray = function (origin, direction) {
  this.origin    = origin;
  this.direction = direction;
};

/**
 * 光线线性函数 R(t) = o + td
 * @type {{getPoint: Ray.getPoint}}
 */
Ray.prototype = {
  getPoint:function (distance) {
    return this.origin.add(this.direction.multiply(distance))
  }
};

export default Ray;
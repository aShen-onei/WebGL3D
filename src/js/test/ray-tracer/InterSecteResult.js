import Vector3 from "./Vector3";

/**
 * 光线与物体的交点类
 * @constructor
 */

let IntersectResult = function () {
  this.geometry = null;
  this.distance = 0;
  this.position = Vector3.zero;
  this.normal   = Vector3.zero;
};

IntersectResult.noHit = new IntersectResult();

export default IntersectResult;
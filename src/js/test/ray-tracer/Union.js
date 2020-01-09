import IntersectResult from "./InterSecteResult";
/**
 * 一组图形的最近交点
 * @param geometries
 * @constructor
 */
let Union = function (geometries) {
  this.geometries = geometries;
};

Union.prototype = {
  initialize: function () {
    for(let i in this.geometries) {
      this.geometries[i].initialize();
    }
  },
  
  intersect: function (ray) {
    let minDistance = Infinity; // 初始化最小距离
    let minResult   = IntersectResult.noHit;
    for (let i in this.geometries) {
      let result = this.geometries[i].intersect(ray);
      if (result.geometry && result.distance < minDistance) {
        minDistance = result.distance;
        minResult = result
      }
    }
    return minResult;
  }
};

export default Union;
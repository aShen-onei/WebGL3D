let canvas;
function clock() {
  canvas = document.createElement('canvas'); // 创建canvas节点
  // canvas = document.getElementById("diagonal");
  // 宽高
  canvas.width = 128;
  canvas.height = 128;
  // 2d绘制
  let ctx = canvas.getContext('2d');
  if (ctx) {
    let timeId; // 时间戳
    let frameRate = 60; // 刷新率
    function canvasObject() {
      this.x = 0;
      this.y = 0;
      this.rotation = 0;
      this.borderWidth = 2;
      this.borderColor = '#000000';
      this.fill = false;
      this.fillColor = '#ff0000';
      this.update = function () {
        if (!this.ctx) throw new Error('没有ctx对象');
        let ctx = this.ctx;
        ctx.save();
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = this.borderColor;
        ctx.fillStyle = this.fillColor;
        ctx.translate(this.x, this.y);
        if (this.rotation) ctx.rotate(this.rotation * Math.PI / 180);
        if (this.draw) this.draw(ctx);
        if (this.fill) ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }
    function Line() {}
    Line.prototype = new canvasObject();
    Line.prototype.fill = false;
    Line.prototype.start = [0, 0];
    Line.prototype.end = [5, 5];
    Line.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.moveTo.apply(ctx, this.start);
      ctx.lineTo.apply(ctx, this.end);
      ctx.closePath();
    };

    function Circle() {}
    Circle.prototype = new canvasObject();
    Circle.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
      ctx.closePath();
    };
    // 表盘
    let circle = new Circle();
    circle.ctx = ctx;
    circle.x = 100;
    circle.y = 100;
    circle.radius = 90;
    circle.fill = true;
    circle.borderWidth = 6;
    circle.fillColor = '#ffffff';
    // 时针
    let hour = new Line();
    hour.ctx = ctx;
    hour.x = 100;
    hour.y = 100;
    hour.borderColor = '#000000';
    hour.borderWidth = 10;
    hour.rotation = 0;
    hour.start = [0, 20];
    hour.end = [0, -50];
    // 分针
    let minute = new Line();
    minute.ctx = ctx;
    minute.x = 100;
    minute.y = 100;
    minute.borderColor = '#333333';
    minute.borderWidth = 7;
    minute.rotation = 0;
    minute.start = [0, 20];
    minute.end = [0, -70];
    // 秒针
    let second = new Line();
    second.ctx = ctx;
    second.x = 100;
    second.y = 100;
    second.borderColor = '#ff0000';
    second.borderWidth = 4;
    second.rotation = 0;
    second.start = [0, 20];
    second.end = [0, -80];
    // 时分秒的固定⚪
    let center = new Circle();
    center.ctx = ctx;
    center.x = 100;
    center.y = 100;
    center.radius = 5;
    center.fill = true;
    center.borderColor = '#ff8800';
    // 刻度
    let ls = [];
    let cache;
    for (let i = 0; i < 12; i++) {
      cache = ls[i] = new Line();
      cache.ctx = ctx;
      cache.x = 100;
      cache.y = 100;
      cache.borderColor = '#ff8800';
      cache.borderWidth = 2;
      cache.rotation = i * 30;
      cache.start = [0, -70];
      cache.end = [0, -80];
    }
    timeId = setInterval(function () {
      ctx.clearRect(0,0,200,200);
      ctx.fillStyle = '#ff8800';
      ctx.fillRect(0,0,200,200);
      // 表盘
      circle.update();
      // 刻度
      for (let i = 0;cache=ls[i++];) cache.update();
      // 时针
      hour.rotation = (new Date()).getHours() * 30;
      hour.update();
      // 分针
      minute.rotation = (new Date()).getMinutes() * 6;
      minute.update();
      // 秒针
      second.rotation = (new Date()).getSeconds() * 6;
      second.update();
      // 中心圆
      center.update();
    }, (1000 / frameRate) | 0)
  } else {
    console.error('浏览器不支持canvas，请下载支持的浏览器')
  }
}
clock();
export default canvas;
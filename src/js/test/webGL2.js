// 先拿到canvas对象
let canvas               = document.getElementById('canvas-frame');
// 获取canvas的webGL2渲染对象

let gl                   = canvas.getContext('webgl2');

// 创建顶点着色器shader源
let vertexShaderSource   = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
uniform vec2 u_resolution;
 
// all shaders have a main function
void main() {
  vec2 zeroToOne = a_position / u_resolution;
  
  vec2 zeroToTwo = a_position * 2.0;
  
  vec2 clipSpace = zeroToTwo - 1.0;
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

// 创建片段着色器源
let fragmentShaderSource = `#version 300 es
 
precision mediump float;
 
uniform vec4 u_color;
 
out vec4 outColor;
 
void main() {
  outColor = u_color;
}
`;

// 创建着色器shader
function createShader(gl, type, source) {
  let shader = gl.createShader(type); // 创建着色器
  gl.shaderSource(shader, source);    // 初始化着色器
  gl.compileShader(shader);           // 编译着色器
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // 获取着色器状态
  if (success) return shader;         // 返回着色器
  console.log(gl.getShaderInfoLog());
  gl.deleteShader(shader);
}

// 创建顶点着色器
let vertexShader   = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
// 获取片段着色器
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);


// 整合两个着色器
function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;
  console.log(gl.getProgramInfoLog());
  gl.deleteProgram(program);
}

let program = createProgram(gl, vertexShader, fragmentShader);

// 查找创建的程序的属性位置
let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

// uniform属性的属性location
let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
let colorLocation = gl.getUniformLocation(program, 'u_color');
// 创建缓冲区
let positionBuffer = gl.createBuffer();

// 将缓冲区绑定到webGL绑定点上
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 将数据放入到缓冲区中，可以通过绑定点来调用缓冲区
// let positions = [
//   0,0,
//   0,0.5,
//   0.7,0,
// ];
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // 放入缓冲区

// 创建一个顶点数组对象来表示属性状态集

// let vao = gl.createVertexArray();
// gl.bindVertexArray(vao)

// 让属性打开，告知webGL属性从缓冲区取数据，否则属性不会动态更新
gl.enableVertexAttribArray(positionAttributeLocation);
// 从缓冲区获取数据
let size      = 2;        // 缓冲区数据获取活动窗口
let type      = gl.FLOAT; // 数据类型
let normalize = false;    // 归一化
let stride    = 0;        // 连续顶点属性之间的偏移量，不能大于255，为0的时候假设每个顶点属性是紧密打包的，即不交错属性，下一个顶点属性紧跟在当前属性之后
let offset    = 0;        // 顶点属性数组的起始偏移量

// 从bufferData中取出数据
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// 辅助函数
// resize()

// 显示
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// 清除画布
gl.clearColor(0,0,0,0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 将着色器程序放入到gl中
gl.useProgram(program);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
function resize(canvas) {
  let displayWidth  = canvas.width;
  let displayHeight = canvas.height;

  if (canvas.width  !== displayWidth ||
      canvas.height !== displayHeight
  ) {
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}


// 随机数
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height) {
  let x1 = x;
  let x2 = x + width;
  let y1 = y;
  let y2 = y + height;

  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ]), gl.STATIC_DRAW
    )
}

let init = function () {
  for (let i = 0; i < 50; i++) {
    setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
    let primitiveType = gl.TRIANGLES;
    let offset = 0;
    let count  = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
  // let primitiveType = gl.TRIANGLES;
  // let offset = 0;
  // let count  = 3;
  // gl.drawArrays(primitiveType, offset, count);
  // window.addEventListener('resize', resize, false)
};

export default init;
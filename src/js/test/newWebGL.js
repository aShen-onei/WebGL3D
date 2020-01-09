let canvas = document.getElementById('canvas-frame');
let gl     = canvas.getContext('webgl2');
const vertexSource = `#version 300 es
in vec2 a_position;
uniform vec2 u_resolution;

void main() {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position    = vec4(clipSpace, 0, 1);
}
`;

const fragmentSource = `#version 300 es
precision mediump float;
uniform vec4 u_color;
out vec4 outColor;
void main() {
  outColor = u_color;
}
`;

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source); // 配置着色器代码
  gl.compileShader(shader); // 编译着色器代码
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

const vertexShader   = createShader(gl, gl.VERTEX_SHADER, vertexSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader); // 往program添加着色器
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
let colorPosition             = gl.getUniformLocation(program, 'u_color');
let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

let positionBuffer = gl.createBuffer(); // 创建缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.enableVertexAttribArray(positionAttributeLocation); // 通过索引号激活属性
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
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
let init = function() {
  for (let i = 0; i < 50; i++) {
    setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
    gl.uniform4f(colorPosition, Math.random(), Math.random(), Math.random(), 1);
    let primitiveType = gl.TRIANGLES;
    let offset = 0;
    let count  = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
  let a = {
    k:1
  };
  let b = 'aaa';
  console.log(typeof(b));
  de(a, b);
  setTimeout(() => {
    console.log(a);
    Object.assign(b, a)
    console.log(b);
  }, 3000)
};
function de(a, b) {
  try {
    Object.assign(b, a)
  } catch (e) {
    console.error(e.message)
  } finally {
    // b = null
  }
}

export default init;
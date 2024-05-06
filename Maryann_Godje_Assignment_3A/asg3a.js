// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV; 
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
    gl_FragColor = vec4(v_UV, 1.0, 1.0);
  }`

// constant vars
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// Shader vars
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_Size;
let a_UV;
let u_ViewMatrix;
let u_ProjectionMatrix;

// Global vars 
let gl;
let canvas;
let g_selected_color = [1.0, 1.0, 1.0, 1.0];
let g_selected_size = 2.0;
let g_selected_type = POINT;
let g_selected_segments = 10;
var g_seconds = 0;  
var g_start_time;
var g_Point_list = [];

function main() {

  setting_up_WebGL();
  connect_vars_to_GLSL();

  html_actions();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { 
    if (ev.buttons == 1) {
      click(ev);
    }
   };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  requestAnimationFrame(tick);
}

function setting_up_WebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {
    preserveDrawingBuffer: true
  });
 
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function connect_vars_to_GLSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }
  
    // Get the storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
    }
  
    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
      console.log('Failed to get the storage location of u_FragColor');
      return;
    }
    
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
      console.log('Failed to get the storage location of u_ModelMatrix');
      return;
    }

    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
      console.log('Failed to get the storage location of u_GlobalRotateMatrix');
      return;
    }

    a_UV = gl.getUniformLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
      console.log('Failed to get the storage location of a_UV');
      return;
    }

    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
      console.log('Failed to get the storage location of u_ViewMatrix');
      return;
    }

    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
      console.log('Failed to get the storage location of u_ProjectionMatrix');
      return;
    }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function html_actions() {
  // animation buttons
//   document.getElementById('joint1_animation_OFF').onclick = function() {
//     g_joint1_animation = false;
//   };
//   document.getElementById('joint1_animation_ON').onclick = function() {
//     g_joint1_animation = true;
//   };
  
//   document.getElementById('joint2_animation_OFF').onclick = function() {
//     g_joint2_animation = false;
//   };
//   document.getElementById('joint2_animation_ON').onclick = function() {
//     g_joint2_animation = true;
//   };

//   document.getElementById('joint3_animation_OFF').onclick = function() {
//     g_joint3_animation = false;
//   };
//   document.getElementById('joint3_animation_ON').onclick = function() {
//     g_joint3_animation = true;
//   };

//   document.getElementById('joint4_animation_OFF').onclick = function() {
//     g_joint4_animation = false;
//   };
//   document.getElementById('joint4_animation_ON').onclick = function() {
//     g_joint4_animation = true;
//   };

//   // sliders
//   document.getElementById('CameraAngle').addEventListener('mousemove', function() {
//     g_angle = this.value;
//     renderScene();
//   })

//   document.getElementById('CameraAngle').addEventListener('mousemove', function() {
//     g_angle = this.value;
//     renderScene();
//   })

//   document.getElementById('JointSlider1').addEventListener('mousemove', function() {
//     g_joint1 = this.value;
//     renderScene();
//   })

//   document.getElementById('JointSlider2').addEventListener('mousemove', function() {
//     g_joint2 = this.value;
//     renderScene();
//   })

//   document.getElementById('JointSlider3').addEventListener('mousemove', function() {
//     g_joint3 = this.value;
//     renderScene();
//   })

//   document.getElementById('JointSlider4').addEventListener('mousemove', function() {
//     g_joint4 = this.value;
//     renderScene();
//   })
}

function xy_coordinate_covert_to_GL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}

function renderScene(timestamp) {

  // ASG2 Code
    //   // rotation of matrix
    //   var globalRotateM = new Matrix4().rotate(g_angle, 0, 1, 0);
    //   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotateM.elements); 

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT);

  //draw_triangle_3d([-1.0, 0.0, 0.0, -0.5, -1.0, 0.0, 0.0, 0.0, 0.0])

  var len = g_Point_list.length;
  for(var i = 0; i < len; i++) {
    g_Point_list[i].render();
  }

  drawOwl();

  // Tutor Rohan fixed the performance issue with timestamp
  var duration = timestamp - g_start_time; 
  if (timestamp % 1000 <= 100) {
    duration_performance("numdot: " + len + "; ms: " + Math.floor(duration) + "; fps: " + Math.floor(10000 / duration) / 10, "numdot");
  }
  g_start_time = timestamp;
}

function duration_performance(text, htmlID) {
  var html_element = document.getElementById(htmlID);
  if (!html_element) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  html_element.innerHTML = text;
}

function tick(timestamp) {
  g_seconds = performance.now() / 1000 - g_start_time;
  renderScene(timestamp);
  requestAnimationFrame(tick);
}

function click(ev) {
 
  let [x, y] = xy_coordinate_covert_to_GL(ev);

  // create new point
  let point;
  if (g_selected_type == POINT) {
    point = new Point();
  }
  else if (g_selected_type == TRIANGLE) {
    point = new Triangle();
  }
  else {
    point = new Circle();
  }

  point.position = [x, y];
  point.color = g_selected_color.slice();
  point.size = g_selected_size;
  point.segments = g_selected_segments;
  // store new point
  g_Point_list.push(point);

  renderScene();
}
// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV; 
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
    v_Normal = a_Normal;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3; 
  uniform sampler2D u_Sampler4;
  uniform int u_whichTexture;
  void main() {
    if (u_whichTexture == -3) {
      gl_FragColor = vec4((v_Normal + 1.0) / 2.0, 1.0);
    }
    else if (u_whichTexture == -2) {
      gl_FragColor = u_FragColor;
    }
    else if (u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV, 1.0, 1.0); 
    }
    else if (u_whichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    }
    else if (u_whichTexture == 1) {
      gl_FragColor = texture2D(u_Sampler2, v_UV); }
    else if (u_whichTexture == 2) {
        gl_FragColor = texture2D(u_Sampler3, v_UV); }
    else if (u_whichTexture == 3) {
          gl_FragColor = texture2D(u_Sampler4, v_UV); }
    else {
      gl_FragColor = vec4(1.0, 0.2, 0.2, 1.0);
    }
  }`

// constant vars
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// shader vars
let a_Position;
let a_UV;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_Size;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_whichTexture;

// Global vars
let gl;
let canvas;
let g_selected_color = [1.0, 1.0, 1.0, 1.0];
let g_selected_size = 2.0;
let g_selected_type = POINT;
let g_selected_segments = 10;
var g_seconds = 0;  
var g_start_time;
var g_angle = 0;
var viewMatrix = new Matrix4();
var projectionMatrix = new Matrix4();
var globalRotateM = new Matrix4();
var g_Point_list = [];
var g_camera;
var g_normal_on = false;
var g_map = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, //1
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //2
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //3
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //4
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //5
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //6
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //7
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //8
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //9
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //10
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //11
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //12
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //13
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //14
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //15
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //16
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //17
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //18
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //19
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //20
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //21
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //22
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //23
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //24
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //25
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //26
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //27
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //28
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //29
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //30
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //31
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, //32
];

function main() {

  setting_up_WebGL();
  connect_vars_to_GLSL();

  html_actions();

  g_camera = new Camera();
  document.onkeydown = function(ev) {
      if (ev.key == 'a' || ev.key == 'ArrowLeft') { // A
        g_camera.moveLeft(); }
      else if (ev.key == 's' || ev.key == 'ArrowDown') { // S
        g_camera.moveBackward(); }
      else if (ev.key == 'w' || ev.key == 'ArrowUp') { // W
        g_camera.moveForward(); }
      else if (ev.key == 'd' || ev.key == 'ArrowRight') { // D
        g_camera.moveRight(); }
      else if (ev.key == 'q') { // Q
        g_camera.panLeft(); }
      else if (ev.key == 'e') { // E
        g_camera.panRight(); }
    };

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { 
    if (ev.buttons == 1) {
      click(ev);
    }
   };

  initTextures();

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

    // Get the storage location of a_UV
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
      console.log('Failed to get the storage location of a_UV');
      return;
    }

    a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');  
    if (a_Normal < 0) {
      console.log('Failed to get the storage location of a_Normal');
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

    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
      console.log('Failed to get the storage location of u_Sampler1');
      return;
    }

    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    if (!u_Sampler2) {
      console.log('Failed to get the storage location of u_Sampler2');
      return;
    }

    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    if (!u_Sampler3) {
      console.log('Failed to get the storage location of u_Sampler3');
      return;
    }

    u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
    if (!u_Sampler4) {
      console.log('Failed to get the storage location of u_Sampler4');
      return;
    }

    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
      console.log('Failed to get the storage location of u_whichTexture');
      return;
    }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function html_actions() {

  // sliders
  document.getElementById('CameraAngle').addEventListener('mousemove', function() {
    g_angle = this.value;
    renderScene();
  });

  // buttons
  document.getElementById('Normal On').onclick = function() {
    g_normal_on = true;
    renderScene();
  };
  document.getElementById('Normal Off').onclick = function() {
    g_normal_on = false;
    renderScene();
  };
}

function xy_coordinate_covert_to_GL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}

function initTextures() {

  // Create the image object
  var image1 = new Image();
  if (!image1) {
    console.log('Failed to create the fried chicken image object');
    return false;
  }

  var image2 = new Image();
  if (!image2) {
    console.log('Failed to create the star image object');
    return false;
  }

  var image3 = new Image();
  if (!image3) {
    console.log('Failed to create the blue jay image object');
    return false;
  }

  var image4 = new Image();
  if (!image4) {
    console.log('Failed to create the blue jay image object');
    return false;
  }
  
  var image5 = new Image();
  if (!image5) {
    console.log('Failed to create the blue jay image object');
    return false;
  }
  
  var image6 = new Image();
  if (!image6) {
    console.log('Failed to create the blue jay image object');
    return false;
  }

  // Register the event handler to be called when image loading is completed
  image1.onload = function(){ sendTextureToGLSL(image1); };
  image2.onload = function(){ sendTextureToGLSL(image2); };
  image3.onload = function(){ sendTextureToGLSL(image3); };
  image4.onload = function(){ sendTextureToGLSL(image4); };
  
  // Tell the browser to load an Image
  image1.src = './fried_chicken_256.jpg';
  image2.src = './star.png';
  image3.src = './grass.jpg';
  image4.src = './wood.jpg';

  return true;
}

function sendTextureToGLSL(image) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image's y axis
  // Activate texture unit0
  if (image.src.includes("fried_chicken_256.jpg")) {
    gl.activeTexture(gl.TEXTURE0);
  }
  else if (image.src.includes("star.png")) {
    gl.activeTexture(gl.TEXTURE1);
  }
  else if (image.src.includes("grass.jpg")) {
    gl.activeTexture(gl.TEXTURE2);
  }
  else if (image.src.includes("wood.jpg")) {
    gl.activeTexture(gl.TEXTURE3);
  }
  else if (image.src.includes("fur1.jpg")) {
    gl.activeTexture(gl.TEXTURE4);
  }
  else {
    gl.activeTexture(gl.TEXTURE5);
  }

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameter
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the image to texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture units 0, 1, or 2 to the sampler
  if (image.src.includes("fried_chicken_256.jpg")) {
     gl.uniform1i(u_Sampler1, 0);
  }
  else if (image.src.includes("star.png")) {
    gl.uniform1i(u_Sampler2, 1);
  }
  else if (image.src.includes("grass.jpg")) {
    gl.uniform1i(u_Sampler3, 2);
  }
  else if (image.src.includes("wood.jpg")) {
    gl.uniform1i(u_Sampler4, 3);
  }
  else if (image.src.includes("fur1.jpg")) {
    gl.uniform1i(u_Sampler5, 4);
  }
  else {
    gl.uniform1i(u_Sampler6, 5);
  }
}

var g_eye = [0, 0, -1];
var g_at = [0, 0, 100];
var g_up = [0, 1, 0];

function renderScene(timestamp) {

  // Tutor Jacob showed how to use setIdentity() - 05/07/2024
  viewMatrix.setIdentity();
  viewMatrix.setLookAt(g_eye[0], g_eye[1], g_eye[2], g_at[0], g_at[1], g_at[2], g_up[0], g_up[1], g_up[2]);
  gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

  projectionMatrix.setIdentity();
  projectionMatrix.setPerspective(90, canvas.width/canvas.height, .1, 100);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix.elements);

  // rotation of matrix
  globalRotateM.setIdentity().rotate(g_angle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotateM.elements); 

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT);

  drawOwl();
  drawFloorandSky();
  drawWalls();

  var len = g_Point_list.length;
  for(var i = 0; i < len; i++) {
    g_Point_list[i].render();
  }

  // Tutor Rohan fixed the performance issue with timestamp - 05/03/2024
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
// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// constant vars
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// Global vars
let gl;
let canvas;
let a_Position;
let u_FragColor;
let u_Size;
let g_selected_color = [1.0, 1.0, 1.0, 1.0];
let g_selected_size = 2.0;
let g_selected_type = POINT;
let g_selected_segments = 10;

var g_Point_list = [];

function setting_up_WebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // OLD CODE 
  // gl = getWebGLContext(canvas);

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {
    preserveDrawingBuffer: true
  });
 
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
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

    // Get the storage location of u_Size
    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if (!u_Size) {
      console.log('Failed to get the storage location of u_Size');
      return;
    }
}

function html_actions() {
  // color buttons
  document.getElementById('Green').onclick = function() {
    g_selected_color = [0.0, 1.0, 0.0, 1.0];
  };
  document.getElementById('Red').onclick = function() {
    g_selected_color = [1.0, 0.0, 0.0, 1.0];
  };

  // shape buttons
  document.getElementById('Point').onclick = function() {
    g_selected_type = POINT;
  };

  document.getElementById('Triangle').onclick = function() {
    g_selected_type = TRIANGLE;
  };

  document.getElementById('Circle').onclick = function() {
    g_selected_type = CIRCLE;
  };

  // clear button
  document.getElementById('Clear').onclick = function() {
    g_Point_list = [];
    render_shapes();
  };


  // color sliders
  document.getElementById('RedSlider').addEventListener('mouseup', function() {
    g_selected_color[0] = this.value / 100;
  });

  document.getElementById('GreenSlider').addEventListener('mouseup', function() {
    g_selected_color[1] = this.value / 100;
  }); 

  document.getElementById('BlueSlider').addEventListener('mouseup', function() {
    g_selected_color[2] = this.value / 100;
  });

  // size slider
  document.getElementById('SizeSlider').addEventListener('mouseup', function() {
    g_selected_size = this.value;
  }); 

  // segments slider
  document.getElementById('CircleSlider').addEventListener('mouseup', function() {
    g_selected_segments = this.value;
  });
}

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

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function xy_coordinate_covert_to_GL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}

function render_shapes() {
  var start_time = performance.now();
  
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // OLD CODE
  // var len = g_points.length;

  var len = g_Point_list.length;
  for(var i = 0; i < len; i++) {
    g_Point_list[i].render();
  }

  var duration = performance.now() - start_time;
  duration_performance("numdot: " + len + "; ms: " + Math.floor(duration) + "; fps: " + Math.floor(10000 / duration) / 10, "numdot");
}

function duration_performance(text, htmlID) {
  var html_element = document.getElementById(htmlID);
  if (!html_element) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  html_element.innerHTML = text;
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
  // store new point
  g_Point_list.push(point);

  render_shapes();

  /* OLD CODE
  // Store the coordinates to g_points array
  g_points.push([x, y]);
  
  // Store colors
  g_colors.push(g_selected_color.slice());

  // Store sizes
  g_sizes.push(g_selected_size);*/
  
  /* OLD CODE
  if (x >= 0.0 && y >= 0.0) {      // First quadrant
    g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
  } else if (x < 0.0 && y < 0.0) { // Third quadrant
    g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
  } else {                         // Others
    g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
  }*/
}

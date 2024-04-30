// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
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
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_Size;
let g_selected_color = [1.0, 1.0, 1.0, 1.0];
let g_selected_size = 2.0;
let g_selected_type = POINT;
let g_selected_segments = 10;
let g_angle = 0.0;
let g_joint1 = 0.0;
let g_joint2 = 0.0;
var g_seconds = performance.now() / 1000;  
var g_start_time = performance.now() / 1000 - g_seconds;
let g_joint1_animation = false;
let g_joint2_animation = false;

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

  // render shapes
  //gl.clear(gl.COLOR_BUFFER_BIT);
  //render_shapes();
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

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function html_actions() {
  // animation buttons
  document.getElementById('joint1_animation_ON').onclick = function() {
    g_joint1_animation = false;
  };
  document.getElementById('joint1_animation_ON').onclick = function() {
    g_joint1_animation = true;
  };

  document.getElementById('joint2_animation_ON').onclick = function() {
    g_joint2_animation = false;
  };
  document.getElementById('joint2_animation_ON').onclick = function() {
    g_joint2_animation = true;
  };
  
  // sliders
  document.getElementById('CameraAngle').addEventListener('mousemove', function() {
    g_angle = this.value;
    render_shapes();
  })

  document.getElementById('JointSlider1').addEventListener('mousemove', function() {
    g_joint1 = this.value;
    render_shapes();
  })

  document.getElementById('JointSlider2').addEventListener('mousemove', function() {
    g_joint2 = this.value;
    render_shapes();
  })

  // color buttons
  // document.getElementById('Green').onclick = function() {
  //   g_selected_color = [0.0, 1.0, 0.0, 1.0];
  // };
  // document.getElementById('Red').onclick = function() {
  //   g_selected_color = [1.0, 0.0, 0.0, 1.0];
  // };
  // document.getElementById('Blue').onclick = function() {
  //   g_selected_color = [0.0, 0.0, 1.0, 1.0];
  // };
  // document.getElementById('Yellow').onclick = function() {
  //   g_selected_color = [1.0, 1.0, 0.0, 1.0];
  // };
  // document.getElementById('Pink').onclick = function() {
  //   g_selected_color = [1.0, 0.0, 0.5, 1.0];
  // };
  // document.getElementById('Purple').onclick = function() {
  //   g_selected_color = [0.5, 0.0, 0.5, 1.0];
  // };
  // document.getElementById('Orange').onclick = function() {
  //   g_selected_color = [1.0, 0.5, 0.0, 1.0];
  // };
  // document.getElementById('Grey').onclick = function() {
  //   g_selected_color = [0.5, 0.5, 0.5, 1.0];
  // };
  // document.getElementById('White').onclick = function() {
  //   g_selected_color = [1.0, 1.0, 1.0, 1.0];
  // };

  // // shape buttons
  // document.getElementById('Point').onclick = function() {
  //   g_selected_type = POINT;
  // };

  // document.getElementById('Triangle').onclick = function() {
  //   g_selected_type = TRIANGLE;
  // };

  // document.getElementById('Circle').onclick = function() {
  //   g_selected_type = CIRCLE;
  // };

  // clear button
  // document.getElementById('Clear').onclick = function() {
  //   g_Point_list = [];
  //   render_shapes();
  // };

  // document.getElementById('RedSlider').addEventListener('mouseup', function() {
  //   g_selected_color[0] = this.value / 100;
  // });

  // document.getElementById('GreenSlider').addEventListener('mouseup', function() {
  //   g_selected_color[1] = this.value / 100;
  // }); 

  // document.getElementById('BlueSlider').addEventListener('mouseup', function() {
  //   g_selected_color[2] = this.value / 100;
  // });

  // // size slider
  // document.getElementById('SizeSlider').addEventListener('mouseup', function() {
  //   g_selected_size = this.value;
  // }); 

  // // segments slider
  // document.getElementById('CircleSlider').addEventListener('mouseup', function() {
  //   g_selected_segments = this.value;
  // });
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
  
  // rotation of matrix
  var globalRotateM = new Matrix4().rotate(g_angle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotateM.elements); 

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_Point_list.length;
  // for(var i = 0; i < len; i++) {
  //   g_Point_list[i].render();
  // }

  draw_triangle_3d([-1.0, 0.0, 0.0, -0.5, -1.0, 0.0, 0.0, 0.0, 0.0]);

  var body = new Cube();
  body.color = [1.0, 0.0, 0.0, 1.0];
  body.matrix.translate(-0.25, -0.75, 0.0);
  body.rotate(5, 1, 0, 0);
  body.matrix.scale(0.5, 0.3, -0.5);
  body.render();

  var leftArm = new Cube();
  leftArm.color = [1.0, 1.0, 0.0, 1.0];
  leftArm.matrix.setTranslate(0.0, -0.5, 0.0);
  leftArm.matrix.rotate(-5, 0, 0, 1);
  leftArm.matrix.rotate(-g_joint1, 0, 0, 1);

  var leftArm_coordinates = new Matrix4(leftArm.matrix);
  leftArm.matrix.scale(0.25, 0.7, 0.5);
  leftArm.matrix.translate(-0.5, 0.0, 0.0);
  leftArm.render();

  var box = new Cube();
  box.color = [1.0, 0.0, 1.0, 1.0];
  box.matrix = leftArm_coordinates;
  box.translate(0, 0.65, 0.0); 
  box.rotate(g_joint2, 0, 0, 1);
  box.scale(0.3, 0.3, 0.3); 
  box.translate(-0.5, 0.0, 0.0);
  box.translate(-0.5, 0, -0.0001)
  box.render();

  var duration = performance.now() - start_time;
  duration_performance("numdot: " + len + "; ms: " + Math.floor(duration) + "; fps: " + Math.floor(10000 / duration) / 10, "numdot");
}

function tick() {
  g_seconds = performance.now() / 1000 - g_start_time;
  update_animations();
  // console.log(performance.now());
  // console.log(g_seconds);
  render_shapes();
  requestAnimationFrame(tick);
}

function update_animations() {
  if (g_joint1_animation) {
    g_joint1 = 45 * Math.sin(g_seconds);
  }
  if (g_joint2_animation) {
    g_joint2 = 45 * Math.sin(g_seconds * 3);
  }
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

  render_shapes();
}

function duration_performance(text, htmlID) {
  var html_element = document.getElementById(htmlID);
  if (!html_element) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  html_element.innerHTML = text;
}

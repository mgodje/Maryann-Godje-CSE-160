// DrawRectangle.js
function main() {
    // Retrieve <canvas> element <- (1)
    canvas = document.getElementById('canvas1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');

    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    let v1 = new Vector3([2.25,2.25,0]);
    drawVector(v1, "red");

/*
// Retrieve <canvas> element
  canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  // Draw a BLACK rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to BLACK
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
*/
} 

function drawVector(v, color) {
    ctx.strokeStyle = color;
    //set origin point
    var x = canvas.width/2;
    var y = canvas.height/2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+v.elements[0]*20, y-v.elements[1]*20,v.elements[2]*20);
    ctx.stroke();
}

function handleDrawEvent() {
    //clear canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black'; // Set color to BLACK
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //get input number
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;
    
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red");
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");

/*
  //clear canvas
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = 'black'; // Set color to BLACK
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //get input number
  var x1 = document.getElementById('x1').value;
  var y1 = document.getElementById('y1').value;
  
  var x2 = document.getElementById('x2').value;
  var y2 = document.getElementById('y2').value;
  var v1 = new Vector3([x1, y1, 0.0]);
  drawVector(v1, "red");
  var v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");
*/
}

function handleDrawOperationEvent() {
    //clear canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black'; // Set color to BLACK
    ctx.fillRect(0, 0, canvas.width, canvas.height);



}
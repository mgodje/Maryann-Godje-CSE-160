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

    //let v1 = new Vector3([2.25,2.25,0]);
    //drawVector(v1, "red");

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
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + v.elements[0] * 20, y - v.elements[1]*20, v.elements[2] * 20);
    ctx.stroke();
}

function handleDrawEvent() {
    //clear canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black'; // Set color to BLACK
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // get input number
    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    var x2 = document.getElementById("x2").value;
    var y2 = document.getElementById("y2").value;
    
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

    // get input number
    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    var x2 = document.getElementById("x2").value;
    var y2 = document.getElementById("y2").value;
    
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red");
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");

    var operation = document.getElementById("operation").value;
    var scalar = document.getElementById("scalar").value;

    if (operation == "Add") {
      drawVector(v1.add(v2), "green");
    }
    else if (operation == "Subtract") {
      drawVector(v1.sub(v2), "green");
    }
    else if (operation == "Multiply") {
      drawVector(v1.mul(scalar), "green");
      drawVector(v2.mul(scalar), "green");
    }
    else if (operation == "Divide") {
      drawVector(v1.div(scalar), "green");
      drawVector(v2.div(scalar), "green");
    }
    else if (operation == "Magnitude") {
      console.log("Magnitude v1: " + v1.magnitude());
      console.log("Magnitude v2: " + v2.magnitude());
    }
    else if (operation == "Normalize") {
      drawVector(v1.normalize(), "green");
      drawVector(v2.normalize(), "green");
    }
    else if (operation == "Angle Between") {
      angle = angleBetween(v1, v2);
      console.log("Angle: " + angle);
    }
    else if (operation == "Area") {
      area = areaTriangle(v1, v2);
      // to add a decimal:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
      console.log("Area of the triangle: " + area.toFixed(1));
    }
}

function angleBetween(v1, v2) { 
  let dot = Vector3.dot(v1, v2);
  let alpha = Math.acos(dot / (v1.magnitude() * v2.magnitude()));
  return alpha *= 180 / Math.PI;
}

function areaTriangle(v1, v2) {
  let cross = Vector3.cross(v1, v2);
  let v = new Vector3(cross[0], cross[1], cross[2]);
  let final = v.magnitude() / 2;
  return final;
}
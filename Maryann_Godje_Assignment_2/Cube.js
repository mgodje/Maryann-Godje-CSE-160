class Cube {
    constructor() {
      this.type='cube';
      //this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      //this.size = 2.0;
      //this.segments = 10;
      this.matrix = new Matrix4();
    }
  
    render() {
      //var xy = this.position;
      var rgba = this.color;
      //var size = this.size;
      //var segments = this.segments;

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      
      //var delta = size / 200.0;
      //let angle_move = 360 / segments;

    //   for (var angle = 0; angle < 360; angle += angle_move) {
    //     let center = [xy[0], xy[1]];
    //     let angle_1 = angle;
    //     let angle_2 = angle + angle_move;
    //     let v1 = [Math.cos(angle_1 * Math.PI / 180) * delta, Math.sin(angle_1 * Math.PI / 180) * delta];
    //     let v2 = [Math.cos(angle_2 * Math.PI / 180) * delta, Math.sin(angle_2 * Math.PI / 180) * delta];
    //     let pt1 = [center[0] + v1[0], center[1] + v1[1]];
    //     let pt2 = [center[0] + v2[0], center[1] + v2[1]];

    //   
    //   }

    // front of cube
    draw_triangle_3d([-1.0, -1.0, -1.0,   1.0, 1.0, -1.0,   1.0, -1.0, -1.0]);
    draw_triangle_3d([-1.0, -1.0, -1.0,   1.0, 1.0, -1.0,   -1.0, 1.0, -1.0]);
    
    // back of cube
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    
    draw_triangle_3d([-1.0, -1.0, 1.0,   1.0, 1.0, 1.0,   1.0, -1.0, 1.0]);
    draw_triangle_3d([-1.0, -1.0, 1.0,   1.0, 1.0, 1.0,   -1.0, 1.0, 1.0]);
    
    // top of cube
    gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
    
    draw_triangle_3d([-1.0, 1.0, -1.0,   -1.0, 1.0, 1.0,   1.0, 1.0, 1.0]);
    draw_triangle_3d([1.0, 1.0, -1.0,   1.0, 1.0, 1.0,   -1.0, 1.0, -1.0]);

    // bottom of cube
    gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);

    draw_triangle_3d([-1.0, -1.0, -1.0,   -1.0, -1.0, 1.0,   1.0, -1.0, 1.0]);
    draw_triangle_3d([1.0, -1.0, -1.0,   1.0, -1.0, 1.0,   -1.0, -1.0, -1.0]);

    // right of cube
    gl.uniform4f(u_FragColor, rgba[0]*.3, rgba[1]*.3, rgba[2]*.3, rgba[3]);

    draw_triangle_3d([1.0, -1.0, -1.0,    1.0, 1.0, -1.0,    1.0, -1.0, 1.0]);
    draw_triangle_3d([1.0, 1.0, 1.0,    1.0, 1.0, -1.0,    1.0, -1.0, 1.0]);
    
    // left of cube
    gl.uniform4f(u_FragColor, rgba[0]*.1, rgba[1]*.1, rgba[2]*.1, rgba[3]);

    draw_triangle_3d([-1.0, -1.0, -1.0,    -1.0, 1.0, -1.0,   -1.0, -1.0, 1.0]);
    draw_triangle_3d([-1.0, 1.0, 1.0,    -1.0, 1.0, -1.0,    -1.0, -1.0, 1.0]);

    // right of cube
    // draw_triangle_3d([0.0, 0.0, 0.0,    1.0, 1.0, 0.0,    1.0, 0.0, 0.0]);
    // draw_triangle_3d([0.0, 0.0, 0.0,    1.0, 1.0, 0.0,    1.0, 0.0, 0.0]);
    // draw_triangle_3d([0.0, 0.0, 0.0,    0.0, 1.0, 0.0,    1.0, 1.0, 0.0]);
    // draw_triangle_3d([0.0, 0.0, 0.0,    0.0, 1.0, 0.0,    1.0, 1.0, 0.0]);
  

    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

    }
} 
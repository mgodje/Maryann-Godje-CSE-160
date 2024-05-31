class Cube {
    constructor() {
      this.type='cube';
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.textureNum = 0;
    }
  
    render() {
      var rgba = this.color;

      gl.uniform1i(u_whichTexture, this.textureNum);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // front of cube
      //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      draw_triangle_3dUV_Normal([-1.0, -1.0, -1.0,   1.0, 1.0, -1.0,   1.0, -1.0, -1.0], 
        [0, 0, 1, 1, 1, 0],
        [0, 0, -1, 0, 0, -1, 0, 0, -1]);
      draw_triangle_3dUV_Normal([-1.0, -1.0, -1.0,   1.0, 1.0, -1.0,   -1.0, 1.0, -1.0], 
        [0, 0, 1, 1, 0, 1], 
        [0, 0, -1, 0, 0, -1, 0, 0, -1]);
      
      // back of cube
      //gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
      
      draw_triangle_3dUV_Normal([-1.0, -1.0, 1.0,   1.0, 1.0, 1.0,   1.0, -1.0, 1.0], 
        [0, 0, 1, 1, 1, 0], 
        [0, 0, 1, 0, 0, 1, 0, 0, 1]);
      draw_triangle_3dUV_Normal([-1.0, -1.0, 1.0,   1.0, 1.0, 1.0,   -1.0, 1.0, 1.0], 
        [0, 0, 1, 1, 0, 1], 
        [0, 0, 1, 0, 0, 1, 0, 0, 1]);
      
      // top of cube
      //gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
      
      draw_triangle_3dUV_Normal([-1.0, 1.0, -1.0,   -1.0, 1.0, 1.0,   1.0, 1.0, 1.0], 
        [0, 0, 1, 1, 1, 0], 
        [0, 1, 0, 0, 1, 0, 0, 1, 0]);
      draw_triangle_3dUV_Normal([1.0, 1.0, -1.0,   1.0, 1.0, 1.0,   -1.0, 1.0, -1.0], 
        [0, 0, 1, 1, 0, 1], 
        [0, 1, 0, 0, 1, 0, 0, 1, 0]);

      // bottom of cube
      //gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);

      draw_triangle_3dUV_Normal([-1.0, -1.0, -1.0,   -1.0, -1.0, 1.0,   1.0, -1.0, 1.0], 
        [0, 0, 1, 1, 1, 0], 
        [0, -1, 0, 0, -1, 0, 0, -1, 0]);
      draw_triangle_3dUV_Normal([1.0, -1.0, -1.0,   1.0, -1.0, 1.0,   -1.0, -1.0, -1.0], 
        [0, 0, 1, 1, 0, 1], 
        [0, -1, 0, 0, -1, 0, 0, -1, 0]);

      // right of cube
      //gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);

      draw_triangle_3dUV_Normal([1.0, -1.0, -1.0,    1.0, 1.0, -1.0,    1.0, -1.0, 1.0], 
        [0, 0, 1, 1, 1, 0], 
        [1, 0, 0, 1, 0, 0, 1, 0, 0]);
      draw_triangle_3dUV_Normal([1.0, 1.0, 1.0,    1.0, 1.0, -1.0,    1.0, -1.0, 1.0], 
        [0, 0, 1, 1, 0, 1], 
        [1, 0, 0, 1, 0, 0, 1, 0, 0]);
      
      // left of cube
      //gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);

      draw_triangle_3dUV_Normal([-1.0, -1.0, -1.0,    -1.0, 1.0, -1.0,   -1.0, -1.0, 1.0], 
        [0, 0, 1, 1, 1, 0], 
        [-1, 0, 0, -1, 0, 0, -1, 0, 0]);
      draw_triangle_3dUV_Normal([-1.0, 1.0, 1.0,    -1.0, 1.0, -1.0,    -1.0, -1.0, 1.0], 
        [0, 0, 1, 1, 0, 1], 
        [-1, 0, 0, -1, 0, 0, -1, 0, 0]);

    }
} 
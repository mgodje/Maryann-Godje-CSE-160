class Sphere {
    constructor() {
      this.type='sphere';
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.textureNum = 0;
      this.verts32 = new Float32Array([]);
    }
  
    render() {
      var rgba = this.color;

      gl.uniform1i(u_whichTexture, this.textureNum);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // front of cube
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      var delta = Math.PI / 10.0;
      var delta_d = Math.PI / 10.0;

      for (var theta = 0; theta < Math.PI; theta += delta) {
        for (var radius = 0; radius < 2 * Math.PI; radius += delta) {
            var p1 = [Math.sin(theta) * Math.cos(radius), Math.sin(theta) * Math.sin(radius), Math.cos(theta)];
            var p2 = [Math.sin(theta + delta_d) * Math.cos(radius), Math.sin(theta + delta_d) * Math.sin(radius), Math.cos(theta + delta_d)];
            var p3 = [Math.sin(theta) * Math.cos(radius + delta_d), Math.sin(theta) * Math.sin(radius + delta_d), Math.cos(theta)];
            var p4 = [Math.sin(theta + delta_d) * Math.cos(radius + delta_d), Math.sin(theta + delta_d) * Math.sin(radius + delta_d), Math.cos(theta + delta_d)];

            var uv1 = [theta / Math.PI, radius / (2 * Math.PI)];
            var uv2 = [(theta + delta_d) / Math.PI, radius / (2 * Math.PI)];
            var uv3 = [theta / Math.PI, (radius + delta_d) / (2 * Math.PI)];
            var uv4 = [(theta + delta_d) / Math.PI, (radius + delta_d) / (2 * Math.PI)];

            var v = [];
            var uv = [];
            v = v.concat(p1);
            uv = uv.concat(uv1);
            v = v.concat(p2);
            uv = uv.concat(uv2);
            v = v.concat(p4);
            uv = uv.concat(uv4);
            gl.uniform4f(u_FragColor, 1, 1, 1, 1);
            draw_triangle_3dUV_Normal(v, uv, v);

            v = [];
            uv = [];
            v = v.concat(p1);
            uv = uv.concat(uv1);
            v = v.concat(p4);
            uv = uv.concat(uv4);
            v = v.concat(p3);
            uv = uv.concat(uv3);
            gl.uniform4f(u_FragColor, 1, 1, 1, 1);
            draw_triangle_3dUV_Normal(v, uv, v);
        }
      }

    }
} 
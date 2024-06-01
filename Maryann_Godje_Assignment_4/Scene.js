function drawFloorandSky(){
    // Floor
    var floor = new Cube();
    floor.color = [1.0, 1.0, 1.0, 1.0];
    // https://free-images.com/display/blue_jay_bird_nature.html
    floor.textureNum = 2;
    floor.matrix.translate(0.45, -0.45, 0);
    floor.matrix.translate(-0.5, 0.0, -0.5);
    floor.matrix.scale(33, 0.1, 33);
    floor.render();

    // Sky
    var sky = new Cube();
    sky.color = [0.0, 0.0, 0.8, 1.0];
    // from Tutor Rohan - 05/10/2024
    if (g_normal_on == true) {
        sky.textureNum = -3;
    }
    else {
        sky.textureNum = 1;
    }
    sky.matrix.translate(0, 0, 0.6);
    sky.matrix.scale(-33, -33, -31);
    sky.render();

    // Light cube
    var light = new Cube();
    light.color = [2.0, 2.0, 0.0, 1.0];
    light.textureNum = -2;  
    light.matrix.translate(g_light_position[0], g_light_position[1], g_light_position[2]);
    light.matrix.scale(0.04, 0.04, 0.04);
    light.render();

    // Sphere
    var sphere = new Sphere();
    sphere.color = [0.0, 0.5, 0.0, 1.0]; 
    sphere.textureNum = -2;  
    sphere.matrix.translate(0.8, 0.1, 0.0); 
    sphere.matrix.scale(0.4, 0.4, 0.4);
    sphere.render();

    // Cube
    var cube = new Cube();
    cube.color = [0.5, 0.4, 0.9, 1.0]; 
    cube.textureNum = -2;  
    cube.matrix.translate(-0.8, 0.0, 0.0); 
    cube.matrix.scale(0.3, 0.3, 0.3);
    cube.render();
}


function drawWalls() {
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 32; j++) {
            for (var k = 0; k < 32; k++) {
                if (g_map[j][k] == 1) {
                    var wall = new Cube();
                    wall.color = [1.0, 0.0, 0.0, 1.0];
                    wall.textureNum = -2;
                    wall.matrix.translate(j-16, 0.5, k-16);
                    wall.render();
                }
            }
        }
    }
}
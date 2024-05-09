function drawFloorandSky(){
    // Floor
    var floor = new Cube();
    floor.color = [1.0, 1.0, 1.0, 1.0];
    floor.textureNum = -2;
    floor.matrix.translate(0.45, -0.45, 0);
    floor.matrix.translate(-0.5, 0.0, -0.5);
    floor.matrix.scale(10, 0.1, 10);
    floor.render();

    // Sky
    var sky = new Cube();
    sky.color = [0.0, 0.0, 0.8, 1.0];
    sky.textureNum = 1;
    sky.matrix.translate(0, 0, 0.6);
    sky.matrix.scale(10, 10, 8);
    sky.render();
}
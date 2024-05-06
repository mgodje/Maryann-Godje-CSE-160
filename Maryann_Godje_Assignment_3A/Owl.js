function drawOwl(){
    // left leg
    var left_leg = new Cube();
    // RBG target - medium brown
    left_leg.color =  [0.6, 0.49, 0.4, 1.0];
    //[0.5, 0.49, 0.4, 1.0];
    left_leg.matrix.translate(-0.25/2, -0.75/4, 0.0);
    left_leg.matrix.scale(0.25/8, 0.15/1.25, 0.25/6);
    left_leg.render();

    // right leg
    var right_leg = new Cube();
    // RBG target - medium brown
    right_leg.color = [0.6, 0.49, 0.4, 1.0];
    right_leg.matrix.translate((-0.25/2) + 0.125, -0.75/4, 0.0);
    right_leg.matrix.scale(0.25/8, 0.15/1.25, 0.25/6);
    right_leg.render();

    // body
    var body = new Cube();
    // RGB target for light yellow - 171, 165, 145
    body.color = [0.7, 0.69, 0.5, 1.0];
    body.matrix.translate(-0.25/4, -0.20/4, 0.0);
    body.matrix.translate(0, -0.4/4, 0);
    // body.matrix.rotate(-g_joint1, 0, 0, 1);
    body.matrix.translate(0, 0.4/4, 0);
    var body_coordinates = new Matrix4(body.matrix);
    body.matrix.scale(0.2/2, 0.4/3, 0.255/5);
    body.render();

    // head
    var head = new Cube();
    // RBG target for darker yellow
    head.color = [0.5, 0.49, 0.3, 1.0];
    head.matrix = body_coordinates;
    head.matrix.translate(0, 0.450002/4, 0.0); 
    head.matrix.translate(0, -0.07/4, 0)
    head.matrix.rotate(-45, 0, 0, 1);                       // -g.joint1
    //box.matrix.translate(-0.25, 0.0, 0.0);
    head.matrix.translate(0, 0.07/4, 0)
    var head_coordinates1 = new Matrix4(head.matrix);
    head.matrix.scale(0.15, 0.12, 0.26/5); 
    head.render();

    // right ear
    var right_ear = new Cube();
    right_ear.color = [0.5, 0.39, 0.32, 1.0];
    right_ear.matrix = head_coordinates1;
    right_ear.matrix.translate(-0.05, 0.05, 0.0);
    right_ear.matrix.rotate(-30, 0, 0, 1);           // -g.joint2
    right_ear.matrix.translate(0.15, 0.05, 0.0);
    right_ear_coordinates = new Matrix4(right_ear.matrix);
    right_ear.matrix.scale(0.03, 0.15, 0.05);
    right_ear.render();

    // left ear
    var left_ear = new Cube();
    left_ear.color = [0.5, 0.39, 0.32, 1.0];
    left_ear.matrix = right_ear_coordinates;
    left_ear.matrix.translate(0.05, -0.05, 0.0);
    left_ear.matrix.rotate(-10, 0, 0, 1);          // -g.joint2
    left_ear.matrix.translate(-.25, 0.05, 0.0);
    var left_ear_coordinates = new Matrix4(left_ear.matrix);    
    left_ear.matrix.scale(0.03, 0.15, 0.05);
    left_ear.render();

    // right eye
    var right_eye = new Cube();
    right_eye.color = [0.05, 0.05, 1.0, 1.0];
    right_eye.matrix = left_ear_coordinates;
    right_eye.matrix.translate(0.02, -0.05, -0.05);
    right_eye_coordinates = new Matrix4(right_eye.matrix);
    right_eye.matrix.scale(0.03, 0.03, 0.03);
    right_eye.render();

    // left eye
    var left_eye = new Cube();
    left_eye.color = [0.05, 0.05, 1.0, 1.0];
    left_eye.matrix = right_eye_coordinates;
    left_eye.matrix.translate(0.155, 0, 0.0);
    left_eye_coordinates = new Matrix4(left_eye.matrix);
    left_eye.matrix.scale(0.03, 0.03, 0.03);
    left_eye.render();

    // beak
    var beak = new Cube();  
    beak.color = [0.8, 0.65, 0.05, 1.0];
    beak.matrix = left_eye_coordinates;
    beak.matrix.translate(0.0, -0.02, 0.0);
    beak.matrix.rotate(15, 1, 0, 0);
    beak.matrix.translate(-0.08, -0.09, 0.0);
    beak.matrix.scale(0.01, 0.04, 0.03);
    beak.render();

    // left wing
    var left_wing = new Cube(); 
    left_wing.color = [0.6, 0.59, 0.4, 1.0];
    left_wing.matrix.translate(0.07, 0, 0.0);
    left_wing.matrix.rotate(-15, 0, 0, 1);              // -g.joint3
    left_wing.matrix.translate(-0.25, -0.15, 0.0);
    left_wing.matrix.scale(0.03, .08, 0.07)
    left_wing.render();

    // right wing
    var left_wing = new Cube(); 
    left_wing.color = [0.6, 0.59, 0.4, 1.0];
    left_wing.matrix.translate(0.07, 0, 0.0);
    left_wing.matrix.rotate(-15, 0, 0, 1);              // -g.joint4
    left_wing.matrix.translate(-0.01, -0.15, 0.0);
    left_wing.matrix.scale(0.03, .08, 0.07)
    left_wing.render();

    // log
    var log = new Cube();
    // RGB target for brown - 66, 50, 21
    log.color = [0.3, 0.19, 0.12, 1.0];
    log.matrix.translate(.225, 0, 0);
    log.matrix.translate(-0.25/2, -0.75/4, 0.0);
    log.matrix.translate(-0.25/1.5, -0.75/5, 0.0);
    log.matrix.scale(0.2, 0.035, 0.25/4)
    log.render();
 }
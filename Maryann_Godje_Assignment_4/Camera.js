class Camera{
    constructor(){
       this.fov = 60;
       this.eye = new Vector3([0, 0, -1.5]);
       this.at  = new Vector3([0, 0, -1]);
       this.up  = new Vector3([0, 1, 0]);
       this.viewMatrix = new Matrix4();
       this.viewMatrix.setLookAt(
          this.eye.elements[0], this.eye.elements[1],  this.eye.elements[2],
          this.at.elements[0],  this.at.elements[1],   this.at.elements[2],
          this.up.elements[0],  this.up.elements[1],   this.up.elements[2]
        ); 
       this.projMat = new Matrix4();
       this.projMat.setPerspective(50, canvas.width/canvas.height, 0.1, 1000);
    }

    updateView(){
         this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1],  this.eye.elements[2],
            this.at.elements[0],  this.at.elements[1],   this.at.elements[2],
            this.up.elements[0],  this.up.elements[1],   this.up.elements[2]
         ); 
      }

    moveForward(){
       let look = new Vector3();
       look.set(this.at);
       look.sub(this.eye);
       look.normalize();
       look.mul(0.2);
       this.eye.add(look);
       this.at.add(look);
       this.updateView();
    }

    moveBackward(){
       let look = new Vector3();
       look.set(this.at);
       look.sub(this.eye);
       look.normalize();
       look.mul(-0.2);
       this.eye.add(look);
       this.at.add(look);
       this.updateView();
    }

    moveRight(){
       let look = new Vector3();
       look.set(this.at);
       look.sub(this.eye);
       look = Vector3.cross(look, this.up);
       //look.cross(this.up);
       look.normalize();
       look.mul(0.2);
       this.eye.add(look);
       this.at.add(look);
       this.updateView();
    }   

    moveLeft(){
       let look = new Vector3();
       look.set(this.at);
       look.sub(this.eye);
       look = Vector3.cross(look, this.up);
       //look.cross(this.up);
       look.normalize();
       look.mul(-0.2);
       this.eye.add(look);
       this.at.add(look);
       this.updateView();
    }

    panLeft(){
       let look = new Vector3();
       look.set(this.at);
       look.sub(this.eye);
       look = Vector3.cross(look, this.up);
       //look.cross(this.up);
       look.normalize();
       this.at.sub(look);
       this.updateView();
    }

    panRight(){
       let look = new Vector3();
       look.set(this.at);
       look.sub(this.eye);
       look = Vector3.cross(look, this.up);
       //look.cross(this.up);
       look.normalize();
       this.at.add(look);
       this.updateView();
    }
}
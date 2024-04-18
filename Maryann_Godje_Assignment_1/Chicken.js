// used Tutor Rohan Venkatapuram's Squirtle Class as a reference for my Chicken Class
    // https://people.ucsc.edu/~rnvenkat/asgn1/asgn1.html
// However, I didn't have enough time to complete it
    // So, I'm just leaving it here for another time. 

/*class Chicken {
    constructor() {
      this.type='chicken';
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 2.0;
      this.segments = 10;
    }

    // constructor(color, pos, size, seg)
  
    render() {
        let [x,y] = this.position;
        // var rgba = this.color;
        // var size = this.size;

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        
        let body_color = "yellow";
        let head_color = "yellow";
        let eye_color = "black";
        let wing_color = "orange";
        let hat_base_color = "purple";
        let hat_top_color = "pink";
        let pant_belt_color = "blue";
        let pant_leg_right_color = "blue";
        let pant_leg_left_color = "blue";
        let shoe_right_color = "green";
        let shoe_left_color = "green";

         // points:
        let body_center = [0,0];
        let body_left = [-4,0];
        let body_right = [4,0];
        let body_up = [0,4];
        let body_down = [0,-4];

        let head_center = [0,4];
        let head_left = [-2,4];
        let head_right = [2,4];
        let head_up = [0,6];
        let head_down = [0,2]; 

        let eye_center = [0.5,5];
        let eye_left = [0,5];
        let eye_right = [1,5];
        let eye_up = [0.5,5.5];
        let eye_down = [0.5,4.5];

        let wing1 = [0.8,0.4];
        let wing2 = [0.8,-2];
        let wing3 = [2,-2];

        let belt1 = [-2.4,-3.2];
        let belt2 = [2.4, -4.8];
        let belt3 = [2.4,-3.2];
        let belt4 = [-2.4, -4.8];

        let right_leg1 = [2.4, -4.8];
        let right_leg2 = [1.2, -4.8];
        let right_leg3 = [1.2, -7.4];
        let right_leg4 = [2.4, -7.4];

        let left_leg1 = [-2.4, -4.8]
        let left_leg2 = [-1.2, -4.8];
        let left_leg3 = [-1.2, -7.4];
        let left_leg4 = [-2.4, -7.4];

        let right_shoe1 = [1.2, -7.4];
        let right_shoe2 = [1.2,-8];
        let right_shoe3 = [3, -7.4];
        let right_shoe4 = [3,-8];

        let left_shoe1 = [-2.4, -8];
        let left_shoe2 = [-2.4, -7.4];
        let left_shoe3 = [-0.6, -7.4];
        let left_shoe4 = [-0.6, -8];

        let hat_base1 = [-1,6];
        let hat_base2 = [1,6];
        let hat_base3 = [-1,6.5];
        let hat_base4 = [1,6.5];

        let hat_top1 = [-0.5,6.5];
        let hat_top2 = [0.5,6.5];
        let hat_top3 = [-0.5,7.5];
        let hat_top4 = [0.5,7.5];

        let all_points = [body_center, body_down, body_left, body_right, body_up, head_center, head_down, head_left, head_right, head_up,
        eye_center, eye_down, eye_left, eye_right, eye_up, wing1, wing2, wing3, belt1, belt2, belt3, belt4, 
        right_leg1, right_leg2, right_leg3, right_leg4, left_leg1, left_leg2, left_leg3, left_leg4, right_shoe1, right_shoe2, 
        right_shoe3, right_shoe4, left_shoe1, left_shoe2, left_shoe3, left_shoe4, hat_base1, hat_base2, hat_base3, hat_base4, 
        hat_top1, hat_top2, hat_top3, hat_top4];

        // First, scale the points in size and move
        for (let i = 0; i < all_points.length; i++) {
            let point = all_points[i];
            point[0] = point[0] / 15 * mult + x;
            point[1] = point[1] / 15 * mult + y;
        }

        // ...

        this.gl.disableVertexAttribArray(a_Position);

        // ...
      }
    }
}*/
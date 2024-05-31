import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
// import GUI from 'lil-gui'

// const gui = new GUI()

function main() {
	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 2;

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 0, 0 );
	controls.update();

	const scene = new THREE.Scene();

	const loader = new THREE.TextureLoader();

	const texture_sheep = loader.load( './sheep.jpg' );
	texture_sheep.colorSpace = THREE.SRGBColorSpace;

	// set up cube dimensions
	let boxWidth = 0.1;
	let boxHeight = 0.1;
	let boxDepth = 0.1;

	// set up sphere dimensions
	let sphereRadius = 0.5;
	let spehereSegments = 32;
	let sphereHeight = 32;

	// set up cylinder dimensions
	let cylinderTopRadius = 0.5;
	let cylinderBottomRadius = 0.5;
	let cylinderHeight = 0.5;
	let cylinderRadialSegments = 32;

	const geometry_cube = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
	// how to generate a sphere: https://threejs.org/docs/#api/en/geometries/SphereGeometry
	const geometry_sphere = new THREE.SphereGeometry(sphereRadius, spehereSegments, sphereHeight);
	// how to generate a cylinder: https://threejs.org/docs/#api/en/geometries/CylinderGeometry
	const geometry_cylinder = new THREE.CylinderGeometry(cylinderTopRadius, cylinderBottomRadius, cylinderHeight, cylinderRadialSegments);

	/* 
		Lights
	*/
	// Directional Light
	const color = 0xFFFFFF;
	const intensity = 3;
	const light = new THREE.DirectionalLight( color, intensity );
	light.position.set( - 1, 2, 4 );
	scene.add( light );

	// Ambient Light
	const ambientLight = new THREE.AmbientLight(0xffffff, 1)
	scene.add(ambientLight)

	// Hemisphere light
	const hemishpereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
	scene.add(hemishpereLight)

	// Point light
	const pointLight = new THREE.PointLight(0xff9000, 1.5)
	pointLight.position.set(0, 0, 0.5)
	scene.add(pointLight)

	// Tutor Rohan helped me reoragnize this function (04/24/2024)
	function loadObj( x, y ) {
		const mtlLoader = new MTLLoader();
		const objLoader = new OBJLoader();
		mtlLoader.load( './materials.mtl', ( mtl ) => {
			mtl.preload();
			mtl.wireframe = false;
			objLoader.setMaterials( mtl );
			objLoader.load( './model.obj', ( obj ) => {
				scene.add( obj );
				// how to scale in threejs: https://threejs.org/docs/#api/en/core/Object3D.scale
				obj.children[0].scale.set(0.5, 0.5, 0.5);
				obj.position.x = x;
				obj.position.y = y;
			} );
		} );
	}

	function makeShape( geometry, color, x ) {
		const material = new THREE.MeshPhongMaterial( { color } );
		const shape = new THREE.Mesh( geometry, material );
		scene.add( shape );

		shape.position.x = x;

		return shape;
	}

	function texturedSheep( geometry, texture_sheep, x ) {
		const material = new THREE.MeshBasicMaterial( {
			map: texture_sheep
		} );
		const obj_t = new THREE.Mesh( geometry, material );
		scene.add( obj_t );

		obj_t.position.x = x;

		return obj_t;
	}

	/*function texturedHen( geometry, texture_hen, x ) {
		const material = new THREE.MeshBasicMaterial( {
			map: texture_hen
		} );
		const obj_t = new THREE.Mesh( geometry, material );
		scene.add( obj_t );

		obj_t.position.x = x;

		return obj_t;
	}*/

	const shapes = [
		texturedSheep( geometry_sphere, texture_sheep, - 2 ),				//1
		// RGB: https://www.rapidtables.com/web/color/RGB_Color.html	
		// ctrl + shift + L to change name all at once
		makeShape( geometry_cylinder, 0xDEA2FF, 0 ),						//2
		makeShape( geometry_cube, 0x44aa88, 1),								//3
		makeShape( geometry_cube, 0xFFFFFF, 1.1),							//4
		makeShape( geometry_cube, 0x0011FF, 1.2),							//5
		makeShape( geometry_cube, 0x65db6f, 1.3),							//6
		makeShape( geometry_cube, 0xd71fde, 1.4),							//7
		makeShape( geometry_cube, 0xf0f71b, 1.5),							//8
		makeShape( geometry_cube, 0xcf850e, 1.6),							//9
		makeShape( geometry_cube, 0x0e41cf, 1.7),							//10
		makeShape( geometry_cube, 0x859ad6, 1.8),							//11
		makeShape( geometry_cube, 0x11F111, 1.9),							//12
		makeShape( geometry_cube, 0x5819a6, 2 ),							//13
		makeShape( geometry_cube, 0x9dcee3, 2.1 ),							//14		
		makeShape( geometry_cube, 0x1495cc, 2.2 ),							//15	
		makeShape( geometry_cube, 0xcc1414, 2.3 ),							//16
		makeShape( geometry_cube, 0xa732cf, 2.4 ),							//17
		makeShape( geometry_cube, 0x9dcf32, 2.5 ),							//18
		makeShape( geometry_cube, 0xb3b5b0, 2.6 ),							//19
		makeShape( geometry_cube, 0xa985d6, 2.7 ),							//20
		makeShape( geometry_cube, 0x8dd685, 2.8),							//21
		makeShape( geometry_cube, 0xd0d406, 2.9 ),							//22
		makeShape( geometry_cube, 0xAA8844, 3 ),							//23
		makeShape( geometry_cylinder, 0xDEFF00, -0.3),						//24
		makeShape( geometry_cylinder, 0xFFA200, 0.3),						//25
	];
	// because loadObj doesn't return anything, we can't add it to the shapes array
	// Tutor Rohan (04/24/2024)
	loadObj(2, 1.2);

	function render( time ) {
		time *= 0.001; // convert time to seconds
		shapes.forEach( ( cube, ndx ) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;

		} );

		renderer.render( scene, camera );

		requestAnimationFrame( render );
	}
	requestAnimationFrame( render );
}

main();
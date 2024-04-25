import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

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
	// scene.background = new THREE.Color( 'black' );

	const loader = new THREE.TextureLoader();

	const texture_sheep = loader.load( 'dist/sheep.jpg' );
	texture_sheep.colorSpace = THREE.SRGBColorSpace;

	const color = 0xFFFFFF;
	const intensity = 3;
	const light = new THREE.DirectionalLight( color, intensity );
	light.position.set( - 1, 2, 4 );
	scene.add( light );

	// set up cube dimensions
	let boxWidth = 0.5;
	let boxHeight = 0.5;
	let boxDepth = 0.5;

	// set up sphere dimensions
	let sphereRadius = 0.5;
	let spehereSegments = 32;
	let sphereHeight = 32;

	// set up cylinder dimensions
	let cylinderTopRadius = 0.75;
	let cylinderBottomRadius = 0.75;
	let cylinderHeight = 0.75;
	let cylinderRadialSegments = 32;

	const geometry_cube = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
	// how to generate a sphere: https://threejs.org/docs/#api/en/geometries/SphereGeometry
	const geometry_sphere = new THREE.SphereGeometry(sphereRadius, spehereSegments, sphereHeight);
	// how to generate a cylinder: https://threejs.org/docs/#api/en/geometries/CylinderGeometry
	const geometry_cylinder = new THREE.CylinderGeometry(cylinderTopRadius, cylinderBottomRadius, cylinderHeight, cylinderRadialSegments);

	// Tutor Rohan helped me reoragnize this function (04/24/2024)
	function loadObj( x, y ) {
		const mtlLoader = new MTLLoader();
		const objLoader = new OBJLoader();
		mtlLoader.load( 'dist/materials.mtl', ( mtl ) => {
			mtl.preload();
			mtl.wireframe = false;
			objLoader.setMaterials( mtl );
			objLoader.load( 'dist/model.obj', ( obj ) => {
				scene.add( obj );
				// how to scale in threejs: https://threejs.org/docs/#api/en/core/Object3D.scale
				obj.children[0].scale.set(0.5, 0.5, 0.5);
				obj.position.x = x;
				obj.position.y = y;
			} );
		} );
	}

	function makeCube( geometry, color, x ) {
		const material = new THREE.MeshPhongMaterial( { color } );
		const cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		cube.position.x = x;

		return cube;
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
		makeCube( geometry_cube, 0x44aa88, 2),
		texturedSheep( geometry_sphere, texture_sheep, - 2 ),
		// RGB: https://www.rapidtables.com/web/color/RGB_Color.html
		makeCube( geometry_cylinder, 0xDEA2FF, 0 ),
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
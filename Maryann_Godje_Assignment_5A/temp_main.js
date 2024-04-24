import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

//let OBJECTS = [];

const canvas = document.querySelector( '#c' );
const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

const controls = new OrbitControls( camera, canvas );

const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const texture = loader.load( 'sheep.jpg' );

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight( color, intensity );

const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

const material = new THREE.MeshBasicMaterial( {
	map: objLoader
} );

	// set up cube dimensions
	let boxWidth = 1;
	let boxHeight = 1;
	let boxDepth = 1;

	// set up sphere dimensions
	let sphereRadius = 1;
	let spehereSegments = 32;
	let sphereHeight = 32;

	// set up cylinder dimensions
	let cylinderTopRadius = 1;
	let cylinderBottomRadius = 1;
	let cylinderHeight = 1;
	let cylinderRadialSegments = 32;

    const geometry_cube = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
	// how to generate a sphere: https://threejs.org/docs/#api/en/geometries/SphereGeometry
	const geometry_sphere = new THREE.SphereGeometry(sphereRadius, spehereSegments, sphereHeight);
	// how to generate a cylinder: https://threejs.org/docs/#api/en/geometries/CylinderGeometry
	const geometry_cylinder = new THREE.CylinderGeometry(cylinderTopRadius, cylinderBottomRadius, cylinderHeight, cylinderRadialSegments);

const shapes = [
	makeCube( geometry_cube, objLoader, 2 ),
	texturedCube( geometry_sphere, texture, - 2 ),
	// RGB: https://www.rapidtables.com/web/color/RGB_Color.html
	makeObj( geometry_cylinder, 0xDEA2FF, 0 ),
];

function main() {

	SetUpCamera();

	SetUpControls();

	//const scene = new THREE.Scene();
	// scene.background = new THREE.Color( 'black' );

	//const loader = new THREE.TextureLoader();
	SetUpSheepTexture();

	SetUpColor();

	SetUpMLTLoader();

	render(10);
	
	requestAnimationFrame( render );
}

function SetUpCamera() {
	camera.position.z = 2;
}

function SetUpControls() {	
	controls.target.set( 0, 0, 0 );
	controls.update();
}

function SetUpSheepTexture() {
	texture.colorSpace = THREE.SRGBColorSpace;
}

function SetUpColor() {
	light.position.set( - 1, 2, 4 );
	scene.add( light );	
}

function SetUpMLTLoader() {
	mtlLoader.load( 'Mesh_Hen.mtl', ( mtl ) => {
		mtl.preload();
		objLoader.setMaterials( mtl );
		objLoader.load( 'Mesh_Hen.obj');
		} );
}

function makeObj( geometry, objLoader, x ) {
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	//OBJECTS.push(cube);
	cube.position.x = x;

	return cube;
}

function makeCube( geometry, color, x ) {
	const material = new THREE.MeshPhongMaterial( { color } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	cube.position.x = x;

	return cube;
}

function texturedCube( geometry, texture, x ) {
	const material = new THREE.MeshBasicMaterial( {
		map: texture
	} );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	cube.position.x = x;

	return cube;
}

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

main();


import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

let OBJECTS = [];

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

	const texture = loader.load( 'sheep.jpg' );
	texture.colorSpace = THREE.SRGBColorSpace;

	const color = 0xFFFFFF;
	const intensity = 3;
	const light = new THREE.DirectionalLight( color, intensity );
	light.position.set( - 1, 2, 4 );
	scene.add( light );	

	const mtlLoader = new MTLLoader();
	const objLoader = new OBJLoader();
	mtlLoader.load( 'Mesh_Hen.mtl', ( mtl ) => {
		mtl.preload();
		objLoader.setMaterials( mtl );
		objLoader.load( 'Mesh_Hen.obj');
		} );

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

	function makeObj( geometry, objLoader, x ) {
		const material = new THREE.MeshBasicMaterial( {
			map: objLoader
		} );

		const cube = new THREE.Mesh( geometry, material );
		scene.add( cube );
		OBJECTS.push(cube);
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

	const cubes = [
		makeCube( geometry, 0x44aa88, 0 ),
		texturedCube( geometry, texture, - 2 ),
		makeObj( geometry, objLoader, 2 ),
	];

	function render( time ) {
		time *= 0.001; // convert time to seconds
		cubes.forEach( ( cube, ndx ) => {

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


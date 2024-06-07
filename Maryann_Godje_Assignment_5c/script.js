import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import GUI from 'lil-gui'

// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

// Font
// https://dustinpfister.github.io/2023/07/05/threejs-text-geometry/
// https://threejs.org/docs/#examples/en/geometries/TextGeometry

const fontLoader = new FontLoader();

fontLoader.load( 'node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
	const text = new TextGeometry( 'Haunted House', {
		font: font,
		size: 100,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
    const textMaterial = new THREE.MeshLambertMaterial({ color: '#E7FF0A' })
    const textMesh = new THREE.Mesh(text, textMaterial)

    text.center();
    textMesh.scale.set(0.01, 0.01, 0.01);
    textMesh.position.y = 4.5;
    scene.add(textMesh);
} );

// Textures
const textureLoader = new THREE.TextureLoader()

// Door textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg') 
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
doorAlphaTexture.colorSpace = THREE.SRGBColorSpace
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
doorAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
doorHeightTexture.colorSpace = THREE.SRGBColorSpace
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
doorNormalTexture.colorSpace = THREE.SRGBColorSpace
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
doorMetalnessTexture.colorSpace = THREE.SRGBColorSpace
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace

// Bricks textures
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
bricksAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
bricksNormalTexture.colorSpace = THREE.SRGBColorSpace
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
bricksRoughnessTexture.colorSpace = THREE.SRGBColorSpace

// Grass textures
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
grassAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
grassNormalTexture.colorSpace = THREE.SRGBColorSpace
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
grassRoughnessTexture.colorSpace = THREE.SRGBColorSpace

grassColorTexture.wrapS = THREE.RepeatWrapping    
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// House
const house = new THREE.Group() 
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
     })
)
walls.position.y = 2.5 / 2
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
     })
)
door.position.z = 2 + 0.01
door.position.y = 1
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)    
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
house.add(bush1)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
house.add(bush2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
house.add(bush3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
house.add(bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Lights

// Ambient light
const ambientLight = new THREE.AmbientLight('#FFBABA', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight('#F7440E', 3, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

// Spooky Lighting
const red_color = new THREE.PointLight('#FF0000', 6, 3)
scene.add(red_color)

const orange_color = new THREE.PointLight('#FF8C00', 6, 3)
scene.add(orange_color)

const gold_color = new THREE.PointLight('#C6A212', 6, 3)
scene.add(gold_color)

// Sizing
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    const red_angle = elapsedTime * 0.5
    red_color.position.x = Math.cos(red_angle) * 4
    red_color.position.z = Math.sin(red_angle) * 4
    red_color.position.y = Math.sin(elapsedTime * 3)

    const orange_angle = - elapsedTime * 0.32
    orange_color.position.x = Math.cos(orange_angle) * 5
    orange_color.position.z = Math.sin(orange_angle) * 5
    orange_color.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5) 

    const gold_angle = - elapsedTime * 0.18
    gold_color.position.x = Math.cos(gold_angle) * (7 * Math.sin(elapsedTime * 0.32))
    gold_color.position.z = Math.sin(gold_angle) * (7 * Math.sin(elapsedTime * 0.5))
    gold_color.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
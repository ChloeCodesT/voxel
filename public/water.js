import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.PlaneGeometry( 2, 2, 2 );
const material = new THREE.MeshBasicMaterial( {color: 0x0e87cc, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const planeFolder = gui.addFolder('plane')
planeFolder.add(plane.scale, 'x', 0, 5)
planeFolder.add(plane.scale, 'y', 0, 5)
planeFolder.add(plane.scale, 'z', 0, 5)
planeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()
const a = new THREE.Vector3(0, 1, 0)
const b = new THREE.Vector3()
const d = a.distanceTo(b)

function animate() {
    requestAnimationFrame(animate)
    plane.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01
            child.rotation.y += 0.01
            child.rotation.z += 0.01
        }
    })
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
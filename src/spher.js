import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// scene 
const scene = new THREE.Scene();
// size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83"
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// light
const light = new THREE.PointLight(0x0000ff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// animation loop
function animate() {
    controls.update();
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// resize handling
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

// timeLine magic 
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
tl.fromTo("nav" ,{y:"-100%"},{y:"o%"})
tl.fromTo(".title" , {opacity:0} , {opacity:1})
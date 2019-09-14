console.log("Connected");

const num = 30;
const objects = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let light, t;

// create camera to move w/in scene - panning, tilting, moving
// 1st attr - field of view; 2nd - aspect ratio; 3rd/4th - near and far clipping planes
let camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// create a scene to contain all objects
const scene = new THREE.Scene();

// create renderer - handles drawing the scene to the canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create spotlight - gives position and directional properties and allow shadows
light = new THREE.SpotLight(0xccddff, 0.8);
light.position.set(0, 0, 5);
scene.add(light);

// create animation loop (ideally 60fps), bind to the requestAnimationFrame function
// ensures browser is ready to render the next frame
// animations can pause rendering when User stops viewing the tab
const animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// start animation loop
animate();

// load ground texture
const texture = new THREE.TextureLoader().load("../img/arrow-pavement.jpg");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(12, 12);
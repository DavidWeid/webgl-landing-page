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
const texture = new THREE.TextureLoader().load("img/arrow-pavement.jpg");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(12, 12);

// create ground material
material = new THREE.MeshPhysicalMaterial({ map: texture, bumpMap: texture });

// create ground mesh
const geometry = new THREE.PlaneBufferGeometry(100, 100);
const ground = new THREE.Mesh(geometry, material);
ground.rotation.z = (Math.PI / 180) * -45;
ground.rotation.x = (Math.PI / 180) * -90;
ground.position.y = -2.0;
scene.add(ground);

// load object texture - add central 3D obj for focal interest
const texture = new THREE.TextureLoader().load("img/rock-surface.jpg");

// create an environment around object to be reflected on its surface
// use CubeTextureLoader - six images that form a cube map
const envMap = new THREE.CubeTextureLoader()
  .setPath("img/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

// create tetrahedron
const geometry = new THREE.TetrahedronBufferGeometry(2, 0);
const material = new THREE.MeshPhysicalMaterial({
  map: texture,
  envMap: envMap,
  metalness: 1.0,
  roughness: 0.0
});
t = new THREE.Mesh(geometry, material);
t.rotation.x = (Math.PI / 180) * -10;
scene.add(t);

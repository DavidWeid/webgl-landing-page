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
  t.rotation.y -= 0.005;
  camera.lookAt(t.position);
  renderer.render(scene, camera);

  for (let i = 0; i <= num; i++) {
    const o = objects[i];
    o.rotation.y += 0.01;
    if (i % 2 == 0) {
      o.radians += 0.005;
      o.radians2 += 0.005;
    } else {
      o.radians -= 0.005;
      o.radians2 -= 0.005;
    }
    o.position.x = Math.cos(o.radians) * o.distance;
    o.position.z = Math.sin(o.radians) * o.distance;
    o.position.y = Math.sin(o.radians2) * o.distance * 0.5;
  }
};

// load ground texture
const texture = new THREE.TextureLoader().load("img/arrow-pavement.jpg");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(12, 12);

// create ground material
const material = new THREE.MeshPhysicalMaterial({
  map: texture,
  bumpMap: texture
});

// create ground mesh
const geometry = new THREE.PlaneBufferGeometry(100, 100);
const ground = new THREE.Mesh(geometry, material);
ground.rotation.z = (Math.PI / 180) * -45;
ground.rotation.x = (Math.PI / 180) * -90;
ground.position.y = -2.0;
scene.add(ground);

// load object texture - add central 3D obj for focal interest
const objTexture = new THREE.TextureLoader().load("img/rock-surface.jpg");

// create an environment around object to be reflected on its surface
// use CubeTextureLoader - six images that form a cube map
const envMap = new THREE.CubeTextureLoader()
  .setPath("img/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

// create tetrahedron
const tetraGeometry = new THREE.TetrahedronBufferGeometry(2, 0);
const tetraMaterial = new THREE.MeshPhysicalMaterial({
  map: objTexture,
  envMap: envMap,
  metalness: 1.0,
  roughness: 0.0
});
t = new THREE.Mesh(tetraGeometry, tetraMaterial);
t.rotation.x = (Math.PI / 180) * -10;
scene.add(t);

// loop particles
for (let i = 0; i <= num; i++) {
  // create new mesh
  const geometry = new THREE.SphereBufferGeometry(0.1, 6, 6);
  const material = new THREE.MeshPhysicalMaterial({
    envMap: envMap,
    metalness: 1.0
  });
  const particle = new THREE.Mesh(geometry, material);

  // set random position
  particle.position.set(Math.random() * 100 - 50, 0, Math.random() * -10);
  // calc distance as constant and assign
  const a = new THREE.Vector3(0, 0, 0);
  const b = particle.position;
  var d = a.distanceTo(b);
  particle.distance = d;

  //define 2 random, constant angles
  particle.radians = (Math.random() * 360 * Math.PI) / 180;
  particle.radians2 = (Math.random() * 360 * Math.PI) / 180;

  // add object to scene
  scene.add(particle);
  // add to collection
  objects.push(particle);
}

// start animation loop
animate();

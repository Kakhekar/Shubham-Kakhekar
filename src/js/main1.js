// Import the THREE.js library
// import * as THREE from "../../node_modules/three/build/three.module.js";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
// import * as dat from "../../node_modules/dat.gui";
import * as dat from 'https://cdn.skypack.dev/dat.gui@0.7.7';


// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// URL for the laptop model
const laptopUrl = new URL('../models/laptop.obj', import.meta.url);
const womenUrl = new URL('../models/uploads_files_3248276_UMesh_PM3D_Sphere3D_3.OBJ', import.meta.url);

// Initialize variables
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let isMousePressed = false;
let initialRotation = { x: 0, y: 0 };

// Set which object to render
const objToRender = 'eye';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 0, 0) // Adjust the camera position based on your scene

// Load OBJ model
const objLoader = new OBJLoader();
let laptop;

// Object to store parameters
const gui = new dat.GUI();
var guiParams = {
  positionX: 10,
  positionY: -33,
  positionZ: 50,
  scaleX: 0.15,
  scaleY: 0.15,
  scaleZ: 0.15,
  rotationY: Math.PI / 4,
  color: new THREE.Color(0xff0000), // Default color is red
};

//plane at bottom as ground here
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshBasicMaterial({ opacity: 1, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
ground.receiveShadow = true;
ground.position.set(0, -105, 0);
scene.add(ground);

// Load GLTF model
const gltfLoader = new GLTFLoader();
// main background here
let object;

gltfLoader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.scale.set(100, 100, 100);

    // Create a ground plane


    // Set the position of the 3D model
    object.position.y = 50; // Adjust this value to position the model above the ground

    // Add the 3D model to the scene
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Load the Laptop object
objLoader.load(
  laptopUrl.href,
  function (obj) {
    laptop = obj;

    // Apply initial transformations
    laptop.position.set(guiParams.positionX, guiParams.positionY, guiParams.positionZ);
    laptop.scale.set(guiParams.scaleX, guiParams.scaleY, guiParams.scaleZ);
    laptop.rotation.set(0, guiParams.rotationY, 0);
    laptop.traverse((child) => {
      if (child.isMesh) {
        child.material.color = guiParams.color;
      }
    });
    scene.add(laptop);

    // Create GUI controls
    var folder = gui.addFolder('Laptop Parameters');
    folder.add(guiParams, 'positionX', -50, 50).onChange(updateObject);
    folder.add(guiParams, 'positionY', -50, 50).onChange(updateObject);
    folder.add(guiParams, 'positionZ', -50, 50).onChange(updateObject);
    folder.add(guiParams, 'scaleX', 0.01, 1).onChange(updateObject);
    folder.add(guiParams, 'scaleY', 0.01, 1).onChange(updateObject);
    folder.add(guiParams, 'scaleZ', 0.01, 1).onChange(updateObject);
    folder.add(guiParams, 'rotationY', 0, Math.PI * 2).onChange(updateObject);
    folder.addColor(guiParams, 'color').onChange(updateguiParam);

    function updateObject() {
      laptop.position.set(guiParams.positionX, guiParams.positionY, guiParams.positionZ);
      laptop.scale.set(guiParams.scaleX, guiParams.scaleY, guiParams.scaleZ);
      laptop.rotation.set(0, guiParams.rotationY, 0);
    }
    function updateguiParam() {
      laptop.traverse((child) => {
        if (child.isMesh) {
          child.material.color = guiParams.color;
        }
      });
    }

  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// telephone object here

// let women;

// objLoader.load(


//   womenUrl.href,
//   function (obj) {
//     women = obj;
//     const womenParams = {
//       positionX: -19.5,
//       positionY: -22,
//       positionZ: -50,
//       scaleX: 5,
//       scaleY: 5,
//       scaleZ: 5,
//       rotationX: 0,
//       rotationY: 0,
//       rotationZ: 0,
//       color: new THREE.Color(0xff0000), // Default color is red
//     };
//     // Apply initial transformations
//     women.position.set(womenParams.positionX, womenParams.positionY, womenParams.positionZ);
//     women.scale.set(womenParams.scaleX, womenParams.scaleY, womenParams.scaleZ);
//     women.rotation.set(womenParams.rotationX, womenParams.rotationY, womenParams.rotationZ);
//     women.traverse((child) => {
//       if (child.isMesh) {
//         child.material.color = womenParams.color;
//       }
//     });

//     scene.add(women);

//     // Create GUI controls for women model
//     const womenFolder = gui.addFolder('phone');
//     womenFolder.add(womenParams, 'positionX', -50, 50).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'positionY', -50, 50).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'positionZ', -50, 50).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'scaleX', 0.01, 5).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'scaleY', 0.01, 5).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'scaleZ', 0.01, 5).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'rotationX', -Math.PI, Math.PI).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'rotationY', -Math.PI, Math.PI).onChange(updateWomenObject);
//     womenFolder.add(womenParams, 'rotationZ', -Math.PI, Math.PI).onChange(updateWomenObject);
//     womenFolder.addColor(womenParams, 'color').onChange(updateWomenColor);

//     function updateWomenObject() {
//       women.position.set(womenParams.positionX, womenParams.positionY, womenParams.positionZ);
//       women.scale.set(womenParams.scaleX, womenParams.scaleY, womenParams.scaleZ);
//       women.rotation.set(womenParams.rotationX, womenParams.rotationY, womenParams.rotationZ);
//     }

//     function updateWomenColor() {
//       women.traverse((child) => {
//         if (child.isMesh) {
//           child.material.color = womenParams.color;
//         }
//       });
//     }
//   },
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
//   },
//   function (error) {
//     console.error(error);
//   }
// );



// Banner
const textureLoader = new THREE.TextureLoader();
//akatski
const bannerTexture = textureLoader.load('models/peakpx.jpg');
const bannerMaterial = new THREE.MeshBasicMaterial({ map: bannerTexture });
const bannerGeometry = new THREE.PlaneGeometry(200, 100); // Adjust the size as needed
const banner = new THREE.Mesh(bannerGeometry, bannerMaterial);
banner.position.set(0, 50, -214); // Adjust the position as needed
banner.scale.set(1.3, 1.8, 2);

scene.add(banner);

//kakhekar
const bannerTextur = textureLoader.load('models/Kakhekar.png');
const bannerMateria = new THREE.MeshBasicMaterial({ map: bannerTextur });
const bannerGeometr = new THREE.PlaneGeometry(200, 100); // Adjust the size as needed
const banne = new THREE.Mesh(bannerGeometr, bannerMateria);
banne.position.set(-230, 50, 10); // Adjust the position as needed
banne.rotation.y = Math.PI / 2;
banne.scale.set(1, 1, 1);
scene.add(banne);




// Create lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

// Create renderer
const canvas = document.querySelector('.ThreeJSstructures');
const renderer = new THREE.WebGL1Renderer({ canvas });

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add renderer to the DOM
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// Enable orbit controls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.minDistance = 0; // Set the minimum allowed distance for zoom-out
controls.maxDistance = 300;
// Set maximum and minimum vertical rotation angles (in radians)
controls.minPolarAngle = Math.PI / 6; // 30 degrees
controls.maxPolarAngle = Math.PI / 2; // 90 degrees

// //Set maximum and minimum horizontal rotation angles (in radians)
// controls.minAzimuthAngle = -Math.PI / 4; // -45 degrees
// controls.maxAzimuthAngle = Math.PI / 4;  // 45 degrees



// //vidyadhar's code 
document.addEventListener("DOMContentLoaded", function () {
  // Your script here
  const homeMenu = document.getElementById('homeMenu');
  const aboutMenu = document.getElementById('aboutMenu');
  const serviceMenu = document.getElementById('serviceMenu');

  homeMenu.addEventListener('click', function (e) {
    gsap.to(camera.position, {
      x: 300,
      y: 0,
      z: 0,
      duration: 1.5,
      onUpdate: function () {
        camera.lookAt(0, 300, 0);
        // renderer.render(scene, camera);
      }
    })
  })
  aboutMenu.addEventListener('click', function (e) {
    gsap.to(camera.position, {
      x: -30,
      y: 0,
      z: 0,
      duration: 1.5,
      onUpdate: function () {
        // Use the lookAt function properly
        const lookAtPosition = new THREE.Vector3(100, 0, 100);
        camera.lookAt(lookAtPosition);
      }
    });
  });



  serviceMenu.addEventListener('click', function (e) {
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 15,
      duration: 1.5,
      onUpdate: function () {
        camera.lookAt(0, 0, 0);
      }
    })
  })


  let isZooming = false;

  function handleWheel(e) {
    if (isZooming) return;

    const delta = e.deltaY || e.detail || e.wheelDelta;
    const zoomAmount = delta > 0 ? 1 : -1; // Adjust as needed

    isZooming = true;

    gsap.to(camera.position, {
      x: camera.position.x + zoomAmount * 0, // Adjust zoom speed
      y: camera.position.y + zoomAmount * 0,
      z: camera.position.z + zoomAmount * 5,
      duration: 1.0,
      onUpdate: function () {
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      },
      onComplete: function () {
        isZooming = false;
      }
    });

    // Prevent the default scroll behavior
    e.preventDefault();
  }

  window.addEventListener('wheel', handleWheel, { passive: false });
});


// Render the scene
function animate() {
  requestAnimationFrame(animate);

  if (!isMousePressed && object && objToRender === "eye") {
    // Only use OrbitControls when the mouse is not pressed
    controls.update();
  }

  // if (isMousePressed && object2) {
  //   const deltaX = (mouseX - window.innerWidth / 2) / window.innerWidth * 3;
  //   const deltaY = (mouseY - window.innerHeight / 2) / window.innerHeight * 2.5;

  //   object2.rotation.y = initialRotation.y + deltaX;
  //   object2.rotation.x = Math.max(-1.2, Math.min(initialRotation.x + deltaY, 1.2));
  // }

  renderer.render(scene, camera);
}


// Handle window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle mouse events
document.addEventListener("mousedown", function () {
  isMousePressed = true;

  if (object && objToRender === "eye") {
    initialRotation.x = object.rotation.x;
    initialRotation.y = object.rotation.y;
  }
});

document.addEventListener("mouseup", function () {
  isMousePressed = false;
});

document.addEventListener("mousemove", function (e) {
  if (isMousePressed) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

// Start animation
animate();
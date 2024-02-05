// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui@0.7.7';
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
// let laptop;
// // Object to store parameters
const gui = new dat.GUI();
// var guiParams = {
//   positionX: 10,
//   positionY: -33,
//   positionZ: 50,
//   scaleX: 0.15,
//   scaleY: 0.15,
//   scaleZ: 0.15,
//   rotationY: Math.PI / 4,
//   color: new THREE.Color(0xff0000), // Default color is red
// };
// Load the object
const gltfLoader = new GLTFLoader();
// gltfLoader.load(
//   `models/apple_imac.glb`,
//   function (glb) {
//     laptop = glb;
//     // Apply initial transformations
//     laptop.position.set(guiParams.positionX, guiParams.positionY, guiParams.positionZ);
//     laptop.scale.set(guiParams.scaleX, guiParams.scaleY, guiParams.scaleZ);
//     laptop.rotation.set(0, guiParams.rotationY, 0);
//     laptop.traverse((child) => {
//       if (child.isMesh) {
//         child.material.color = guiParams.color;
//       }
//     });
//     scene.add(laptop);
//     // Create GUI controls
//     var folder = gui.addFolder('Laptop Parameters');
//     folder.add(guiParams, 'positionX', -50, 50).onChange(updateObject);
//     folder.add(guiParams, 'positionY', -50, 50).onChange(updateObject);
//     folder.add(guiParams, 'positionZ', -50, 50).onChange(updateObject);
//     folder.add(guiParams, 'scaleX', 0.01, 1).onChange(updateObject);
//     folder.add(guiParams, 'scaleY', 0.01, 1).onChange(updateObject);
//     folder.add(guiParams, 'scaleZ', 0.01, 1).onChange(updateObject);
//     folder.add(guiParams, 'rotationY', 0, Math.PI * 2).onChange(updateObject);
//     folder.addColor(guiParams, 'color').onChange(updateguiParam);
//     function updateObject() {
//       laptop.position.set(guiParams.positionX, guiParams.positionY, guiParams.positionZ);
//       laptop.scale.set(guiParams.scaleX, guiParams.scaleY, guiParams.scaleZ);
//       laptop.rotation.set(0, guiParams.rotationY, 0);
//     }
//     function updateguiParam() {
//       laptop.traverse((child) => {
//         if (child.isMesh) {
//           child.material.color = guiParams.color;
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

const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshBasicMaterial({ opacity: 1, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
ground.receiveShadow = true;
ground.position.set(0, -105, 0);
scene.add(ground);
// Load GLTF model

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

let object2;
gltfLoader.load(
  `models/apple_imac.glb`,
  function (glb) {
    object2 = glb.scene;
    // Create GUI controls for the new model
    const girlParam = {
      positionXx: 0,
      positionYy: -31.5,
      positionZz: 19,
      scaleX: 10,
      scaleY: 10,
      scaleZ: 10,
      rotationY: -0.255,
      rotationX: 0,
      rotationZ: 0,
    };
    object2.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
    object2.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
    object2.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
    // Add the 3D model to the scene
    scene.add(object2);
    const girl = gui.addFolder('mac');
    girl.add(girlParam, 'positionXx', -500, 100).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'positionYy', -500, 50).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'positionZz', -500, 50).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'scaleX', 1, 100).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'scaleY', 1, 100).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'scaleZ', 1, 100).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'rotationX', -Math.PI, Math.PI).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'rotationY', -Math.PI, Math.PI).onChange(updateMaiBikiniObject);
    girl.add(girlParam, 'rotationZ', -Math.PI, Math.PI).onChange(updateMaiBikiniObject);
    function updateMaiBikiniObject() {
      object2.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
      object2.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
      object2.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
      console.log("Model Updated:", girlParam);
    }
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

let object3;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function socialMedia(obj, link, x, y, z) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoverLight;  // Declare hoverLight in the outer scope
  document.addEventListener('click', onClick);
  document.addEventListener('mousemove', onHover);
  function onClick(event) {
    updateMousePosition(event);
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([obj], true);
    if (intersects.length > 0) {
      // The obj is clicked
      window.location.href = link;
    }
  }
  function onHover(event) {
    updateMousePosition(event);
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([obj], true);
    if (intersects.length > 0) {
      // The obj is hovered over
      obj.scale.set(x + 1, y + 1, z + 1);
      // Create hover light if not created yet
      if (!hoverLight) {
        hoverLight = new THREE.PointLight(0xffea00, 2, 30);
        scene.add(hoverLight);
      }
      // Position the hover light at the intersection point
      hoverLight.position.copy(intersects[0].point);
    } else {
      // Reset scale and remove hover light if not hovering
      obj.scale.set(x, y, z);
      if (hoverLight) {
        scene.remove(hoverLight);
        hoverLight = null;
      }
    }
  }
  function updateMousePosition(event) {
    // calculate mouse position in normalized device coordinates (-1 to +1) for raycasting
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
}

gltfLoader.load(
  'models/instagram_3d-icon.glb',
  function (glb) {
    object3 = glb.scene;
    socialMedia(object3, 'https://www.instagram.com/kakhekar/', 20, 15, 15);
    initializeObject3();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);
function initializeObject3() {
  const girlParam = {
    positionXx: 26,
    positionYy: 78,
    positionZz: 216,
    scaleX: 20,
    scaleY: 15,
    scaleZ: 15,
    rotationX: 0,
    rotationY: 1.5,
    rotationZ: 0,
  };
  object3.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
  object3.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
  object3.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
  scene.add(object3);
  const girl = gui.addFolder('instagram');
  girl.add(girlParam, 'positionXx', -500, 200).onChange(updateObject3);
  girl.add(girlParam, 'positionYy', -500, 100).onChange(updateObject3);
  girl.add(girlParam, 'positionZz', -500, 500).onChange(updateObject3);
  girl.add(girlParam, 'scaleX', 1, 100000).onChange(updateObject3);
  girl.add(girlParam, 'scaleY', 1, 100000).onChange(updateObject3);
  girl.add(girlParam, 'scaleZ', 0.01, 100000).onChange(updateObject3);
  girl.add(girlParam, 'rotationX', -Math.PI, Math.PI).onChange(updateObject3);
  girl.add(girlParam, 'rotationY', -Math.PI, Math.PI).onChange(updateObject3);
  girl.add(girlParam, 'rotationZ', -Math.PI, Math.PI).onChange(updateObject3);
  function updateObject3() {
    object3.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
    object3.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
    object3.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
    console.log('Model Updated:', girlParam);
  }
}
let object4;
gltfLoader.load(
  `models/linkdin.glb`,
  function (glb) {
    object4 = glb.scene;
    socialMedia(object4, 'https://www.linkedin.com/in/shubham-kakhekar-39bb63191/', 8, 8, 8);
    // Create GUI controls for the new model
    const girlParam = {
      positionXx: 122,
      positionYy: 79,
      positionZz: 212,
      scaleX: 8,
      scaleY: 8,
      scaleZ: 8,
      rotationX: 0,
      rotationY: 1.5416,
      rotationZ: 0,
    };
    object4.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
    object4.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
    object4.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
    // Add the 3D model to the scene
    scene.add(object4);
    const girl = gui.addFolder('linkdeen');
    girl.add(girlParam, 'positionXx', -500, 200).onChange(updateobject4);
    girl.add(girlParam, 'positionYy', -500, 100).onChange(updateobject4);
    girl.add(girlParam, 'positionZz', -500, 500).onChange(updateobject4);
    girl.add(girlParam, 'scaleX', 1, 100).onChange(updateobject4);
    girl.add(girlParam, 'scaleY', 1, 100).onChange(updateobject4);
    girl.add(girlParam, 'scaleZ', 1, 100).onChange(updateobject4);
    girl.add(girlParam, 'rotationX', -Math.PI, Math.PI).onChange(updateobject4);
    girl.add(girlParam, 'rotationY', -Math.PI, Math.PI).onChange(updateobject4);
    girl.add(girlParam, 'rotationZ', -Math.PI, Math.PI).onChange(updateobject4);
    function updateobject4() {
      object4.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
      object4.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
      object4.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
      console.log("Model Updated:", girlParam);
    }
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);
let object5;
gltfLoader.load(
  `models/3d_github_logo.glb`,
  function (glb) {
    object5 = glb.scene;
    socialMedia(object5, 'https://github.com/Kakhekar', 15, 15, 10);
    // Create GUI controls for the new model
    const girlParam = {
      positionXx: 76,
      positionYy: 33,
      positionZz: 278,
      scaleX: 15,
      scaleY: 15,
      scaleZ: 10,
      rotationX: 0,
      rotationY: 3.1416,
      rotationZ: 0,
    };
    object5.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
    object5.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
    object5.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
    // Add the 3D model to the scene
    scene.add(object5);
    const girl = gui.addFolder('Github');
    girl.add(girlParam, 'positionXx', -500, 200).onChange(updateobject5);
    girl.add(girlParam, 'positionYy', -500, 100).onChange(updateobject5);
    girl.add(girlParam, 'positionZz', -500, 500).onChange(updateobject5);
    girl.add(girlParam, 'scaleX', 1, 100).onChange(updateobject5);
    girl.add(girlParam, 'scaleY', 1, 100).onChange(updateobject5);
    girl.add(girlParam, 'scaleZ', 1, 100).onChange(updateobject5);
    girl.add(girlParam, 'rotationX', -Math.PI, Math.PI).onChange(updateobject5);
    girl.add(girlParam, 'rotationY', -Math.PI, Math.PI).onChange(updateobject5);
    girl.add(girlParam, 'rotationZ', -Math.PI, Math.PI).onChange(updateobject5);
    function updateobject5() {
      object5.position.set(girlParam.positionXx, girlParam.positionYy, girlParam.positionZz);
      object5.scale.set(girlParam.scaleX, girlParam.scaleY, girlParam.scaleZ);
      object5.rotation.set(girlParam.rotationX, girlParam.rotationY, girlParam.rotationZ);
      console.log("Model Updated:", girlParam);
    }
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);
// Banner
const textureLoader = new THREE.TextureLoader();
//akatski
const bannerTexture = textureLoader.load('models/Kakhekar.png');
const bannerMaterial = new THREE.MeshBasicMaterial({ map: bannerTexture });
const bannerGeometry = new THREE.PlaneGeometry(200, 100); // Adjust the size as needed
const banner = new THREE.Mesh(bannerGeometry, bannerMaterial);
banner.position.set(0, 50, -214); // Adjust the position as needed
banner.scale.set(1.3, 1.8, 2);
scene.add(banner);
//kakhekar
// const bannerTextur = textureLoader.load('');
// const bannerMateria = new THREE.MeshBasicMaterial({ map: bannerTextur });
// const bannerGeometr = new THREE.PlaneGeometry(200, 100); // Adjust the size as needed
// const banne = new THREE.Mesh(bannerGeometr, bannerMateria);
// banne.position.set(-230, 50, 15); // Adjust the position as needed
// banne.rotation.y = Math.PI / 2;
// banne.scale.set(1.8, 2, 2);
// scene.add(banne);

const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(2000, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;
const spotLightFolder = gui.addFolder('spotLight');
// Add controls for spotLight properties
spotLightFolder.addColor(spotLight, 'color').onChange(() => {
  // Handle color change
});
spotLightFolder.add(spotLight.position, 'x', -1000, 2000).onChange(() => {
  // Handle x position change
});
spotLightFolder.add(spotLight.position, 'y', -1000, 2000).onChange(() => {
  // Handle y position change
});
spotLightFolder.add(spotLight.position, 'z', -1000, 2000).onChange(() => {
  // Handle z position change
});
spotLightFolder.add(spotLight, 'intensity', 0, 2).onChange(() => {
  // Handle intensity change
});
spotLightFolder.add(spotLight, 'castShadow').onChange(() => {
  // Handle castShadow change
});
// Open the folder by default
spotLightFolder.open();
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);
// Create lights
// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(500, 500, 500);
// topLight.castShadow = true;
// scene.add(topLight);
// const ambientLight = new THREE.AmbientLight(0x333333);
// scene.add(ambientLight);
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
//vidyas code
document.addEventListener("DOMContentLoaded", function () {
  // Your script here
  const homeMenu = document.getElementById('homeMenu');
  const aboutMenu = document.getElementById('aboutMenu');
  const serviceMenu = document.getElementById('serviceMenu');
  const contactMenu = document.getElementById('contactMenu');
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
  contactMenu.addEventListener('click', function (e) {
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: -50,
      duration: 1.5,
      onComplete: function () {
        camera.lookAt(100, 100, 100);
        // renderer.render(scene, camera);
      }
    })
  })
});
// Create renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Add renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);
// Enable orbit controls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
// controls.minDistance = 0; // Set the minimum allowed distance for zoom-out
// controls.maxDistance = 300;
// // Set maximum and minimum vertical rotation angles (in radians)
// controls.minPolarAngle = Math.PI / 6; // 30 degrees
// controls.maxPolarAngle = Math.PI / 2; // 90 degrees
// //Set maximum and minimum horizontal rotation angles (in radians)
// controls.minAzimuthAngle = -Math.PI / 4; // -45 degrees
// controls.maxAzimuthAngle = Math.PI / 4;  // 45 degrees
// Render the scene
function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(mouse, camera);
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

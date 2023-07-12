import * as THREE from 'three'
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'


// Import the GLTFLoader from the KhronosGroup/glTF repository
// import { GLTFLoader } from 'three-gltf-loader/index';



import { WebIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS } from "@gltf-transform/extensions";
import { metalRough } from "@gltf-transform/functions";

// root element 
const canvas = document.getElementById('webgl')

// size - use it later
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};


// create a scene
const scene = new THREE.Scene()






// Instantiate a loader
// const loader = new GLTFLoader();
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// class CustomGLTFLoader extends GLTFLoader {
//   constructor(manager) {
//     super(manager);
//     this.extensionsUsed.push("KHR_materials_pbrSpecularGlossiness");
//   }
// }

// import { GLTFLoader } from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js"; 


// var loader = GLTFLoader();
// var specularExtension = new THREE.GLTFLoaderUtils.getSpecularGlossinessExtension();
// specularExtension.register();



// // Usage:
// // const loader = new CustomGLTFLoader();
// loader.load(
//   "/scene.gltf",
//   (gltf) => {
//     // Process the loaded model
//   },
//   undefined,
//   (error) => {
//     console.error(error);
//   }
// );

// const loadedData =  loader.load("gltf/city.glb");
// console.log(loadedData)
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
// loader.load(
// 	// resource URL
// 	'/scene.gltf',
// 	// called when the resource is loaded
// 	async function ( gltf ) {
// // console.log(gltf)
// // console.log(gltf.scene)
// // const root = gltf.scene
// const root = await gltf.scene
// // root.scale.set(0.01,0.01,0.01)
// 		scene.add(gltf.scene);

// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object

// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened',error );

// 	}
// );



// // Load model in glTF Transform.
// const io = new WebIO().registerExtensions(KHRONOS_EXTENSIONS);
// const document2 =  io.read('gltf/aobox.glb');

// // Convert materials.
//  document2.transform(metalRough());

// // Write back to GLB.
// const glb = await io.writeBinary(document2);

// // Load model in three.js.
// // const loader = new GLTFLoader();

// loader.parse(glb.buffer, '', (gltf) => {
//   scene.add(gltf.scene);
//   // ...
// });





// Import required libraries
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { KHRMaterialsPbrSpecularGlossinessExtension } from "three/examples/jsm/loaders/GLTFLoader.js";

// Create a scene, camera, and renderer as usual

// Create a DRACOLoader instance
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('path/to/draco/decoder/');

// Create a GLTFLoader instance and set the DRACOLoader
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);


// GLTFLoader.register(
//   (parser) => new KHRMaterialsPbrSpecularGlossinessExtension(parser)
// );

// const loader = new THREE.GLTFLoader();
// loader.register((parser) => {
//   const specularGlossinessExtension = parser.getDependency(
//     "KHR_materials_pbrSpecularGlossiness"
//   );
//   specularGlossinessExtension.createMaterial = (materialParams, material) => {
//     // Implement the creation of the specular-glossiness material here
//     // You can refer to the Three.js documentation for creating materials
//   };
// });

// Load the GLTF model with the KHR_materials_pbrSpecularGlossiness extension
loader.load('/scene.gltf', (gltf) => {
  // Add the loaded model to your scene
  scene.add(gltf.scene);
}, undefined, (error) => {
  console.error(error);
});









const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
scene.add(light)








// geomtery
const geometry = new THREE.BoxGeometry(1,1,1)

// mesh material 
const meshMaterial = new THREE.MeshBasicMaterial({color:"red"})

// adding geometry and mesh material in mesh
// mesh.add(geometry,meshMaterial) //wrong way add during initialization


// mesh  - adding geometry and meshMaterial in mesh
const mesh = new THREE.Mesh(geometry,meshMaterial)


// add mesh in scene
// scene.add(mesh)

// create camera 
// hint PC(fov,aspectRation,near/optional,far/optional)
const camera = new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.z =5

// adding camera to the scene
scene.add(camera)

// create renderer 
const renderer = new THREE.WebGLRenderer({canvas})


// set the size of renderer
renderer.setSize(size.width,size.height)


renderer.outputColorSpace = THREE.SRGBColorSpace;


// rendering the scene in canvas

  renderer.render(scene, camera);


// animation function here

function animate(){
  requestAnimationFrame(animate)
  
  renderer.render(scene,camera)

}


// animate()
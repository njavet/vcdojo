import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
const models = ['blender/drone.glb', 'blender/space_ship.glb', 'blender/rail_gun.glb', 'blender/pistol.glb']

let currentModelIndex = 1;
let currentModel;
let isRotatingHorizontal = false
let isRotatingVertical = false

export function initializeScene(container) {
    const light = new THREE.AmbientLight(0x404040, 1, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    camera.position.z = 5;
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light, directionalLight);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/luna.svg', (texture) => {
        scene.background = texture;
    });
    loader.load(models[currentModelIndex], function(gltf) {
        currentModel = gltf.scene;
        scene.add(currentModel);
        renderer.render(scene, camera);
    })
    console.log('renderd')
    renderer.render(scene, camera);
    //renderer.setAnimationLoop(animate)
}

export function animate() {
    // requestAnimationFrame(animate);
    renderer.setAnimationLoop(() => {

        if (isRotatingHorizontal && currentModel) {
            currentModel.rotation.y += 0.001;
        }
        if (isRotatingVertical && currentModel) {
            currentModel.rotation.z += 0.001;
        }
        renderer.render(scene, camera);
    });
}

export function changeModelColor(color) {
    if (currentModel) {
        currentModel.traverse((child) => {
            if (child.isMesh && child.material) {
                // Check if the material is an array (e.g., multi-material)
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat) => mat.color.set(color));
                } else {
                    child.material.color.set(color);
                }
            }
        });
    }
}

export function loadModel(index, models) {
    if (currentModel) {
        scene.remove(currentModel);
    }
    loader.load(models[index], function(gltf) {
        currentModel = gltf.scene;
        scene.add(currentModel);
        renderer.render(scene, camera);
    })
}


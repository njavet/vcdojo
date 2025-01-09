import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
const models = ['public/blender/drone.glb',
    'public/blender/rail_gun.glb',
    'public/blender/pistol.glb']

let currentModel;
let isRotatingHorizontal = false
let isRotatingVertical = false

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

export function initializeScene(container) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;
    const light = new THREE.AmbientLight(0x404040, 1, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light, directionalLight);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/tarsonis_bg.jpg', (texture) => {
        scene.background = texture;
        renderer.render(scene, camera);
    });
    //renderer.setAnimationLoop(animate)
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

export function loadModel(index, updateStats) {
    if (currentModel) {
        scene.remove(currentModel);
    }
    loader.load(models[index], function(gltf) {
        currentModel = gltf.scene;
        if (0 === index) {
            var desc = "A next generation AI drone with two plasma guns"
            updateStats(2048, 256, desc);
        }
        if (1 === index) {
            var desc = "A big rail gun, optimal for defending your flat"
            currentModel.scale.set(0.5, 0.5, 0.5)
            updateStats(1024, 128, desc);
        }
        if (2 === index) {
            var desc = "plasma hand gun, good for showing off"
            currentModel.scale.set(0.5, 0.5, 0.5)
            currentModel.scale.set(0.5, 0.5, 0.5)
            updateStats(64, 2, desc);
        }
        scene.add(currentModel);
    })
}


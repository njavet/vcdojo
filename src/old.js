import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

const models = ['drone.glb', 'rail_gun.glb', 'pistol.glb']
let isRotatingHorizontal = false;
let isRotatingVertical = false;

let currentModelIndex = 0;
let currentModel;
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const light = new THREE.AmbientLight(0x404040, 1, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(directionalLight);
camera.position.z = 5;
textureLoader.load('tarsonis_bg.jpg', (texture) => {
    scene.background = texture;
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);
// Event listeners for buttons
document.getElementById('next-model').addEventListener('click',
    () => switchModel('next'));
document.getElementById('prev-model').addEventListener('click',
    () => switchModel('prev'));
document.getElementById('rotateHorizontal').addEventListener('click',
    () => {
    isRotatingHorizontal = !isRotatingHorizontal;
});
document.getElementById('rotateVertical').addEventListener('click',
    () => {
        isRotatingVertical = !isRotatingVertical;
    });
document.querySelectorAll('.color-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const color = event.target.getAttribute('data-color');
        changeModelColor(color);
    });
});

// Function to switch to the next or previous model

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function updateProductStats(price, weight, desc) {
    document.querySelector('#stats-container .stats-box:first-child span').textContent = `Price: ${price} coins`;
    document.querySelector('#stats-container .stats-box:nth-child(2) span').textContent = `Weight: ${weight} kg`;
    document.querySelector('#stats-container .stats-box:nth-child(3) span').textContent = `Description: ${desc}`;
}

function loadModel(index) {
    if (currentModel) {
        scene.remove(currentModel);
    }
    loader.load(models[index], function(gltf) {
        currentModel = gltf.scene;
        if (0 === index) {
            var desc = "A next generation AI drone with two plasma guns"
            updateProductStats(2048, 256, desc);
        }
        if (1 === index) {
            var desc = "A big rail gun, optimal for defending your flat"
            currentModel.scale.set(0.5, 0.5, 0.5)
            updateProductStats(1024, 128, desc);
        }
        if (2 === index) {
            var desc = "plasma hand gun, good for showing off"
            currentModel.scale.set(0.5, 0.5, 0.5)
            currentModel.scale.set(0.5, 0.5, 0.5)
            updateProductStats(64, 2, desc);
        }
        scene.add(currentModel);
    })

}

function changeModelColor(color) {
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


function switchModel(direction) {
    if (direction === 'next') {
        currentModelIndex = (currentModelIndex + 1) % models.length; // Cycle forward
    } else if (direction === 'prev') {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length; // Cycle backward
    }
    loadModel(currentModelIndex);
}


function animate() {
    requestAnimationFrame(animate);
    if (isRotatingHorizontal && currentModel) {
        currentModel.rotation.y += 0.0005;
    }
    if (isRotatingVertical && currentModel) {
        currentModel.rotation.z += 0.0005;
    }
    renderer.render(scene, camera);
}

loadModel(currentModelIndex);
renderer.setAnimationLoop(animate);

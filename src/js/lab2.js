import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
const models = [
    'blender/drone.glb',
    'blender/war_drone.glb',
    'blender/rail_gun.glb',
    'blender/gun.glb',
    'blender/shotgun.glb',
    'blender/robot.glb'
]

let current_model_index= 0;
let current_model;
let rotating_horizontal = false


function load_model(model_index) {
    if (current_model) {
        scene.remove(current_model);
    }
    loader.load(models[model_index], function(gltf) {
        current_model = gltf.scene;
        scene.add(current_model);
        renderer.render(scene, camera);
    })
}

function animate() {
    if (rotating_horizontal && current_model) {
        current_model.rotation.y += 0.0005;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}

export function initializeScene(container) {
    const light = new THREE.AmbientLight(0x404040, 1, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    camera.position.z = 5;
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light, directionalLight);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/bg.jpg', (texture) => {
        scene.background = texture;
        renderer.render(scene, camera);
    });
    load_model(current_model_index, models)
    renderer.setAnimationLoop(animate)
}

export function toggle_rotation() {
    rotating_horizontal = !rotating_horizontal;
}

export function switch_model(direction) {
    if (direction === 'next') {
        current_model_index = (current_model_index + 1) % models.length;
    } else if (direction === 'prev') {
        current_model_index = (current_model_index - 1 + models.length) % models.length;
    }
    load_model(current_model_index);
}

export function change_model_color(color) {
    if (current_model) {
        current_model.traverse((child) => {
            if (child.isMesh && child.material) {
                // Check if the material is an array (e.g., multi-material)
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat) => mat.color.set(color));
                } else {
                    child.material.color.set(color);
                }
            }
        });
        renderer.render(scene, camera);
    }
}


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadModels(scene) {
    const loader = new GLTFLoader();
    loader.load('/assets/models/Duck/Duck.gltf', (gltf) => {
        scene.add(gltf.scene);
    }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
    });
}

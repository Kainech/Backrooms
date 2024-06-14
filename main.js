import * as THREE from 'three';
import { initControls } from './controls.js';
import { createEnvironment } from './environment.js';
import { handlePhysics } from './physics.js';
import { loadModels } from './models.js';
import { gameLogic } from './game_logic.js';
import { addLights } from './lighting.js'; 

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Add lights to the scene
addLights(scene);

//Initialize environment
createEnvironment(scene);

//Load models
loadModels(scene);

//Initialize controls
const controls = initControls(camera);

//Main animation loop
function animate() {
    requestAnimationFrame(animate);

    //Update controls
    if (controls && typeof controls.update === 'function') {
        controls.update();
    }

    //Handle physics
    handlePhysics(scene, camera);

    //Execute game-specific logic
    gameLogic(scene, camera);

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

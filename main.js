import * as THREE from 'three';
import { createEnvironment } from './environment.js';
import { loadModels } from './models.js';
import { gameLogic } from './game_logic.js';
import { addLights } from './lighting.js'; 
import { Player } from './player.js';
import { createEnemy } from './enemy.js';

//Creating our scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

//Creating our camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Creating our renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Add lights to the scene
addLights(scene);

//Initialize environment
createEnvironment(scene);

//Load models
loadModels(scene);

//Initialize player
const player = new Player(scene, camera);

//create enemy
createEnemy(scene, player);

//Main animation loop
function animate() {
    requestAnimationFrame(animate);

    //Update player controls and movement
    player.update();

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

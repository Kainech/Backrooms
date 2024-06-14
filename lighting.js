import * as THREE from 'three';

export function addLights(scene) {
    //Add an ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); //soft white light
    scene.add(ambientLight);

    //Add a directional light to simulate the sun
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

}

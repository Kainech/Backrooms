import * as THREE from 'three';

export function handlePhysics(scene, camera) {
    //Gravity
    if (camera.position.y > 1) {
        camera.position.y -= 0.05; //Gravity Strength
    } else {
        //Setting floor level
        camera.position.y = 1;
    }

    // Handle collisions and other physics logic here
}

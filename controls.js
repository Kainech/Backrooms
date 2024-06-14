import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export function initControls(camera) {
    const controls = new PointerLockControls(camera, document.body);

    document.addEventListener('click', () => {
        controls.lock();
    });

    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                controls.moveForward(0.1);
                break;
            case 'ArrowDown':
            case 'KeyS':
                controls.moveForward(-0.1);
                break;
            case 'ArrowLeft':
            case 'KeyA':
                controls.moveRight(-0.1);
                break;
            case 'ArrowRight':
            case 'KeyD':
                controls.moveRight(0.1);
                break;
        }
    });

    return controls;
}

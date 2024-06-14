import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

//player.js
export class Player {
    //constructor for the player class
    constructor(scene, camera) {
        //initialize the camera and scene
        this.camera = camera;
        this.scene = scene;
        //initialize the velocity and direction of the player
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        //initialize the movement controls
        this.move = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            shift: false,
            jump: false
        };
        //initialize the player properties
        this.standingHeight = 1.5;
        this.speed = 0.03;
        this.gravity = -11;
        this.jumpHeight = 5;
        this.isJumping = false;
        this.camera.position.y = this.standingHeight;
        //1.Create a pointer lock control camera with mouse lock
        this.controls = new PointerLockControls(this.camera, document.body);
        this.initControls();
    }

    //initialize the player controls
    initControls() {
        document.addEventListener('click', () => {
            this.controls.lock();
        });

        const onKeyDown = (event) => {
            switch (event.code) {
                case 'KeyW':
                    this.move.forward = true;
                    break;
                case 'KeyS':
                    this.move.backward = true;
                    break;
                case 'KeyA':
                    this.move.left = true;
                    break;
                case 'KeyD':
                    this.move.right = true;
                    break;
                case 'ShiftLeft':
                    this.move.shift = true;
                    break;
                case 'Space':
                    if (!this.isJumping) {
                        this.velocity.y = this.jumpHeight;
                        this.isJumping = true;
                    }
                    break;
            }
        };

        const onKeyUp = (event) => {
            switch (event.code) {
                case 'KeyW':
                    this.move.forward = false;
                    break;
                case 'KeyS':
                    this.move.backward = false;
                    break;
                case 'KeyA':
                    this.move.left = false;
                    break;
                case 'KeyD':
                    this.move.right = false;
                    break;
                case 'ShiftLeft':
                    this.move.shift = false;
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }

    update() {
        //Check if shift key is being pressed for sprinting
        const moveSpeed = this.move.shift ? this.speed * 2 : this.speed;


        //Moving the player forward and backward
        this.direction.z = Number(this.move.forward) - Number(this.move.backward); 
        //Moving the player left and right
        this.direction.x = Number(this.move.right) - Number(this.move.left);
        this.direction.normalize();

        this.velocity.x = this.direction.x * moveSpeed;
        this.velocity.z = this.direction.z * moveSpeed;

        this.velocity.y += this.gravity * 0.02; 

        if (this.controls.isLocked) {
            this.controls.moveRight(this.velocity.x);
            this.controls.moveForward(this.velocity.z);
            this.camera.position.y += this.velocity.y * 0.01;
        }

        if (this.camera.position.y <= this.standingHeight) {
            this.velocity.y = 0;
            this.camera.position.y = this.standingHeight;
            this.isJumping = false;
        }
    }

    getPosition() {
        return this.camera.position.clone();
    }

    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }

    checkCollision(objects) {
        const playerBox = new THREE.Box3().setFromObject(this.camera);
        for (let obj of objects) {
            const objBox = new THREE.Box3().setFromObject(obj);
            if (playerBox.intersectsBox(objBox)) {
                return true;
            }
        }
        return false;
    }
}

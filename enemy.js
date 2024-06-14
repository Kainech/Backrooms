import * as THREE from 'three';
import PF from 'pathfinding';

export function createEnemy(scene, player) {
    //Load enemy texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/SeleneDelgado.webp');
    const enemyMaterial = new THREE.SpriteMaterial({ map: texture });
    const enemy = new THREE.Sprite(enemyMaterial);
    scene.add(enemy);

    //Set initial position within grid bounds and height similar to the player
    enemy.position.set(Math.random() * 10 - 5, 1.6, Math.random() * 10 - 5);

    //Create a larger grid (50x50) for pathfinding
    const gridSize = 50;
    const grid = new PF.Grid(gridSize, gridSize);

    const finder = new PF.AStarFinder();

    function updateEnemy() {
        //Calculate direction to face player
        const playerPos = player.getPosition();
        const dx = playerPos.x - enemy.position.x;
        const dz = playerPos.z - enemy.position.z;
        const angle = Math.atan2(dz, dx);
        enemy.rotation.y = angle;

        //Convert positions to grid coordinates
        const startX = Math.floor(enemy.position.x + gridSize / 2);
        const startZ = Math.floor(enemy.position.z + gridSize / 2);
        const endX = Math.floor(playerPos.x + gridSize / 2);
        const endZ = Math.floor(playerPos.z + gridSize / 2);

        //Ensure start and end positions are within the grid
        if (startX < 0 || startX >= gridSize || startZ < 0 || startZ >= gridSize || endX < 0 || endX >= gridSize || endZ < 0 || endZ >= gridSize) {
            requestAnimationFrame(updateEnemy);
            return;
        }

        //Find path to player
        const path = finder.findPath(startX, startZ, endX, endZ, grid.clone());

                if (path.length > 0) {
            //Move towards the player
            const playerPos = player.getPosition();
            const dx = playerPos.x - enemy.position.x;
            const dz = playerPos.z - enemy.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            const speed = 0.03;

            if (distance > 0.1) { //Prevent the enemy from getting too close to the player
                enemy.position.x += speed * dx / distance;
                enemy.position.z += speed * dz / distance;
            }
        }

        //Keep calling updateEnemy
        requestAnimationFrame(updateEnemy);

    }

    //Start updating the enemy
    updateEnemy();

    return enemy;
}

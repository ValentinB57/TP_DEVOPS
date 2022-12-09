import * as noisejs from "https://cdn.skypack.dev/noisejs@2.1.0";

let viewport;
let pointerLockElemn;

/* Camera and movement */
let camera = {
  worldPosition: { x: 0, y: 200, z: 0 },
  cubePosition: { x: 0, y: 2, z: 0 },
  spawnCubePosition: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0 }
};
let demoSpeed = { x: 5, z: -5 };
let demoMode = true;
let ascendSpeed = 10;
let fallSpeed = 30;

/* Level generation */
let generateDistance = { x: 3, y: 2, z: 3 };
var noise = new noisejs.Noise();
noise.seed(Math.random() * 20000);

const tileSize = 100;
let chunkDimensions = {
  height: 5,
  width: 3,
  depth: 3
};
/* The textures for the various blocks types */
let blockTypes = [
  {},
  { texture: "grass" },
  { texture: "dirt" },
  { texture: "gravel" },
  { texture: "stone" }
];

function start() {
  updateCameraCubePosition();
  viewport = document.getElementById("viewport");

  document
    .getElementById("btn-fullscreen")
    .addEventListener("click", toggleFullscreen);

  let renderDistance = document.querySelector("#render-distance input");
  let renderDistanceLabel = document.querySelector("#render-distance label");

  renderDistance.value = getRenderDistance();

  renderDistance.addEventListener("change", function () {
    renderDistanceLabel.textContent = renderDistance.value;
    setRenderDistance(Number(renderDistance.value));
  });

  let scene = document.getElementById("scene");
  let rotation = document.getElementById("rotation");

  // Start the game loop
  loop();
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    viewport.requestFullscreen();
  }
}

// Calculates the block position of the camera based on its world world position
function updateCameraCubePosition() {
  camera.cubePosition.x = Math.floor(camera.worldPosition.x / tileSize);
  camera.cubePosition.y = Math.floor(0 - camera.worldPosition.y / tileSize);
  camera.cubePosition.z = Math.floor(0 - camera.worldPosition.z / tileSize);

  camera.spawnCubePosition.x =
    camera.cubePosition.x +
    spawnOffset * Math.cos(degToRad(90 - camera.rotation.y));
  camera.spawnCubePosition.z =
    camera.cubePosition.z -
    spawnOffset * Math.sin(degToRad(90 - camera.rotation.y));
  camera.spawnCubePosition.y = camera.cubePosition.y;
}

let previousTime;

let loop = function (timestamp) {
  if (!previousTime) previousTime = timestamp;

  let delta = (timestamp - previousTime) / 1000;

  update(delta || 0);

  previousTime = timestamp;

  window.requestAnimationFrame(loop);
};

function update(delta) {
  updateCameraCubePosition();

  let collisionY =
    level.getBlock(
      camera.cubePosition.x,
      camera.cubePosition.y + 5,
      camera.cubePosition.z
    ) > 0;
  let inBlock =
    level.getBlock(
      camera.cubePosition.x,
      camera.cubePosition.y + 4,
      camera.cubePosition.z
    ) > 0;
  if (inBlock) {
    let to = camera.worldPosition.y + ascendSpeed;
    let speed = Math.abs((to - camera.worldPosition.y) * 0.05);
    camera.worldPosition.y = lerp(camera.worldPosition.y, to, speed);
  } else if (!collisionY) {
    camera.worldPosition.y = camera.worldPosition.y - 3;
  }

  let anglularChangeY = noise.perlin2(
    camera.worldPosition.x * 0.0008 + 50,
    camera.worldPosition.y * 0.0008 + 50
  );

  let anglularChangeX = noise.perlin2(
    camera.worldPosition.x * 0.0008,
    camera.worldPosition.y * 0.0008
  );

  camera.worldPosition.x += demoSpeed.x + anglularChangeY;
  camera.worldPosition.z += demoSpeed.z - anglularChangeY;
  camera.rotation = {
    x: anglularChangeX * 60 + 10,
    y: 135 + anglularChangeY * 50
  };

  updateLevel(delta);
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function lerp(from, to, t) {
  return (1 - t) * from + t * to;
}

let level = new Level(scene, tileSize, chunkDimensions);

let spawnOffset = Math.floor(generateDistance.x * 3.5);
let lastRender = 0.1;
const buildDelay = 0.1;

function getRenderDistance() {
  return generateDistance.x;
}

function setRenderDistance(distance) {
  generateDistance.x = generateDistance.z = distance;
  spawnOffset = Math.floor(distance * 3.5);
}

/* Object that holds the level data */
function Level(scene, tileSize, chunkDimensions) {
  this.scene = scene;
  this.tileSize = tileSize;
  this.chunkDimensions = chunkDimensions;
  this.data = {};
  this.getChunk = function (x, y, z) {
    return level.data[this.generateKey(x, y, z)];
  };
  this.generateKey = function (x, y, z) {
    return x + "_" + y + "_" + z;
  };
  this.worldToLocalPosition = function (worldX, worldY, worldZ) {
    let chunkPos = {
      x:
        ((worldX % this.chunkDimensions.width) + this.chunkDimensions.width) %
        this.chunkDimensions.width,
      y:
        ((worldY % chunkDimensions.height) + this.chunkDimensions.height) %
        this.chunkDimensions.height,
      z:
        ((worldZ % chunkDimensions.depth) + this.chunkDimensions.depth) %
        this.chunkDimensions.depth
    };

    return chunkPos;
  };
  this.worldCubeToChunkPosition = function (worldX, worldY, worldZ) {
    let chunkPos = {
      x: Math.floor(worldX / this.chunkDimensions.width),
      y: Math.floor(worldY / this.chunkDimensions.height),
      z: Math.floor(worldZ / this.chunkDimensions.depth)
    };

    return chunkPos;
  };
  this.chunkToWorldPosition = function (chunkX, chunkY, chunkZ) {
    let worldPos = {
      x: chunkX * this.chunkDimensions.width,
      y: chunkY * this.chunkDimensions.height,
      z: chunkZ * this.chunkDimensions.depth
    };

    return worldPos;
  };
  this.getChunkBlock = function (chunk, x, y, z) {
    if (!chunk || !chunk.data) return 0;

    if (
      x < 0 ||
      y < 0 ||
      z < 0 ||
      x >= this.chunkDimensions.width ||
      y >= this.chunkDimensions.height ||
      z >= this.chunkDimensions.depth
    ) {
      return this.getBlock(
        chunk.x * this.chunkDimensions.width + x,
        chunk.y * this.chunkDimensions.height + y,
        chunk.z * this.chunkDimensions.depth + z
      );
    }
    return chunk.data[x][y][z] || 0;
  };
  this.getBlock = function (worldX, worldY, worldZ) {
    let chunkPos = this.worldCubeToChunkPosition(worldX, worldY, worldZ);
    let chunk = this.getChunk(chunkPos.x, chunkPos.y, chunkPos.z);

    if (!chunk || !chunk.data) return 0;

    let pos = this.worldToLocalPosition(worldX, worldY, worldZ);

    return chunk.data[pos.x][pos.y][pos.z];
  };
}

/* Builds the divs to display the level in 3D */
function render() {
  let chunkPos = level.worldCubeToChunkPosition(
    camera.spawnCubePosition.x,
    camera.spawnCubePosition.y,
    camera.spawnCubePosition.z
  );
  let chunk = null;
  for (
    let x = chunkPos.x - generateDistance.x;
    x <= chunkPos.x + generateDistance.x;
    x++
  ) {
    for (
      let y = chunkPos.y - generateDistance.y;
      y <= chunkPos.y + generateDistance.y;
      y++
    ) {
      for (
        let z = chunkPos.z - generateDistance.z;
        z <= chunkPos.z + generateDistance.z;
        z++
      ) {
        chunk = level.getChunk(x, y, z);
        if (!chunk.mesh) {
          renderChunk(level, chunk);
        }
      }
    }
  }
}

function updateLevel(delta) {
  // map positions on x axis are inverted, i.e. moving forward into map results in negative position
  // so to calculate map x coord need to negate the player position. Also offset by the size of a tile
  // to ensure the user feels like the are directly on the tile.
  let xPos = 0 - (camera.worldPosition.x - tileSize / 2);
  let zPos = camera.worldPosition.z + tileSize / 2;

  scene.style.transform =
    "translate3d(" +
    xPos +
    "px, " +
    camera.worldPosition.y +
    "px, " +
    zPos +
    "px)";

  // Set the world rotation
  rotation.style.transform =
    "translate3d(0, 0, 500px) rotateX(-" +
    (camera.rotation.x + 360) +
    "deg) rotateY(" +
    camera.rotation.y +
    "deg) rotateZ(0deg)";

  let playerPos = camera.spawnCubePosition;

  if (!isNaN(delta)) lastRender += delta;

  if (lastRender > buildDelay) {
    let currChunk = level.worldCubeToChunkPosition(
      camera.spawnCubePosition.x,
      camera.spawnCubePosition.y,
      camera.spawnCubePosition.z
    );

    for (let chunk of Object.values(level.data)) {
      if (
        chunk.x < currChunk.x - generateDistance.x - 2 ||
        chunk.y < currChunk.y - generateDistance.y - 2 ||
        chunk.z < currChunk.z - generateDistance.z - 2 ||
        chunk.x > currChunk.x + generateDistance.x + 2 ||
        chunk.y > currChunk.y + generateDistance.y + 2 ||
        chunk.z > currChunk.z + generateDistance.z + 2
      ) {
        chunk.mesh?.remove();
        let key = level.generateKey(chunk.x, chunk.y, chunk.z);
        delete level.data[key];
      }
    }

    for (
      let chunkX = currChunk.x - generateDistance.x - 1;
      chunkX <= currChunk.x + generateDistance.x + 1;
      chunkX++
    ) {
      for (
        let chunkY = currChunk.y - generateDistance.y - 1;
        chunkY <= currChunk.y + generateDistance.y + 1;
        chunkY++
      ) {
        for (
          let chunkZ = currChunk.z - generateDistance.z - 1;
          chunkZ <= currChunk.z + generateDistance.z + 1;
          chunkZ++
        ) {
          let key = level.generateKey(chunkX, chunkY, chunkZ);
          if (!(key in level.data)) {
            let chunk = generateChunk(chunkX, chunkY, chunkZ, chunkDimensions);
            level.data[key] = chunk;
          }
        }
      }
    }

    render();
    lastRender = 0;
  }
}

function renderChunk(level, chunk) {
  let worldPos = level.chunkToWorldPosition(chunk.x, chunk.y, chunk.z);
  let blocks = [];

  let currBlock;
  for (let x = 0; x < level.chunkDimensions.width; x++) {
    for (let y = 0; y < level.chunkDimensions.height; y++) {
      for (let z = 0; z < level.chunkDimensions.depth; z++) {
        currBlock = createBlock(level, chunk, x, y, z);
        if (currBlock) blocks.push(currBlock);
      }
    }
  }

  let mesh = document.createElement("div");
  chunk.mesh = mesh;

  if (blocks) mesh.append(...blocks);

  mesh.classList.add("chunk", "move-in");
  mesh.style.transform =
    "translate3d(" +
    worldPos.x * level.tileSize +
    "px," +
    worldPos.y * level.tileSize +
    "px," +
    worldPos.z * level.tileSize +
    "px)";

  level.scene.append(mesh);
}

function createBlock(level, chunk, x, y, z) {
  let blockId = level.getChunkBlock(chunk, x, y, z);

  if (blockId <= 0) return;

  let neighbours = [
    level.getChunkBlock(chunk, x, y - 1, z) == 0, // top
    level.getChunkBlock(chunk, x, y + 1, z) == 0, // bottom
    level.getChunkBlock(chunk, x - 1, y, z) == 0, // right
    level.getChunkBlock(chunk, x + 1, y, z) == 0, // left
    level.getChunkBlock(chunk, x, y, z - 1) == 0, // back
    level.getChunkBlock(chunk, x, y, z + 1) == 0 // front
  ];

  let faceClasses = ["tp", "bm", "rt", "lt", "bk", "ft"];

  let block;
  let texture;

  texture = blockTypes[blockId].texture;

  if (neighbours.some((neighbour) => neighbour)) {
    block = document.createElement("div");
    block.classList.add("block", texture);
    block.style.transform =
      "translate3d(" +
      Math.floor(x * level.tileSize) +
      "px," +
      Math.floor(y * level.tileSize) +
      "px," +
      Math.floor(z * level.tileSize) +
      "px)";

    block.id =
      "cube" +
      level.generateKey(
        chunk.x * level.chunkDimensions.width + x,
        chunk.y * level.chunkDimensions.height + y,
        chunk.z * level.chunkDimensions.depth + z
      );
  } else {
    return;
  }

  for (let i = 0; i < neighbours.length; i++) {
    if (neighbours[i]) block.appendChild(makeFace(faceClasses[i]));
  }

  return block;
}

function makeFace(className) {
  let face = document.createElement("div");
  face.classList.add("face", className);
  return face;
}

// Method to generate the terrain of a level
function generateChunk(chunkX, chunkY, chunkZ, chunkDimensions) {
  // Create an array to hold the chunk
  let data = [];

  for (let x = 0; x < chunkDimensions.width; x++) {
    data[x] = [];

    for (let y = 0; y < chunkDimensions.height; y++) {
      data[x][y] = [];

      for (let z = 0; z < chunkDimensions.depth; z++) {
        let worldX = x + chunkX * chunkDimensions.width;
        let worldY = y + chunkY * chunkDimensions.height;
        let worldZ = z + chunkZ * chunkDimensions.depth;

        data[x][y][z] = 0;

        let cave = Math.round(
          noise.perlin3(
            0.3 + worldX * 0.04,
            0.3 + worldY * 0.08,
            0.3 + worldZ * 0.03
          )
        );
        if (cave == 1) {
          data[x][y][z] = 0;
          continue;
        }

        let gravel = noise.perlin2(worldX * 0.05, worldZ * 0.05) * 25 + 3;

        if (worldY > gravel) {
          data[x][y][z] = 3;
        } else {
          let grass =
            noise.perlin2(worldX * 0.038 + 100, worldZ * 0.038) * 7 +
            noise.perlin2(worldX * 0.01 + 100, worldZ * 0.01) * 5;

          if (worldY > grass) {
            data[x][y][z] = 1;
          } else {
            let stone =
              noise.perlin2(worldX * 0.038, worldZ * 0.038) * 25 +
              noise.perlin2(worldX * 0.01, worldZ * 0.01) * 15;

            if (worldY > stone) {
              data[x][y][z] = 4;
            }
          }
        }
      }
    }
  }

  let chunk = {
    x: chunkX,
    y: chunkY,
    z: chunkZ,
    data: data
  };

  return chunk;
}

start();


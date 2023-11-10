// Create the engine
var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

// Create the scene
var scene = new BABYLON.Scene(engine);

// Create a FreeCamera, and set its position to (x:0, y:5, z:-10)
var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

// Target the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());

// Attach the camera to the canvas
camera.attachControl(canvas, false);

// Create a light
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 1;

// Create a ground
var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);

// Create a material and set its texture
var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpeg", scene); // Replace with your ground texture path
ground.material = groundMaterial;

// Create a voxel tree
var voxelTree = new VoxelTree();
voxelTree.insert(new Voxel(0, 0, 0, 1, 'water'));
voxelTree.insert(new Voxel(1, 1, 1, 1, 'water'));
voxelTree.insert(new Voxel(-1, -1, -1, 1, 'water'));
voxelTree.insert(new Voxel(0, 1, 0, 1, 'water'));
voxelTree.insert(new Voxel(1, -1, 1, 1, 'water'));
voxelTree.insert(new Voxel(-1, 1, -1, 1, 'water'));
voxelTree.insert(new Voxel(1, 0, 1, 1, 'water'));
voxelTree.insert(new Voxel(-1, 0, -1, 1));
voxelTree.insert(new Voxel(0, -1, 0, 1));
voxelTree.insert(new Voxel(2, 2, 2, 1));
voxelTree.insert(new Voxel(-2, -2, -2, 1));
voxelTree.insert(new Voxel(2, 2, -2, 1));
voxelTree.insert(new Voxel(-2, -2, 2, 1));

// Generate voxel meshes
generateVoxelMeshes(voxelTree, scene);

// Render the scene
engine.runRenderLoop(function () {
    scene.render();
});
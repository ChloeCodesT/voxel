// Voxel data structure
function Voxel(x, y, z, size, type) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.type = type; // default type is ground
    this.left = null;
    this.right = null;
}

// Voxel tree data structure
function VoxelTree() {
    this.root = null;
}

VoxelTree.prototype.insert = function(voxel) {
    if (this.root === null) {
        this.root = voxel;
    } else {
        this._insert(voxel, this.root);
    }
};

VoxelTree.prototype._insert = function(voxel, node) {
    if (voxel.x < node.x) {
        if (node.left === null) {
            node.left = voxel;
        } else {
            this._insert(voxel, node.left);
        }
    } else if (voxel.x >= node.x) {
        if (node.right === null) {
            node.right = voxel;
        } else {
            this._insert(voxel, node.right);
        }
    }
};

// Function to generate voxel meshes
function generateVoxelMeshes(voxelTree, scene) {
    var stack = [];
    if (voxelTree.root !== null) {
        stack.push(voxelTree.root);
    }
    while (stack.length > 0) {
        var voxel = stack.pop();
        var box = BABYLON.MeshBuilder.CreateBox("box", {size: voxel.size}, scene);
        box.position = new BABYLON.Vector3(voxel.x, voxel.y, voxel.z);

            // Add drag-and-drop behavior to the box
        var dragBehavior = new BABYLON.PointerDragBehavior({ dragPlaneNormal: new BABYLON.Vector3(1, 1, 1) });
        box.addBehavior(dragBehavior);

        // Create a material and set its texture based on the voxel type
        var material = new BABYLON.StandardMaterial("material", scene);
        switch (voxel.type) {
            case 'water':
                material.diffuseTexture = new BABYLON.Texture("textures/water.jpg", scene);
                break;
            case 'wood':
                material.diffuseTexture = new BABYLON.Texture("textures/wood.jpeg", scene);
                break;
            case 'stone':
                material.diffuseTexture = new BABYLON.Texture("textures/stone.jpeg", scene);
                break;
            case 'dirt':
                material.diffuseTexture = new BABYLON.Texture("textures/dirt.jpeg", scene);
                break;
            case 'leaf':
                material.diffuseTexture = new BABYLON.Texture("textures/leaf.jpeg", scene);
                break;
            // Add more cases as needed
            default:
                material.diffuseTexture = new BABYLON.Texture("textures/ground.jpeg", scene);
                break;
        }
        box.material = material;

        // Create an outline for the box
        var outline = BABYLON.MeshBuilder.CreateLines("outline", {
            points: [
                new BABYLON.Vector3(voxel.x - voxel.size/2, voxel.y - voxel.size/2, voxel.z - voxel.size/2),
                new BABYLON.Vector3(voxel.x + voxel.size/2, voxel.y - voxel.size/2, voxel.z - voxel.size/2),
                new BABYLON.Vector3(voxel.x + voxel.size/2, voxel.y + voxel.size/2, voxel.z - voxel.size/2),
                new BABYLON.Vector3(voxel.x - voxel.size/2, voxel.y + voxel.size/2, voxel.z - voxel.size/2),
                new BABYLON.Vector3(voxel.x - voxel.size/2, voxel.y - voxel.size/2, voxel.z - voxel.size/2),
                new BABYLON.Vector3(voxel.x - voxel.size/2, voxel.y - voxel.size/2, voxel.z + voxel.size/2),
                new BABYLON.Vector3(voxel.x + voxel.size/2, voxel.y - voxel.size/2, voxel.z + voxel.size/2),
                new BABYLON.Vector3(voxel.x + voxel.size/2, voxel.y + voxel.size/2, voxel.z + voxel.size/2),
                new BABYLON.Vector3(voxel.x - voxel.size/2, voxel.y + voxel.size/2, voxel.z + voxel.size/2),
                new BABYLON.Vector3(voxel.x - voxel.size/2, voxel.y - voxel.size/2, voxel.z + voxel.size/2)
            ]
        }, scene);
        outline.color = new BABYLON.Color3(0, 0, 0); // black color

        if (voxel.left !== null) {
            stack.push(voxel.left);
        }
        if (voxel.right !== null) {
            stack.push(voxel.right);
        }
    }
}
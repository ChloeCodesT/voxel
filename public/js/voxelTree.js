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

// Function to get all voxels in the voxel tree
VoxelTree.prototype.getAllVoxels = function() {
    var voxels = [];
    this._getAllVoxels(this.root, voxels);
    return voxels;
};

VoxelTree.prototype._getAllVoxels = function(node, voxels) {
    if (node !== null) {
        voxels.push(node);
        this._getAllVoxels(node.left, voxels);
        this._getAllVoxels(node.right, voxels);
    }
};

// Function to check if a voxel exists at a given position
VoxelTree.prototype.hasVoxelAt = function(x, y, z) {
    return this._hasVoxelAt(x, y, z, this.root);
};

VoxelTree.prototype._hasVoxelAt = function(x, y, z, node) {
    if (node === null) {
        return false;
    } else if (node.x === x && node.y === y && node.z === z) {
        return true;
    } else if (x < node.x) {
        return this._hasVoxelAt(x, y, z, node.left);
    } else {
        return this._hasVoxelAt(x, y, z, node.right);
    }
};

// Function to move a voxel to a given position
VoxelTree.prototype.moveVoxelTo = function(voxel, x, y, z) {
    this._removeVoxel(voxel);
    voxel.x = x;
    voxel.y = y;
    voxel.z = z;
    this.insert(voxel);
};

// Function to remove a voxel from the voxel tree
VoxelTree.prototype.removeVoxel = function(voxel) {
    this._removeVoxel(voxel);
};

VoxelTree.prototype._removeVoxel = function(voxel) {
    this.root = this._removeVoxelHelper(voxel, this.root);
};

VoxelTree.prototype._removeVoxelHelper = function(voxel, node) {
    if (node === null) {
        return null;
    } else if (voxel.x < node.x) {
        node.left = this._removeVoxelHelper(voxel, node.left);
    } else if (voxel.x > node.x) {
        node.right = this._removeVoxelHelper(voxel, node.right);
    } else if (voxel.y < node.y) {
        node.left = this._removeVoxelHelper(voxel, node.left);
    } else if (voxel.y > node.y) {
        node.right = this._removeVoxelHelper(voxel, node.right);
    } else if (voxel.z < node.z) {
        node.left = this._removeVoxelHelper(voxel, node.left);
    } else if (voxel.z > node.z) {
        node.right = this._removeVoxelHelper(voxel, node.right);
    } else {
        if (node.left === null && node.right === null) {
            node = null;
        } else if (node.left === null) {
            node = node.right;
        } else if (node.right === null) {
            node = node.left;
        } else {
            var temp = this._findMinNode(node.right);
            node.x = temp.x;
            node.y = temp.y;
            node.z = temp.z;
            node.right = this._removeVoxelHelper(temp, node.right);
        }
    }
    return node;
};

VoxelTree.prototype._findMinNode = function(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
};

// Function to get the voxel at a given position
VoxelTree.prototype.getVoxelAt = function(x, y, z) {
    return this._getVoxelAt(x, y, z, this.root);
};

VoxelTree.prototype._getVoxelAt = function(x, y, z, node) {
    if (node === null) {
        return null;
    } else if (node.x === x && node.y === y && node.z === z) {
        return node;
    } else if (x < node.x) {
        return this._getVoxelAt(x, y, z, node.left);
    } else {
        return this._getVoxelAt(x, y, z, node.right);
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
// Create a voxel tree
var voxelTree = new VoxelTree();

/*

    WATER STRUCTURE

*/

// // Insert voxels to create a water structure
// for (var x = -5; x <= 5; x++) {
//   for (var z = -5; z <= 5; z++) {
//     voxelTree.insert(new Voxel(x, 0, z, 1, 'water'));
//   }
// }

// Insert voxels to create a water structure
for (var x = -5; x <= 5; x++) {
    for (var z = -5; z <= 5; z++) {
      voxelTree.insert(new Water(x, 0, z, 1));
    }
  }

/*

    TREE STRUCTURE

*/

// Insert voxels to create a tree structure
// Create the trunk
for (var y = 0; y < 5; y++) {
  voxelTree.insert(new Voxel(0, y, 0, 1, 'wood'));
}

// Create the leaves
for (var x = -2; x <= 2; x++) {
  for (var z = -2; z <= 2; z++) {
    for (var y = 5; y < 8; y++) {
      if (Math.abs(x) + Math.abs(z) < 3) {
        voxelTree.insert(new Voxel(x, y, z, 1, 'leaf'));
      }
    }
  }
}

// Generate voxel meshes
generateVoxelMeshes(voxelTree, scene);


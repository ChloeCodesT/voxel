class Water extends Voxel {
    constructor(x, y, z, size) {
      super(x, y, z, size, 'water');
  
      // Add properties specific to water
      this.isFlowing = false;
      this.flowDirection = null; // 'down', 'left', 'right', 'up'
    }
  
    // Add methods specific to water
    startFlowing(direction) {
      this.isFlowing = true;
      this.flowDirection = direction;
    }
  
    stopFlowing() {
      this.isFlowing = false;
      this.flowDirection = null;
    }
  
    flow() {
      if (this.isFlowing) {
        switch (this.flowDirection) {
          case 'down':
            if (this.y > 0) this.y--;
            break;
          case 'left':
            if (this.x > 0) this.x--;
            break;
          case 'right':
            if (this.x < 10) this.x++;
            break;
          case 'up':
            if (this.y < 10) this.y++;
            break;
        }
      }
    }
  }
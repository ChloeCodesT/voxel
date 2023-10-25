class Water {
    constructor(surface_tension, adhesion, density, cohesion) {
        this.surface_tension = surface_tension;
        this.adhesion = adhesion;
        this.density = density;
        this.cohesion = cohesion;
    }

    waterDensity(temperature) {
          // Check if the temperature is valid
        if (temperature < -30 || temperature > 150) {
            throw new Error("Temperature must be between -30 and 150 degrees Celsius.");
        }

        // Calculate the density of water
        this.density = 1000 - (0.002 * temperature);
        return this.density;   
    }

    waterSurfaceTension(density, height, radius, accelerationDueToGravity) {
        this.surface_tension = (density * height * radius * accelerationDueToGravity) / 2;
        return this.surface_tension;
    }

    waterAdhesion(surface_tension, radius) {
        this.adhesion = surface_tension / radius;
        return this.adhesion;
    }

    waterCohesion(numberOfMolecules) {
        this.cohesion = (numberOfMolecules * (numberOfMolecules - 1)) / 2;
        return this.cohesion
      }

}
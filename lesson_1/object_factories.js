function createCar(make, fuelLevel, engineOn) {
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine() {
      this.engineOn = true;
    },

    stopEngine() {
      this.engineOn = false;
    },

    drive() {
      this.engineOn -= 1;
    },

    refuel(percent) {
      if (this.fuelLevel + (percent / 100) <= 1) {
        this.fuelLevel += percent / 100;
      } else {
        this.fuelLevel = 1;
      }
    }
  }
}

let car = createCar('Jaguar', 0.4, false);
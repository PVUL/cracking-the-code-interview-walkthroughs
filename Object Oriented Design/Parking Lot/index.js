const VehicleSize = {
  Motorcycle: 0,
  Compact: 1,
  Large: 2,
};

class Vehicle {
  constructor() {
    this.parkingSpots = []; //Array of parkingSpots that vehicle is taking up
    this.licensePlate;
    this.spotsNeeded;
    this.size;
  }
  getSpotsNeeded() {
    return this.spotsNeeded;
  }
  getSize() {
    return this.size;
  }
  // Park vehicle in this spot (among others, potentially)
  parkInSpot(spot) {
    this.parkingSpots.push(spot);
  }
  // Remove car from spot, and notify spot that it's gone
  clearSpots() {
    for (let i = 0; i < this.parkingSpots.length; i++) {
      parkingSpots[i].removeVehicle();
    }
    this.parkingSpots = [];
  }
  canFitInSpot(spot) {}
}

class Bus extends Vehicle {
  constructor() {
    super();
    this.spotsNeeded = 5;
    this.size = VehicleSize.Large;
  }
  canFitInSpot(spot) {
    return spot.getSize() === VehicleSize.Large;
  }
}

class Car extends Vehicle {
  constructor() {
    super();
    this.spotsNeeded = 1;
    this.size = VehicleSize.Compact;
  }
  canFitInSpot(spot) {
    return (
      spot.getSize() === VehicleSize.Large ||
      spot.getSize() === VehicleSize.Compact
    );
  }
}

class MotorCycle extends Vehicle {
  constructor() {
    super();
    this.spotsNeeded = 1;
    this.size = VehicleSize.Motorcycle;
  }
  canFitInSpot(spot) {
    return true;
  }
}

class ParkingLot {
  constructor() {
    // Construct 5 levels, each level with 30 spots.
    this.NUM_LEVELS = 5;
    this.levels = [];
    for (let i = 0; i < this.NUM_LEVELS; i++) {
      this.levels[i] = new Level(i, 30);
    }
  }
  parkVehicle(vehicle) {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].parkVehicle(vehicle)) {
        return true;
      }
    }
    return false;
  }
}

class Level {
  constructor(flr, numberSpots) {
    // If passed in 30 spots, creates 7 motorcycle, 7 large, and 16 Compact spots
    this.floor = flr;
    this.spots = [];
    this.availableSpots = 0;
    this.SPOTS_PER_ROW = 10;

    const largeSpots = Math.floor(numberSpots / 4);
    const bikeSpots = Math.floor(numberSpots / 4);
    const compactSpots = numberSpots - largeSpots - bikeSpots;
    for (let i = 0; i < numberSpots; i++) {
      let sz = VehicleSize.Motorcycle;
      if (i < largeSpots) {
        sz = VehicleSize.Large;
      } else if (i < largeSpots + compactSpots) {
        sz = VehicleSize.Compact;
      }
      const row = Math.floor(i / this.SPOTS_PER_ROW);
      this.spots[i] = new ParkingSpot(this, row, i, sz);
    }
    this.availableSpots = numberSpots;
  }
  getAvailableSpots() {
    return this.availableSpots;
  }
  // Try to find a place to park this vehicle. Return false if failed.
  parkVehicle(vehicle) {
    if (this.getAvailableSpots() < vehicle.getSpotsNeeded()) {
      return false;
    }
    const spotNumber = this.findAvailableSpots(vehicle);
    if (spotNumber < 0) {
      return false;
    }
    return this.parkStartingAtSpot(spotNumber, vehicle);
  }
  // Park a vehicle starting at the spot spotNumber, and continuing until vehicle.spotsNeeded.
  parkStartingAtSpot(spotNumber, vehicle) {
    vehicle.clearSpots();
    let success = true;
    for (let i = spotNumber; i < spotNumber + vehicle.spotsNeeded; i++) {
      success = success && this.spots[i].park(vehicle);
    }
    this.availableSpots -= vehicle.spotsNeeded;
    return success;
  }
  findAvailableSpots(vehicle) {
    const spotsNeeded = vehicle.getSpotsNeeded();
    let lastRow = -1;
    let spotsFound = 0;
    for (let i = 0; i < this.spots.length; i++) {
      const spot = this.spots[i];
      if (lastRow != spot.getRow()) {
        spotsFound = 0;
        lastRow = spot.getRow();
      }
      if (spot.canFitVehicle(vehicle)) {
        spotsFound++;
      } else {
        spotsFound = 0;
      }
      if (spotsFound === spotsNeeded) {
        return i - (spotsNeeded - 1);
      }
    }
    return -1;
  }
  spotFreed() {
    this.availableSpots++;
  }
}

class ParkingSpot {
  constructor(lvl, r, n, sz) {
    this.vehicle = null;
    this.spotSize = sz;
    this.row = r;
    this.spotNumber = n;
    this.level = lvl;
  }
  isAvailable() {
    return this.vehicle === null;
  }
  //Checks if the spot is big enough for the vehicle (and is available). This compares
  //the SIZE only. It does not check if it has enough spots.
  canFitVehicle(vehicle) {
    return this.isAvailable() && vehicle.canFitInSpot(this);
  }
  park(v) {
    if (!this.canFitVehicle(v)) {
      return false;
    }
    this.vehicle = v;
    v.parkInSpot(this);
    return true;
  }
  getRow() {
    return this.row;
  }
  getSpotNumber() {
    return this.spotNumber;
  }
  getSize() {
    return this.spotSize;
  }
  removeVehicle() {
    this.level.spotFreed();
    this.vehicle = null;
  }
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Class ParkingLot", () => {
  it("Parking lot with 150 spots (5 levels with 30 spots each) holds no more than 150 motocycles", () => {
    const awesomeParkingGarage = new ParkingLot();

    //Should allow 150 motorcycles.
    for (let i = 1; i <= 149; i++) {
      awesomeParkingGarage.parkVehicle(new MotorCycle());
    }
    assert.equal(awesomeParkingGarage.parkVehicle(new MotorCycle()), true);
    assert.equal(awesomeParkingGarage.parkVehicle(new MotorCycle()), false);
  });
});

describe("Class Level", () => {
  it("A Level with 30 spots should only park 23 cars at most (If passed in 30 spots, creates 7 motorcycle, 7 large, and 16 Compact spots)", () => {
    let groundFloor = new Level(0, 30);
    for (let i = 1; i <= 22; i++) {
      groundFloor.parkVehicle(new Car());
    }
    assert.equal(groundFloor.parkVehicle(new Car()), true);
    assert.equal(groundFloor.parkVehicle(new Car()), false);
  });

  it("A Level with 30 spots should only allow 1 bus (A bus can park in five large spots that are consecutive and within the same row. It cannot park in small spots.).", () => {
    let groundFloor = new Level(0, 30);
    assert.equal(groundFloor.parkVehicle(new Bus()), true);
    assert.equal(groundFloor.parkVehicle(new Bus()), false);
  });
});

mocha.run();

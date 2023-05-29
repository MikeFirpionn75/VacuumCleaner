"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayVacuumCleaner = exports.displayGrid = void 0;
function displayGrid(grid) {
    console.log(' ');
    grid.reverse();
    for (var i = 0; i < grid.length; i++) { //I display the room 
        console.log(" ".concat(grid[i].join(' '))); //the reverses is to associate the position
    } // (0,0) on the left at the bottom of the grid
    grid.reverse();
    console.log(' ');
}
exports.displayGrid = displayGrid;
function displayVacuumCleaner(positionX, positionY, orientation, vacuumPosition, grid) {
    grid[positionY][positionX] = 'X';
    vacuumPosition.vacuumPositionY = positionY;
    vacuumPosition.vacuumPositionX = positionX; // I display the vacuumCleaner in the room
    vacuumPosition.vacuumOrientation = orientation;
    displayGrid(grid);
    console.log("x = ".concat(vacuumPosition.vacuumPositionX, " y = ").concat(vacuumPosition.vacuumPositionY, " orientation = ").concat(vacuumPosition.vacuumOrientation, "\n"));
}
exports.displayVacuumCleaner = displayVacuumCleaner;

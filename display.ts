export function displayGrid (grid:Array<Array<string>>){
    console.log(' ');
    grid.reverse();
    for (let i:number = 0; i<grid.length; i++){  //I display the room 
        console.log(` ${grid[i].join(' ')}`) ;    //the reverses is to associate the position
    }                                            // (0,0) on the left at the bottom of the grid
    grid.reverse();
    console.log(' ');
}   

export function displayVacuumCleaner (positionX:number, positionY:number, orientation:string, vacuumPosition:any ,grid: Array<Array<string>>): void{
    grid[positionY][positionX] = 'X';
    vacuumPosition.vacuumPositionY = positionY;
    vacuumPosition.vacuumPositionX = positionX;               // I display the vacuumCleaner in the room
    vacuumPosition.vacuumOrientation = orientation;      
    displayGrid(grid);
    console.log(`x = ${vacuumPosition.vacuumPositionX} y = ${vacuumPosition.vacuumPositionY} orientation = ${vacuumPosition.vacuumOrientation}\n`); 
}
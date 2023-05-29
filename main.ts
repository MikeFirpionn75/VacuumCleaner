const prompts = require('prompts');

import {displayGrid, displayVacuumCleaner} from './display';
import {changeOrientation, move} from './moveByOrientation';
import {checkIfGridIsEmpty, checkTheSizeOfTheRoom, checkThePositionOfTheVacuumCleaner, checkTheInstructions} from './check'

let grid: Array<Array<string>> = [];
let widthHeight: number[]  

type ObjectBoolean = {
  valid: boolean,
  outOfTheRoom: boolean
}

type Position = { 
  vacuumPositionX: number,
  vacuumPositionY: number,
  vacuumOrientation: string 
};

const condition: ObjectBoolean = {
  valid: false,
  outOfTheRoom: false
}

const vacuumPosition: Position = {
  vacuumPositionX: 0,
  vacuumPositionY: 0,
  vacuumOrientation: 'N'
};

export function initGrid (x:number, y:number): void{ // Create a room with 
  for (let i:number = 0; i<y; i++){                 // a two-dimensional array
    let rowGrid : string[] = [];
    for(let j:number = 0; j<x; j++){
      rowGrid.push('-');
    }
    grid.push(rowGrid);
  }
}

export async function vacuumCleanerControl (...args: string[]): Promise<void>{ // The main function who call the others
  for (let i:number = 0; i<args.length; i++){
    changeOrientation(vacuumPosition.vacuumOrientation, args[i], vacuumPosition);
    move(vacuumPosition.vacuumOrientation,args[i],vacuumPosition, condition, widthHeight, grid);                 
  }
  if (condition.outOfTheRoom){ 
    displayVacuumCleaner(vacuumPosition.vacuumPositionX,vacuumPosition.vacuumPositionY,vacuumPosition.vacuumOrientation, vacuumPosition, grid)
    console.log("These instructions will take the vacuum cleaner out of the room, please change your instructions\n")
  }else if(!condition.outOfTheRoom){
    displayGrid(grid);
    console.log(`x = ${vacuumPosition.vacuumPositionX} y = ${vacuumPosition.vacuumPositionY} orientation = ${vacuumPosition.vacuumOrientation}\n`);
    
    if (checkIfGridIsEmpty(widthHeight,grid)){
      condition.valid = true
      console.log("The room is clean, bye \n")
    }else{
      let inputOk:boolean = false
      while (!inputOk){                     // in the loop waiting the yes or not
        const cleanAgain = await prompts({
        type: 'text',
        name: 'value',
        message: "Do you want to keep cleaning ? Y or N\n",
        });
        if (cleanAgain.value == 'Y' || cleanAgain.value == 'N' || cleanAgain.value == 'y' || cleanAgain.value == 'n'){
          inputOk = true;
          if (cleanAgain.value == 'Y' || cleanAgain.value == 'y'){
            displayGrid(grid)
          }else if (cleanAgain.value == 'N'|| cleanAgain.value == 'n'){
            console.log("Bye, see you next time \n")
            condition.valid = true;
          }
        }
      }
    }
  }
}

(async () => {
  widthHeight = await checkTheSizeOfTheRoom(condition, grid)
  await checkThePositionOfTheVacuumCleaner(condition, widthHeight,vacuumPosition, grid)
  checkTheInstructions(condition)
})();


const prompts = require('prompts');
import { displayGrid, displayVacuumCleaner } from './display';
import {initGrid, vacuumCleanerControl} from './main';

export function checkIfGridIsEmpty(widthHeight: number[], grid: Array<Array<string>>):boolean {
  let emptyOrNot: boolean = true
  for (let i:number = 0; i<widthHeight[1]; i++){ 
    if (grid[i].includes('-')){
      emptyOrNot = false;
    }
  }
return emptyOrNot
}

export async function checkTheSizeOfTheRoom (valid:boolean[], grid: Array<Array<string>>): Promise<number[]>{
    
  let width:number = -1;
  let height:number = -1
    
  while(!valid[0]){
    const sizeRoom = await prompts({
    type: 'text',
    name: 'value',
    message: 'Please choose the size of the room to clean : example 10x10\n',
    });
    let entiers:any[] = sizeRoom.value.split('x');

    if (!/^\d+$/.test(entiers[0]) || !/^\d+$/.test(entiers[1])) {     // check the input if it not a number
      console.log("Your input is not correct, look at the example");
    }else {
      width = parseInt(entiers[0]); 
      height = parseInt(entiers[1]);
        
      if(Number.isNaN(width) || Number.isNaN(height) || entiers.length>2){
        console.log("Your input is not correct, look at the example")
      }else{
        valid[0] = true
        console.log(`The room is initialized to ${width} x ${height}`)
        initGrid(width,height);
        displayGrid(grid);
      }
    }
  }
  valid[0] = false
  return [width, height]
}

export async function checkThePositionOfTheVacuumCleaner(valid:boolean[], widthHeight: number[],vacuumPosition: object, grid: Array<Array<string>>): Promise<void> {
  let position1: number = -1
  let position2: number = -1
  let orientation: string = ''
  while (!valid[0]){
    const position = await prompts({
      type: 'text',
      name: 'value',
      message: "Please choose the position and the orientation of the vacuum cleaner : example 0,1,N",
    });
      
    let positionInit: any[] = position.value.split(',');

    if(!/^\d+$/.test(positionInit[0]) || !/^\d+$/.test(positionInit[1])) {
      console.log("Your input is not correct, look at the example");
    }else{
        
      position1 = parseInt(positionInit[0]);
      position2 = parseInt(positionInit[1]);
      orientation = positionInit[2];

      let arrayOfOrientation: string[] = ['N','E','W','S']
      let isOrientationInclude: boolean = arrayOfOrientation.includes(orientation)
      if (Number.isNaN(position1) || Number.isNaN(position2) || isOrientationInclude == false || positionInit.length>3){
        console.log('Your input is not correct, look at the example')
      }else if(position1>=widthHeight[0] || position2>=widthHeight[1]){ 
        console.log("The vacuum cleaner is out of the room, please put it inside")
        console.log(`x between 0 and ${widthHeight[0]-1} and y between 0 and ${widthHeight[1]-1} ` )
      }else{
        valid[0] = true;
        displayVacuumCleaner(position1,position2,orientation, vacuumPosition, grid);
      }
    } 
  }
  valid[0] = false
}

export async function checkTheInstructions(valid:boolean[]){
  while (!valid[0]){
    const instruction = await prompts({
    type: 'text',
    name: 'value',
    message: "Control the vacuum cleaner: example DAGAADAA",
    });
  
    let listOfInstructions:any[] = instruction.value.split('')
  
    const withoutDuplicates = listOfInstructions.filter((valeur, index, listOfInstructions) => listOfInstructions.indexOf(valeur) === index);
    let letterA: number = withoutDuplicates.indexOf('A')
    if (letterA == 0 || letterA == 1 || letterA == 2){  // use a array withoutDupliate to know 
      withoutDuplicates.splice(letterA,1)               // if the input contain only 'D','A','G'
    }
    let letterD: number= withoutDuplicates.indexOf('D')         // by remove the duplicates and then remove 'D','A','G'
    if (letterD == 0 || letterD == 1 || letterD == 2){  // if the array is empty, the array contained only 'D','A','G'
      withoutDuplicates.splice(letterD,1)
    }
    let letterG: number= withoutDuplicates.indexOf('G')
    if(letterG == 0 || letterG == 1 || letterG == 2){
      withoutDuplicates.splice(letterG,1)
    }
    if(withoutDuplicates.length > 0){
      console.log("\nPlease enter only the letters 'D', 'G' or 'A'\n")
    }
    else{
      await vacuumCleanerControl(...listOfInstructions);
    }
  }
}
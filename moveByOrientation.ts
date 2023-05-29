export function changeOrientation(position: string, direction: string, vacuumPosition:any ): void{
  if ( position == 'N' && direction == 'G'){
    vacuumPosition.vacuumOrientation = 'W';
  }else if ( position == 'N' && direction == 'D'){
    vacuumPosition.vacuumOrientation = 'E';
  }else if ( position == 'E' && direction == 'G'){
    vacuumPosition.vacuumOrientation = 'N';             // I change the position of the orientation 
  }else if ( position == 'E' && direction == 'D'){        // according to the given direction
    vacuumPosition.vacuumOrientation = 'S';
  }else if ( position == 'S' && direction == 'G'){
    vacuumPosition.vacuumOrientation = 'E';
  }else if ( position == 'S' && direction == 'D'){
    vacuumPosition.vacuumOrientation = 'W';
  }else if ( position == 'W' && direction == 'G'){
    vacuumPosition.vacuumOrientation = 'S';
  }else if ( position == 'W' && direction == 'D'){
    vacuumPosition.vacuumOrientation = 'N';
  }
}

export function move(newPosition: string, direction:string, vacuumPosition: any, condition: any, widthHeight: number[], grid: Array<Array<string>>): void{ 
      
  if(newPosition == 'N' && direction == 'A'){                      
    if(vacuumPosition.vacuumPositionY+1 > widthHeight[1]-1){// I move the vacuumCleaner to the given direction,
      condition.outOfTheRoom = true
    }else{
      condition.outOfTheRoom = false
      grid[vacuumPosition.vacuumPositionY][vacuumPosition.vacuumPositionX] = ' '; // I clean behind it and update the position 
      grid[vacuumPosition.vacuumPositionY+1][vacuumPosition.vacuumPositionX] = 'X';
      vacuumPosition.vacuumPositionY = vacuumPosition.vacuumPositionY+1;
    }
  }else if(newPosition == 'E' && direction =='A'){  
    if(vacuumPosition.vacuumPositionX+1 > widthHeight[0]-1){
      condition.outOfTheRoom = true
    }else{
      condition.outOfTheRoom = false
      grid[vacuumPosition.vacuumPositionY][vacuumPosition.vacuumPositionX] = ' '; 
      grid[vacuumPosition.vacuumPositionY][vacuumPosition.vacuumPositionX+1] = 'X';
      vacuumPosition.vacuumPositionX = vacuumPosition.vacuumPositionX+1;
    }                    
  }else if(newPosition == 'W' && direction =='A'){
    if(vacuumPosition.vacuumPositionX-1 < 0){
      condition.outOfTheRoom = true
    }else{
      condition.outOfTheRoom = false
      grid[vacuumPosition.vacuumPositionY][vacuumPosition.vacuumPositionX] = ' ';
      grid[vacuumPosition.vacuumPositionY][vacuumPosition.vacuumPositionX-1] = 'X';
      vacuumPosition.vacuumPositionX = vacuumPosition.vacuumPositionX-1;
    }
  }else if(newPosition == 'S' && direction == 'A'){
    if(vacuumPosition.vacuumPositionY-1 < 0){
      condition.outOfTheRoom = true
    }else{
      condition.outOfTheRoom = false
      grid[vacuumPosition.vacuumPositionY][vacuumPosition.vacuumPositionX] = ' ';
      grid[vacuumPosition.vacuumPositionY-1][vacuumPosition.vacuumPositionX] = 'X';
      vacuumPosition.vacuumPositionY = vacuumPosition.vacuumPositionY-1;
    }
  }
}
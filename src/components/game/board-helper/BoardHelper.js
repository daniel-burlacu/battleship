import { isCompositeComponent } from "react-dom/test-utils";

// 👇️ get number between min (inclusive) and max (inclusive)
export const generateRandomNumberInRange=async (min, max)=> {  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const checkIfCoordonatesAreValid=(coordonates,shipType)=>{
   let x=coordonates.x;
   let y=coordonates.y;

    switch(shipType){
      case "battleship":
        if(x===7){
          --x;
        }
        
        if(y===7){
          --y;
        }
        break;
      case "carrier":
        if(x===7){
          x=x-2;
        }else if(x===6){
          --x;
        }

        else if(y===7){
          y=y-2;
        }
        break;
      case "destroyer":
        if(y===5){
          --y;
        }
        else if(y===6){
          y=y-2;
        }
        else if(y===7){
          y=y-3;
        }
        break;
      case "submarine":
          if(y===5){
            --y;
          }
          else if(y===6){
            y=y-2;
          }
          else if(y===7){
            y=y-3;
          }
        break;
        default:
          break;
    }
    return {x,y}
}

export const generateEmptyBoard=()=>{

    var board = Array(8).fill(Array(8).fill("sea"));

 return board;
}




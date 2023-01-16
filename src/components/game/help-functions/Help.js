// 👇️ get number between min (inclusive) and max (inclusive)
export const generateRandomNumberInRange=(min, max)=> {  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
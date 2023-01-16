import React, { useEffect } from 'react';
import {useState} from 'react';
import {motion} from 'framer-motion';
import style from './Map.module.css';
import Battleship from '../ships/Battleship';
import Destroyer from '../ships/Destroyer';
import Submarine from '../ships/Submarine';
import Carrier from '../ships/Carrier';

const Map = (props) => {
    
  const handleSetCorXY = (stateX, stateY)=>{
        console.log("my stateX="+stateX);
        console.log("my stateY="+stateY);
        console.log("value at board[x][y]= "+props.boardMap[stateX][stateY]);

        props.callbackShoot(stateX, stateY);

     }

  return (
    <div className="map">
    {/* Create a 10x10 grid of squares */}
    {props.boardMap.map((_, i) => (
      <motion.div className={style.row} key={i}>
        {props.boardMap.map((_, j) => (
          props.boardMap[i][j]==="hit" ?
            <motion.div className={style.square} style={{background:'black'}} key={j}/> 
          :props.boardMap[i][j] === "miss" ? 
            <motion.div className={style.square} style={{background:'green'}} key={j}/>
          :(props.boardMap[i][j] === "sea" || props.boardMap[i][j] === "battleship" ||
           props.boardMap[i][j] === "submarine" || props.boardMap[i][j] === "carrier" || 
           props.boardMap[i][j] === "destroyer" )&& 
          !props.mapDisabled ? 
              <motion.div className={style.square} key={j} onClick={()=>{handleSetCorXY(i,j)}}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
          :(props.boardMap[i][j] === "sea" || props.boardMap[i][j] === "battleship" ||
           props.boardMap[i][j] === "submarine" || props.boardMap[i][j] === "carrier" || 
           props.boardMap[i][j] === "destroyer") && 
           props.mapDisabled ?
            <motion.div className={style.square} key={j}/> : ""
        ))}
      </motion.div>
    ))}
  </div>
  )
}

export default Map
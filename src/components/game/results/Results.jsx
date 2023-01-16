import React, { useEffect } from 'react';
import {useState} from 'react';
import styles from './Results.module.css';

const Results = (props) => {

  const checkForSunkShips=()=>{
    const shipType=props.fleet.map((_,index)=>{
      if(props.fleet[index].sunk==="sunk"){
        console.log("ship type sunk is:"+props.fleet[index].type);
      }
    })
  }

  useEffect(()=>{
    checkForSunkShips();
  },[])


  return (
    <div className={styles.results}>
        <div className={styles.container}>
            <p>Total shots: {props.hits+props.miss}</p>
            <p>Hits: {props.hits}</p>
            <p>Miss: {props.miss}</p>
            <p>Ships sunk:</p>
            {props.fleet.map((_, i) => (
              props.fleet[i].state==="sunk" && <p>{props.fleet[i].type}</p>
            ))}
           
        </div>
    </div>
  )
}

export default Results
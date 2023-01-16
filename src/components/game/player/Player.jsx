import React, { useEffect, useState } from 'react'
import Board from '../board/Board';
import Map from '../map/Map';
import style from './Player.module.css';
import { MdPanoramaPhotosphereSelect } from 'react-icons/md';
import Btn from '../../button/Button';
import Results from '../results/Results';
import YouWon from '../you_won/YouWon';

const Player = (props) => {

    let score=0;
    let shots=0;
    let miss=0;

    const callbackHandleShoot=(coordX, coordY)=>{
      console.log("Calling callbackHandleShoot");
      props.callbackHandleShoot(coordX, coordY);
    }

    // const handleCallbackSetBoard=(brd)=>{
    //   console.log("Setting up board !")
    //   setBoard(brd);
    // }

    const handleCallback=()=>{
      console.log("Player callback");
      props.turn(props.number);
    }


    // hideShips={hideShipsPl2}
    //             callbackHideShips={callbackHideShipsPl2}

  return (
    <>
    <div className={style.container}>
        {props.winner === "" && 
        <div className={style.board}>
            <p className={style.text}>Player {props.plTurn}: {props.player}</p>
            <Board boardGen={props.boardGen} hideShips={props.hideShips}/>
        </div>}
        <div className={style.map}>
            <p>MAP</p>
            <Map boardMap={props.boardMap} callbackShoot={callbackHandleShoot} mapDisabled={props.mapDisabled}/>
        </div>
        {props.winner !== "" &&
          <div className={style.map}>
            <p>Winner</p>
            <YouWon  winner={props.winner}/>
          </div>}
        <div className={style.map}>
          <p>Results</p>
          <Results hits={props.hits} miss={props.miss} fleet={props.fleet} winner={props.winner}/>
        </div>
    </div>
      <div className={style.buttons}>
        {(props.hideShips === false && props.winner==="") && <Btn action={"hideShips"} callBack={props.callbackHideShips} text={"Hide Ships"} />}
        {(props.hideShips === true && props.winner==="") && <Btn action={"revealShips"} callBack={props.callbackRevealShips} text={"Reveal Ships"} />}
        {props.winner === "" && <Btn action={"switchPlayer"} callBack={handleCallback} text={"Switch player"} />}
        <Btn action={"restartGame"} callBack={props.restartGame} text={"Restart Game"} />
        <Btn action={"handleResetPlayers"} callBack={props.resetPlayers} text={"Change Players"} />
      </div>
    </>
  )
}

export default Player
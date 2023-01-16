import React from 'react'
import styles from './Button.module.css';

const Button = (props) => {

  const handleRegisterButton=()=>{
    console.log("Register Button");
    props.callBack();
  }

  const handleResetPlayers =()=>{
    window.alert("Are you sure you want to reset players ? The game will be restarted !");
    props.callBack();
  }

  const switchPlayer=()=>{
    console.log("SwitchPlayer Button");
    props.callBack();
  }

  const restartGame=()=>{
    window.alert("Are you sure you want to reset the game ? The game will be restarted !");
    console.log("Restart Button");
    props.callBack();
  }

  const handleHideShips = () =>{
    console.log("Hide Ships Button");
    props.callBack();
  }

  const handleRevealShips = () =>{
    console.log("Reveal Ships Button");
    props.callBack();
  }

  const handleStartGame=()=>{
    console.log("Start Game Button");
    props.callBack();
  }

  return (
    <>
      {props.action==="handleRegisterButton" && <button className={styles.button__play} role="button"  onClick={handleRegisterButton}>{props.text}</button>}
      {props.action==="handleResetPlayers" && <button className={styles.button__play} role="button"  onClick={handleResetPlayers}>{props.text}</button>}
      {props.action==="startGame" && <button className={styles.button__play} role="button"  onClick={handleStartGame}>{props.text}</button>}
      {props.action==="switchPlayer" && <button className={styles.button__play} role="button"  onClick={switchPlayer}>{props.text}</button>}
      {props.action === "restartGame" && <button className={styles.button__play} role="button"  onClick={restartGame}>{props.text}</button>}
      {props.action === "register" && <button className={styles.button__play} role="button">{props.text}</button>}
      {props.action === "hideShips"&& <button className={styles.button__play} role="button"  onClick={handleHideShips}>{props.text}</button>}
      {props.action === "revealShips" && <button className={styles.button__play} role="button"  onClick={handleRevealShips}>{props.text}</button>}
    </>
    )
}

export default Button
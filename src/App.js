import React, { useState,useEffect,useCallback } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/welcome/Welcome';
import Game from './components/game/Game';
import Header  from './components/header/Header';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import StartGame from './components/startgame/StartGame';
import Cookies from 'js-cookie';
import {
        checkifCookieIdExistsInDb,
        getGameStateFromDB,
        retrievePlayersName,
        checkIfPlayerNamesExistsInPlayersDB
      } from './components/API/GET_Requests';
import {addGameStateAndCookieIdToDB,updateGameStateInDB} from './components/API/POST_Requests';
import { SiWindows } from 'react-icons/si';

const App = () => {
  const [appState, setAppState] = useState('welcome'); // play or welcome
  const [players,setPlayers] = useState({});
  const [hasCookie, setHasCookie] = useState(false);
  const [error, setError] = useState(null);
  const [cookieId, setCookieId] = useState("");

  const callbackRestart = () =>{
    setAppState("start");
  }


  const updateGameStateInTable =async(gameState,cookie)=>{
    try{
      let res = await updateGameStateInDB(gameState,cookie);
      if(!res.success){
        throw new Error("Something went wrong in : updateGameStateInTable");
      }
    }catch(err){
      console.log(err.message);
    }
  }

  const callbackSetPlayersName=(pl1, pl2)=>{
    console.log("Calling players ! "+pl1+" ,"+pl2)
    
    let pls = {
      player1:pl1,
      player2:pl2
    }

    setPlayers(pls);
  }

  const registerPlayers = async() => {
    console.log("Register has been triggered App.js!");
    await updateGameStateInTable('register',cookieId);
    setAppState('register');
  };

  const startGame=()=>{
    console.log("Play has been triggered App.js!");
    setAppState('start');
  }



  const playGame=async ()=>{
    console.log("Play has been triggered App.js!");
    await updateGameStateInTable('game',cookieId);
    setAppState('game');
    
  }

  const checkBrowserForCookies =  () => {
    const cookies = Cookies.get('cookieId');
    return cookies;
  }

  function generateUniqueId() {
    // Generate a unique ID here, for example:
    return Math.random().toString(36).substr(2, 9);
  }

  const setNewCookie=(cookie)=>{
    Cookies.set('cookieId', cookie, { expires: 7 });

    setCookieId(cookie);
  }

//PUT Requests
  const insertGameStateAndCookieToDB=async (gameState,cookie)=>{
    try{
      let res = await addGameStateAndCookieIdToDB(gameState,cookie);
      console.log("Server responded with: "+res.status+" success:"+res.success);
      if(!res.success){
        throw new Error("Somehting is wrong with server inside insertGameStateAndCookieToDB !");
      }
    }catch(err){
      window.alert(err.message);
    }
    console.log("Successfully added");
}

//GET Requests
  const checkIfCookieExistsInDb = async(cookie) => { 

    try{
     const res = await checkifCookieIdExistsInDb(cookie);

     console.log("res: "+res.result);
     if(!res.success){
        throw new Error("Somehting is wrong with server inside checkIfCookieExistsInDb !");
     }
     if(res.result>1){
      return true;
     }else{
      return false;
     }
     
    }catch(err){
      window.alert(err.message);
    }
  }

  const retrieveGameState = async(cookie) =>{
    try{
      let res = await getGameStateFromDB(cookie);
      console.log("My returned game_State  is:"+res.result.game_state);
      if(!res.success){
        throw new Error("Something went wrong in retrieveGameState !");
      }
      return res.result.game_state;
    }catch(err){
      window.alert(err.message);
    }
  }

  const retrievePlayersNames = async(cookie) =>{
    let player1="";
    let player2="";
    try{
      player1 = retrievePlayersName(cookie, 1);
      player2 = retrievePlayersName(cookie, 2);
      throw new Error("Something went wrong in retrievePlayersNames !!");
    }catch(err){
      window.alert(err.message);
    }

    let pls = {
      player1:player1,
      player2:player2
    }
    return pls;
  }

  const checkIfPlayersExists = async(cookie) =>{
    let gamePlayers = "";
    try{
      gamePlayers = await checkIfPlayerNamesExistsInPlayersDB(cookie);
      if(!players.success){
        throw new Error("Something went wrong in checkIfPlayersExists !!");
      }
      
    }catch(err){
      window.alert(err.message);
    }
    if(players!==""){
      return true;
    }else{
      return false;
    }

  }

  const createGameState = async(cookie, gameState)=>{
    let gamePlayers ="";
    switch(gameState){
      case "register":
        if(checkIfPlayersExists(cookie)){
          gamePlayers =retrievePlayersNames(cookie);
          setPlayers(gamePlayers);
          setAppState("register");
        }
        break;
      case"start":
        if(checkIfPlayersExists(cookie)){
          gamePlayers =retrievePlayersNames(cookie);
          setPlayers(gamePlayers);
          setAppState("register");
        }
        break;
      case "game":
        if(checkIfPlayersExists(cookie)){
                    gamePlayers =retrievePlayersNames(cookie);
          setPlayers(gamePlayers);
          setAppState("register");
        }
        break;
      default :
    }
  }

  const gameSetup = useCallback(async () => {
    let cookie=checkBrowserForCookies();
    let gameState = "";
    if(cookie!==undefined){
      console.log("we've found a cookie: "+cookie);
      setCookieId(cookie);
      if(checkIfCookieExistsInDb(cookie)){
        setHasCookie(true);
        gameState= await retrieveGameState(cookie);

        if(appState!==gameState){
          setAppState(gameState);
        }  
        console.log("My appState is:"+gameState);
      }
    }else{
      cookie=generateUniqueId();
      console.log("we've generated a new cookie: "+cookie);
      setNewCookie(cookie);
      insertGameStateAndCookieToDB(appState,cookie);
    }
  },[]);


  useEffect(() => {
    gameSetup();
  }, [gameSetup]);

  // Renders either Welcome Screen or Game
  return (
    <React.Fragment>
      <Header/>
      {appState==="welcome" && <Welcome register={registerPlayers} cookie={cookieId}/>}
      {appState==="register" && <Register startGame={startGame} setplayersName={callbackSetPlayersName} hasCookie={hasCookie} cookie={cookieId}/>}
      {appState==="start" && <StartGame playGame={playGame} setplayersName={callbackSetPlayersName} hasCookie={hasCookie} cookie={cookieId}/>}
      {appState==="game" && <Game players={players} restartGame={callbackRestart} resetPlayers={registerPlayers} hasCookie={hasCookie} cookie={cookieId}/>}
      
      <Footer />
    </React.Fragment>
  );
};

export default App;

// let cookie=checkBrowserForCookies();
// console.log("cookie: " + cookie);

// if(cookie!==undefined){
//   setCookieId(cookie);
//   setHasCookie(true);
//   let cookieExists = checkIfCookieExistsInDb(cookie);
//   if(cookieExists==="empty"){

//     const userId = generateUniqueId();
    
//     setCookieId(setNewCookie(userId));
//     setHasCookie(true);
//     console.log("my cookie is:"+hasCookie+" my cookieId is:"+cookieId);
//   }
//   else if(cookieExists===1){
//     let gameState = retrieveGameState(cookie);
//     setAppState(gameState.appState);
//     if(gameState==="start"){
//       if(checkIfPlayersExists()){
//         let players = retrievePlayersNames(cookie);
//         setPlayers(players);
//       }
//     }
//     setHasCookie(true);
//   }

// }else{
//   const userId = generateUniqueId();
//   let cookie = setNewCookie(userId);
//   setCookieId(cookie);
//   setHasCookie(true);
//   console.log("My cookie to be inserted is:"+cookie);
//   insertGameStateAndCookieToDB(cookie);
// }
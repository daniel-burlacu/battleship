import React, {useState, useEffect, useCallback} from 'react';
import Player from './player/Player';
import style from './Game.module.css';
import {generateRandomNumberInRange} from './help-functions/Help'
import {battleship} from './ships/Battleship';
import {carrier} from './ships/Carrier';
import {destroyer} from './ships/Destroyer'
import {submarine} from './ships/Submarine';
import {checkIfCoordonatesAreValid, generateEmptyBoard} from './board-helper/BoardHelper';
import {
    addDataToBoardDB,
    updateBoardDataToDB,
    updateTileValueInBoard,
    addDataToShipsDB, 
    insertDataToResultsDB,
    updateHitsToResultsDB,
    updateMissedToResultsDB,
    updateWinnerToResultsDB,
    updateShipStatusDB
} from '../API/POST_Requests';
import {checkInBoardForCookie} from '../API/GET_Requests';
import 'react-toastify/dist/ReactToastify.css';

const Game = (props) => {
    const [player1Hits, setPlayer1Hits] = useState(0);
    const [player1Miss, setPlayer1Miss] = useState(0);
    const [player2Hits, setPlayer2Hits] = useState(0);
    const [player2Miss, setPlayer2Miss] = useState(0);
    
    const [hideShipsPl1, setHideShipsPl1] = useState(false);
    const [hideShipsPl2, setHideShipsPl2] = useState(false);

    const [player1Ships, setPlayer1Ships] = useState([]);
    const [player2Ships, setPlayer2Ships] = useState([]);
    
    const [playerTurn, setPlayerTurn] = useState("1");
    const [winner, setWinner] = useState("");
    const [mapDisablePl1, setMapDisabledPl1] = useState(false);
    const [mapDisablePl2, setMapDisabledPl2] = useState(true);

    const [mat1, setMat1] = useState([
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ]
    ]);
    const [mat2, setMat2] = useState([
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ],
        [
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea",
            "sea"
        ]
    ]);
    const [boardPlayer1, setBoardPlayer1] = useState(mat1);
    const [boardPlayer2, setBoardPlayer2] = useState(mat2);

    console.log("My players are: " + props.players.player1 + " " + props.players.player2);

    const handlePlayerTurn = (pl) => {
        console.log("Changing player's turn" + pl);
        setPlayerTurn(pl);
    }

    const resetMatrix = () => {
        setMat1([
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ]
        ]);

        setMat2([
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ],
            [
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea",
                "sea"
            ]
        ]);
    }

    let coordonates = {
        x: 0,
        y: 0
    }

    const createFleet = (pl) => {
        let fl = [];
        fl.push(battleship);
        fl.push(carrier);
        fl.push(destroyer);
        fl.push(submarine);
        
        if(pl===1){
            setPlayer1Ships(fl);
        }else if(pl===2){
            setPlayer2Ships(fl);
        }
        
        
        return fl;
    }

    const checkCoordonates = (ship, matrix) => {

        for (let i = coordonates.x; i < coordonates.x + ship.height; i++) {
            for (let j = coordonates.y; j < coordonates.y + ship.width; j++) {
                if (matrix[i][j] === "sea") {
                } else { 
                    return false;
                }
            }
        }
        return true;
    }

    const generateBoardForPlayer1 = (matr) => {
        setBoardPlayer1(matr);
        resetMatrix();
    }

    const generateBoardForPlayer2 = (matr2) => {
        setBoardPlayer2(matr2);
    }

    const generateX = () => {
        return generateRandomNumberInRange(0, 7);
    }

    const generateY = () => {
        return generateRandomNumberInRange(0, 7);
    }

    const checkCoordonatesXYonBoard = (ship, matrix) => {
      let checked = false;
      while (! checked) {
        coordonates = {x:generateX() , y:generateY()};
        coordonates = checkIfCoordonatesAreValid(coordonates, ship.type);
        //check coordonates for the ship
        checked = checkCoordonates(ship, matrix);
    }

      return coordonates;
    }

    const addShipToBoard = (flt, i, matrix) => {
       
        // for every ship from my fleet
        for (let p = 0; p < flt.length; p++) {
            let carrierIndex = 0;
            // check if x and y are correct set on the board - boundries
            // check if
            coordonates=checkCoordonatesXYonBoard(flt[p],matrix);

            for (let i = coordonates.x; i < coordonates.x + flt[p].height; i++) {
                for (let j = coordonates.y; j < coordonates.y + flt[p].width; j++) {

                    if (flt[p].type === "carrier") {
                        if (carrierIndex === 1 || carrierIndex === 3) {} else {
                            matrix[i][j] = flt[p].type;
                        }
                    } else {
                        matrix[i][j] = flt[p].type;
                    } carrierIndex++;

                }
            }
        }
        return matrix;
    }

    // type: 'battleship',
    // hits: [0,0,0,0],

    const updateWinnerOnResultsDB =  async (player_nr)=>{
        try{
            let res = await updateWinnerToResultsDB(props.cookie,player_nr,1);
            if(res.status!==200){
                throw new Error("Something went wrong at updateWinnerOnResultsDB!");
            }
        }catch(err){    
            window.alert(err.message);
        }
    }

    const checkForWinner=async(player)=>{
        let sunkShips=0;

        if(player==="1"){
            player2Ships.map((_,i)=>{
                if(player2Ships[i].state==="sunk"){
                    console.log(player2Ships[i].type+" state is:"+player2Ships[i].state);
                    sunkShips++;
                }
            })
            console.log("Player "+player+": "+"sunkShips: "+sunkShips);
            if(sunkShips===3){
                window.alert(props.players.player1+" you have won the game !");
                setWinner(props.players.player1);   
                updateWinnerOnResultsDB(1);
            } 
        }

        if(player==="2"){
            player1Ships.map((_,i)=>{
                if(player1Ships[i].state==="sunk"){
                    console.log(player1Ships[i].type+" state is:"+player1Ships[i].state);
                    sunkShips++;
                }
            })
            console.log("Player "+player+": "+"sunkShips: "+sunkShips);
            if(sunkShips===3){
                window.alert(props.players.player2+" you have won the game !");
                setWinner(props.players.player2);
                updateWinnerOnResultsDB(2);
            } 
        }

        return true;
           
    }

    const updateTileValueAtXYInBoardDB= async(x,y, tile_value,player_nr)=>{
        try{

            let res = await updateTileValueInBoard(x,y, tile_value,player_nr,props.cookie);
            if(res.status!==200){
                throw new Error("Something happened at updateTileValueAtXYInBoardDB - > error in trying to update tile_value at [x][y] in player: "+player_nr);
            }
        }catch(err){
            window.alert(err.message);
        }
    }


    const updatePlayersBoardHit=(player,coordX, coordY)=>{
        if(player==="1"){
            console.log("It's a hit to player 2!!")
            let newBoard = boardPlayer2;
            newBoard[coordX][coordY]="hit";
            setBoardPlayer2(newBoard);
            updateTileValueAtXYInBoardDB(coordX,coordY,newBoard[coordX][coordY], 1);

        }else if(player==="2"){
            console.log("It's a hit to player 2!!")
            let newBoard = boardPlayer1;
            newBoard[coordX][coordY]="hit"

            setBoardPlayer1(newBoard);
            updateTileValueAtXYInBoardDB(coordX,coordY,newBoard[coordX][coordY], 2);
        }
    }

    const updatePlayersBoardMissed=(player,coordX, coordY)=>{
        if(player==="1"){
            console.log("You've miss player 2 !!");
            let newBoard = boardPlayer2;
            newBoard[coordX][coordY]="miss";
            window.alert("You've missed !");
            setBoardPlayer2(newBoard);
            updateTileValueAtXYInBoardDB(coordX,coordY,newBoard[coordX][coordY], 1);

        }else if(player==="2"){
            console.log("You've miss player 1!!");
            window.alert("You've missed !");
            let newBoard = boardPlayer1;
            newBoard[coordX][coordY]="miss"
            setBoardPlayer1(newBoard);
            updateTileValueAtXYInBoardDB(coordX,coordY,newBoard[coordX][coordY], 2);
        }
    }

    const updateMyShipsStatus = async (shipType, shipStatus, player) =>{
        // /_ship_type,_ship_status,_player_nr,cookies
        console.log("Updating ships satus in ships !!!");
        try{
            let res =  await updateShipStatusDB(shipType,shipStatus,player,props.cookie);
            if(res.state!==200){
                throw new Error("Something happent at updateMyShipsStatus !");
            }
        }catch(err){    
            console.log(err.message);
        }
        }
       


    const updatePlayersFleetDamaged=(player,ship)=>{
        let newShip = ship;
        if(player==="1"){
                if(ship.hits+1<4){
                    let hit=ship.hits+1;
                    newShip = {...ship,hits:hit}
                    console.log(newShip.type+" has hits:"+newShip.hits);
                    window.alert("It's a Hit !");
                }else{
                    let hit=ship.hits+1;
                    newShip = {...ship,hits:hit,state:"sunk"};
                    console.log("My player 1 new ship is:"+newShip.hits+" ,"+newShip.type+" ,"+ship.state);
                    updateMyShipsStatus(ship.type, "sunk", 1);
                    console.log("updatePlayersFleetDamaged"+newShip.type+" has hits:"+newShip.hits);
                    window.alert("You have sunk an "+newShip.type+" !");
                    checkForWinner(player);
                }
        }
        if(player==="2"){
                if(ship.hits+1<4){
                    let hit=ship.hits+1;
                    newShip = {...ship,hits:hit}
                    console.log(newShip.type+" has hits:"+newShip.hits);
                    window.alert("It's a Hit !");
                }else{
                    let hit=ship.hits+1;
                    newShip = {...ship,hits:hit,state:"sunk"};
                    console.log("My player 1 new ship is:"+newShip.hits+" ,"+newShip.type+" ,"+newShip.state);
                    updateMyShipsStatus(ship.type, "sunk", 2);
                    console.log("updatePlayersFleetDamaged"+newShip.type+" has hits:"+newShip.hits);
                    window.alert("You have sunk an "+newShip.type+" !");
                    checkForWinner(player);
                }
            }

        return newShip;
    }

    const updateHitsShotToResultsDB = async (player_nr, hits)=>{
        try{
            console.log("Calling updateHitsShotToResultsDB !!");
            console.log("Adding hits results table: "+props.cookie, player_nr, hits);
            let res = await updateHitsToResultsDB(props.cookie,player_nr,hits);
            if(res.status!==200){
                throw new Error("Something happent at updateHitsShotToResultsDB");
            }
        }catch(err){
           console.log(err.message);
        }
    }

    const updateMissedShotToResultsDB = async (player_nr, missed)=>{
        try{
            console.log("Calling updateMissedShotToResultsDB !!");
            console.log("Adding missed results table: "+props.cookie, player_nr, missed);
            let res = await updateMissedToResultsDB(props.cookie,player_nr,missed);
            if(res.status!=="200"){
                throw new Error("Something happent at updateMissedShotToResultsDB");
            }
        }catch(err){
           console.log(err.message);
        }
    }

    const checkIfHitOrMissed=(player,coordX, coordY)=>{
        console.log("Calling checkIfHitOrMissed !!!");
        console.log("size of oponent fleet is: "+player2Ships.length);
        console.log("My player: "+player);
        
        console.log("My x: "+coordX+" , coordY:"+coordY);
        if(player==="1"){
            console.log("Entering if player");
            console.log("My board is: "+boardPlayer2[coordX][coordY]);
            for(let i=0;i<player2Ships.length;i++){
                console.log("Entering for");

                if(player2Ships[i].type===boardPlayer2[coordX][coordY]){
                    console.log("My ship is a "+i+" : "+player2Ships[i].type);
                    player2Ships[i] = updatePlayersFleetDamaged(player, player2Ships[i]);
                    updatePlayersBoardHit(player,coordX,coordY);
                    updateHitsShotToResultsDB(1,(player1Hits+1));
                    setPlayer1Hits(player1Hits+1);
                    break;
                }
                
                if(boardPlayer2[coordX][coordY]==="sea"){
                    console.log("Updating sea ")
                    updatePlayersBoardMissed(player,coordX,coordY);
                    updateMissedShotToResultsDB(1,(player1Miss+1));
                    setPlayer1Miss(player1Miss+1);
                    break;
                }
                    
            }
        }

        if(player==="2"){
            console.log("My open board is: "+boardPlayer1[coordX][coordY]);
            for(let i=0;i<player1Ships.length;i++){
                if(player1Ships[i].type===boardPlayer1[coordX][coordY]){
                    console.log("My ship is a "+i+": "+player1Ships[i].type);
                    player1Ships[i] = updatePlayersFleetDamaged(player, player1Ships[i]);
                    updatePlayersBoardHit(player,coordX,coordY);
                    updateHitsShotToResultsDB(2,(player2Hits+1));
                    setPlayer2Hits(player2Hits+1);
                    break;
                }
                
                if(boardPlayer1[coordX][coordY]==="sea"){
                    updatePlayersBoardMissed(player,coordX,coordY);
                    updateMissedToResultsDB(2,(player2Miss+1));
                    setPlayer2Miss(player2Miss+1);
                    break;
                }
                    
            }
        }
    }

    const callbackShoot=(coordX, coordY)=>{
        //to be implemented which ship has been hit
        console.log("Calling GAME.callbackShoot=> "+playerTurn);
        console.log("Shoot at position XY is: "+boardPlayer2[coordX][coordY]);
        console.log("My x: "+coordX+" , my y: "+coordY);
            // setMapDisabledPl2(false);
            // setMapDisabledPl1(false);
        if(playerTurn==="1"){ 
            checkIfHitOrMissed(playerTurn,coordX,coordY);
            setMapDisabledPl2(false);
            setMapDisabledPl1(true);
            
        }
        
        if(playerTurn==="2"){
            checkIfHitOrMissed(playerTurn,coordX,coordY);            
            setMapDisabledPl1(false);
            setMapDisabledPl2(true);
        }
    }

    const callbackHideShipsPl1 = () =>{
        setHideShipsPl1(true);
    }

    const callbackHideShipsPl2 = () =>{
        setHideShipsPl2(true);
    }

    const callbackRevealShipsPl1 =() =>{
        setHideShipsPl1(false);
    }

    const callbackRevealShipsPl2 =() =>{
        setHideShipsPl2(false);
    }

    const callbackRestartGame = () =>{
        props.restartGame();
    }

    const insertDataInBoard = async(boardObject) => {
        let cookieExists =false;

        try{
            let res = await checkInBoardForCookie(props.cookie);
            console.log("My result in checkInBoardForCookie is: "+res.result);
            if(res.success===true && res.result!=="0"){

                cookieExists=true;
            }else if(res.success===false){
                throw new Error("Something went wrong when checking for cookie in board at Game level.");
            }
        }catch(err){
            window.alert(err.message);
        }

        console.log("My cookie in insertDataInBoard is : "+cookieExists);
        if(!cookieExists){
            try{
                console.log("Inserting data in boad ");
                let res = await addDataToBoardDB(boardObject.rows);
                console.log("My response from server addDataToBoard is: "+res.status);
                if(res.status!==200){
                    throw new Error("Something happent when attempting to insert data into board table  at: addBoardDataToDB");
                }
            }catch(err){
                window.alert(err.message);
            }
        }else{
            try{
                    console.log("Updating data in boad ");
                    let res = await updateBoardDataToDB(boardObject.rows);
                    if(res.status!==200){
                        throw new Error("Something happent when attempting to insert data into board table  at: updateBoardDataToDB");
                    }
            }catch(err){
                window.alert(err.message);
            }
        }
        
        
    }

    const createShipObjectToInsert = (fleet, _player_nr)=>{
        let fleetObject=[];

        fleet.map((_,i)=>{
            fleetObject.push({player_nr:_player_nr, ship_type:fleet[i].type,ship_status:fleet[i].state, cookies:props.cookie});
        });
        return fleetObject;
    }

    const addFleetToDB=async(fleet, _player_nr)=>{
        let fleetObject = createShipObjectToInsert(fleet, _player_nr);

          fleetObject.forEach((row) => {
                console.log("Players "+_player_nr+": "+row.player_nr, row.ship_type, row.ship_status, row.cookies);
          });
        try{
           // console.log("My rows in addDataToShipDB: "+fleetObject.rows[0]['ship_type']);
            let res = await addDataToShipsDB(fleetObject);
            if(!res.success){
                throw new Error("Something happent when attempting to insert data into shipsDB");
            }
        }catch(err) {   
            console.log(err.message);
        } 
        return true;
    }

    const createBoardObjectToInsert = (board, player_nr) =>{
        let boardObject =[];
        console.log("Cookie to insert in Board: "+props.cookie);
        board.map((_,i)=>{
            board.map((_,j)=>{
                boardObject = boardObject.concat({x:i, y:j, tile_value:board[i][j],player_nr:player_nr, cookies:props.cookie});
            })
        })

        boardObject = {rows:[boardObject]};

        return boardObject;
    }
                        
    const addBoardsToDb =  useCallback(async (board, player_nr,fleet) => {
        
        let newBoard = createBoardObjectToInsert(board, player_nr);
        if(board.length>1){
            insertDataInBoard(newBoard);
        }else{
            console.log("No board");
        }
    },[])

//redo
    const addResultsDataToDB= async ()=>{
        let results = {
            "rows":[
                {
            "total_shots":"0",
            "hits":0,
            "missed":0,
            "wins":"0",
            "winner":0,
            "player_nr":1,
            "cookiesId":props.cookie
        },
        {
            "total_shots":"0",
            "hits":0,
            "missed":0,
            "wins":"0",
            "winner":0,
            "player_nr":2,
            "cookiesId":props.cookie
        }
            ]
        };
        try{
            let res = await insertDataToResultsDB(results);
            if(!res.success){
                throw new Error("Something went wrong at addDataToResultsDB");
            }
        }catch(err){
            console.log(err.message);
        }

        return true;
    }


    useEffect(() => {
        console.log("My cookie is: "+props.cookie);
        addResultsDataToDB();
        setBoardPlayer1(generateEmptyBoard());
        setBoardPlayer2(generateEmptyBoard());
        let fleet = createFleet(1);
        addFleetToDB(fleet,1);
        let board = addShipToBoard(fleet, 0, mat1);
        generateBoardForPlayer1(board);
        addBoardsToDb(board,1, fleet);
        
        resetMatrix();
        fleet = createFleet(2);
        addFleetToDB(fleet,2);
        board = addShipToBoard(fleet, 0, mat2);
        generateBoardForPlayer2(board);
      
        addBoardsToDb(board,2,fleet);

       
        
        
    }, [addBoardsToDb])

    return (
        <div className={
            style.container
        }>
            {
            playerTurn === "1" && <Player player={
                    props.players.player1
                }
                number={"2"}
                plTurn={"1"}
                turn={handlePlayerTurn}
                boardGen={boardPlayer1}
                boardMap={boardPlayer2}            
                mapDisabled={mapDisablePl1}
                callbackHandleShoot={callbackShoot}
                hits={player1Hits}
                miss={player1Miss}
                fleet={player2Ships}
                winner={winner}
                restartGame={callbackRestartGame}
                hideShips={hideShipsPl1}
                callbackHideShips={callbackHideShipsPl1}
                callbackRevealShips={callbackRevealShipsPl1}
                resetPlayers={props.resetPlayers}
                />
        }
            {
            playerTurn === "2" && <Player player={
                    props.players.player2
                }
                plTurn={"2"}
                number={"1"}
                turn={handlePlayerTurn}
                boardGen={boardPlayer2}
                boardMap={boardPlayer1}
                mapDisabled={mapDisablePl2}
                callbackHandleShoot={callbackShoot}
                hits={player2Hits}
                miss={player2Miss}
                fleet={player1Ships}
                winner={winner}
                restartGame={callbackRestartGame}
                hideShips={hideShipsPl2}
                callbackHideShips={callbackHideShipsPl2}
                callbackRevealShips={callbackRevealShipsPl2}
                resetPlayers={props.resetPlayers}
                />
        } 
        </div>
    )

}
export default Game

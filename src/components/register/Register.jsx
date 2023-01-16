import React from 'react';
import {useState} from 'react';
import styles from './Register.module.css';
import background from '../../resources/images/register.jpg';
import Btn from '../button/Button';
import { SiWindows } from 'react-icons/si';
import {addPlayersToDB,updatePlayerNameInPlayers} from '../API/POST_Requests';
import {checkIfPlayerNamesExistsInPlayersDB} from '../API/GET_Requests';

const Register = (props) => {
    
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [alertPl1, setAlertPl1] = useState(false);
    const [alertPl2, setAlertPl2] = useState(false);

    const addGamePlayersToDB = async()=>{
        console.log("My cookie is: "+props.cookie);
        try{
            let res = await checkIfPlayerNamesExistsInPlayersDB(props.cookie);
            console.log("res.result= "+res.result+" ,res.status= "+res.status);
            
            if(!res.success){
                throw new Error("Something went wrong in addPlayersToDB when calling for checkIfPlayerNamesExistsInPlayersDB();");
            }
            console.log("My res in addPlayersToDB = "+ res.result);

            if(res.result==="0"){
                //insert
                console.log("Inserting addPlayersToDB !!!");
                try{
                    let response = await addPlayersToDB(player1,1, 1, props.cookie);
                    if(!response.success){
                        throw new Error("Something went wrong in addPlayersToDB when calling for addPlayersToDb() to add player 1;");
                    }
                }catch(err){
                    window.alert(err.message);
                }
                try{
                    let response= await addPlayersToDB(player2,1, 2, props.cookie);
                    if(!response.success){
                        throw new Error("Something went wrong in addPlayersToDB when calling for addPlayersToDb() to add player 2;");
                    }
                }catch(err){
                    window.alert(err.message);
                }
               
            }
            else {
                //update
                console.log("Upateing updatePlayerNameInPlayers !!!");
                try{
                    res= await updatePlayerNameInPlayers(player1,1, 1, props.cookie);
                    if(!res.success){
                        throw new Error("Something went wrong in addPlayersToDB when calling for updatePlayerNameInPlayers() to update player 1;");
                    }
                }catch(err){
                    window.alert(err.message);
                }
                try{
                    res = await updatePlayerNameInPlayers(player2,1, 2, props.cookie);
                    if(!res.success){
                         throw new Error("Something went wrong in addPlayersToDB when calling for updatePlayerNameInPlayers() to update player 2;");
                    }
                   
                }catch(err){
                    window.alert(err.message);
                }
            }
    

        }catch(err){
            window.alert(err.message);
        }

        
    }
   

    const handlePlayer1Name=(event)=>{
        event.preventDefault();
        if(event!==""){
            setAlertPl1(false);
            setPlayer1(event.target.value);
        }
    }

    const handlePlayer2Name=(event)=>{
        event.preventDefault();
        if(event!==""){
            setAlertPl2(false);
            setPlayer2(event.target.value);
        }
    }

    const handleSubmit=(event)=>{
        
        event.preventDefault();
        if(player1===""&&player2!==""){
            window.alert("Field for Player1 cannot be blank.");
            setAlertPl1(true);
            setAlertPl2(false);
        }else if(player2===""&&player1!==""){
            window.alert("Field for Player2 cannot be blank.");
            setAlertPl2(true);
            setAlertPl1(false);
        }else if(player1 ===""&& player2===""){
            window.alert("Fields for Player1 && Player2 cannot be blank.");
            setAlertPl1(true);
            setAlertPl2(true);
        }else {
            console.log("Username 1="+player1);
            console.log("Username 2="+player2);
            
            console.log("Registering names !");
            addGamePlayersToDB();
            props.setplayersName(player1 ,player2);
            props.startGame(props.cookie);
        }
    }

    return (
        <div className={
            styles.background
        }>
            <div className={
                styles.container
            }>
                <div className={
                    styles.rules
                }>
                    <h1>Register Players Names</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Player 1:
                            <input type="text" className={alertPl1 ? styles.alert: ''} value={player1} onChange={(e)=>handlePlayer1Name(e)}/>
                        </label>
                        <br/>
                        <label>
                            Player 2:
                            <input type="text" className={alertPl2 ? styles.alert: ''} value={player2} onChange={(e)=>handlePlayer2Name(e)}/>
                        </label>
                        <br/>
                        <Btn type="submit "action={"register"} text={"Submit"} />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register

//callBack={handleSubmit} 
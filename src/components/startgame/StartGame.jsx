import React from 'react';
import {useState} from 'react';
import styles from './StartGame.module.css';
import background from '../../resources/images/register.jpg';
import Btn from '../button/Button';

const Register = (props) => {

    const handleResiterCallBack = () =>{
        props.playGame(props.cookie);
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
                    <h2 className={styles.quote}>“Why Fight When You Can Negotiate?”</h2>
                    <div className={styles.__button}> 
                    <Btn action={"startGame"} callBack={handleResiterCallBack} text={"Start"} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register

//callBack={handleSubmit} 
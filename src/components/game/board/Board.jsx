import React from 'react';
import {useState, useEffect} from 'react';
import style from './Board.module.css';
import {motion} from "framer-motion";

const Board = (props) => {

    return (
        <div className="board">
            {props.hideShips===false&&
            props.boardGen.map((_, i) => (
                <motion.div className={style.row}key={i}>{
                    props.boardGen.map((_, j) => (
                        props.boardGen[i][j]==="hit" ?
                            <motion.div className={style.square} style={{background:'black'}} key={j}/> 
                        : props.boardGen[i][j]==="battleship" || props.boardGen[i][j]==="carrier" || 
                          props.boardGen[i][j] ==="destroyer" || props.boardGen[i][j]==="submarine" ?
                            <motion.div className={style.square} style={{background:'yellow'}} key={j}/> 
                        : props.boardGen[i][j] === "sea" ? 
                            <motion.div className={style.square} key={j}/> 
                        :props.boardGen[i][j] === "miss" ? 
                            <motion.div className={style.square} style={{background:'green'}} key={j}/>
                        : ""
                        ))
                } </motion.div>
            ))
        } 
            {props.hideShips===true &&
            props.boardGen.map((_, i) => (
                <motion.div className={style.row}key={i}>{
                    props.boardGen.map((_, j) => (
                        <motion.div className={style.square} key={j}/> 
                        ))
                } </motion.div>
            ))
        } 

        </div>
    );
};

export default Board;
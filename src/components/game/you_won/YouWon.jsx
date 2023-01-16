import React from 'react';
import styles from './YouWon.module.css';

const YouWon = (props) => {
  return (
    <div className={styles.results}>
        <div className={styles.container}>
            <h1>Congrats {props.winner } !</h1>
            <h2>You have</h2>
            <h2>WON</h2>
            <h2>the GAME!</h2>
        </div>
    </div>

  )
}

export default YouWon
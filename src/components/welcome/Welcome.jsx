import React from 'react';
import styles from './Welcome.module.css';
import background from '../../resources/images/register.jpg';
import Btn from '../button/Button';

const Welcome = (props) => {

  const handleRegister=()=>{
    props.register(props.cookieId);
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
      <div className={styles.rules}>
        <h1>Rules</h1>
        <p >
          You and your opponent are competing navy commanders. Your fleets are positioned at
          secret coordinates, and you take turns firing torpedoes at each other. The first
          to sink the other person’s whole fleet wins!
        </p>
        <Btn action={"handleRegisterButton"} callBack={handleRegister} text={"Play"} />
      </div>
      </div>
      
    </div>
  )
}

export default Welcome
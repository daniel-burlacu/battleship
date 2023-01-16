import React from 'react';
import styles from './Header.module.css';
import background from '../../resources/images/logo.png'


const Header = () => {
  return (
    <header>
      <img className={styles.logo} src={background} alt="Battleship Log"/>
      <h2>“Let the sea set you free.”</h2>
    </header>
  )
}

export default Header
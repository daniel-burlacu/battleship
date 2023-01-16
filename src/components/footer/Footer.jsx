import React from 'react';
import styles from './Footer.module.css';
import { SiGithub} from 'react-icons/si';
import {SlSocialTwitter,SlSocialLinkedin} from 'react-icons/sl';
import {MdWorkOutline} from 'react-icons/md';

const Footer = () => {
  return (
    <footer>
      <div className={styles.contacts}>
        <a className={styles.links} href="https://twitter.com/dani83_rsr"><SlSocialTwitter size={25}/></a>
        <a className={styles.links} href="https://www.linkedin.com/in/daniel-burlacu-3879a689/"><SlSocialLinkedin size={25}/></a>
        <a className={styles.links} href="https://github.com/daniel-burlacu"><SiGithub size={25}/></a>
        <a className={styles.links} href="https://danielburlacu.behindmaskssociety.com"><MdWorkOutline size={25}/></a>
      </div>
      <p className={styles.copy__right}>@CopyRight 2023 Daniel Burlacu</p>
    </footer>
  )
}

export default Footer
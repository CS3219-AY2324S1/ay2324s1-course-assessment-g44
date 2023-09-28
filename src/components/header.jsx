import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../images/logo2.png';
import classes from '../css/HeaderSimple.module.css';
import CreateQuestionbutton from './createQuestionbutton';
import {MantineLogo} from '@mantine/ds';


function Header() {

  return (
    <header className={classes.header}>
        <div>
        <img src={Logo} alt="PeerPrep Logo" width={100} height={50} style={{ paddingRight: '12px' }} />
        </div>  
        <Container size="md" className={classes.inner}>
            <CreateQuestionbutton/>
        </Container>
    </header>
  );
}

export default Header;

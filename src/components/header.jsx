import { useState } from 'react';
import { Container, Group, Burger, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../images/logo2.png';
import classes from '../css/HeaderSimple.module.css';
import CreateQuestionbutton from './buttons/createQuestionbutton';
import MatchButton from './buttons/matchButton'
import {MantineLogo} from '@mantine/ds';
import Match from './buttons/matchButton';


function Header() {
  const [opened, { toggle }] = useDisclosure(false);


  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img src={Logo} alt="logo" width={350} ></img>
        <Group gap={30} visibleFrom="xs">
          <MatchButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

export default Header;

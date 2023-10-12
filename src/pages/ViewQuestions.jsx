import React, { useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger } from '@mantine/core';


function ViewQuestions() {
  const [opened, { toggle }] = useDisclosure();
  const [state, setState] = useState(() => "READ")

    return (
        <AppShell
        header={{ height: 100 }}
        navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>
    
          <AppShell.Navbar p="lg">
            <Navbar/>
          </AppShell.Navbar>
    
          <AppShell.Main>
            <Read />
          </AppShell.Main>
        </AppShell>
      );
    }
  
  export default ViewQuestions;
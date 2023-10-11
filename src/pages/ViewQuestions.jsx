import React, { useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger } from '@mantine/core';
import { selectUser } from '../backend/user_backend/features/auth';
import { useSelector } from 'react-redux';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ViewQuestions() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [state, setState] = useState(() => "READ");
  const user = useSelector(selectUser);

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified && user) {
        navigate("/login", { state: {isTimeOut: true} });
      } else if (!isVerified && !user) {
        navigate("/login");
      }
    })
  });

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
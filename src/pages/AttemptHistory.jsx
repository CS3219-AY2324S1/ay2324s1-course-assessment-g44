import React, { useRef, useState } from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Read from '../components/question_crud/read';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Tabs, rem, Space, LoadingOverlay, Grid, Card } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import { selectUser } from '../backend/user_backend/features/auth';
import { useSelector } from 'react-redux';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionNavbar from '../components/question_crud/questionNavbar';
import { getAttemptsApi } from '../services/user_services';


function AttemptHistory() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const user = useSelector(selectUser);
  
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified) {
        navigate("/login");
      }
    })

    getAttemptsApi({email: user.email}).then(res => setAttempts(res.data.message.rows));
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
            <QuestionNavbar currentValue="attemptHistory"/>
            <Space h="lg"/>
          </AppShell.Main>
        </AppShell>
  );
}

  export default AttemptHistory;